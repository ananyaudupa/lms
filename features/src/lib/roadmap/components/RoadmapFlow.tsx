import { useCallback, useState, useRef, useEffect } from 'react';
import {
  ReactFlow, ReactFlowProvider, Background, Controls,
  useNodesState, useEdgesState, useReactFlow,
  Node, Edge, NodeDragHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { CustomNode } from './CustomNode';
import { InlineNodeInput, NewNodeType } from './InlineNodeInput';
import { NodePanel } from './NodePanel';
import { Toast } from './Toast';
import { getNodeContent } from '../data/node.data';
import { resolveCollisions } from './resolve-collisions';

const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes dashFlow {
    from { stroke-dashoffset: 20; }
    to   { stroke-dashoffset: 0; }
  }
  .react-flow__controls {
    bottom: 16px !important;
    left: 16px !important;
  }
  @media (max-width: 640px) {
    .react-flow__controls {
      bottom: 10px !important;
      left: 10px !important;
      transform: scale(0.85);
      transform-origin: bottom left;
    }
  }
`;
document.head.appendChild(styleTag);

function styleEdge(e: Edge): Edge {
  const isDashed = e.data?.variant === 'dashed';
  return {
    ...e,
    style: {
      stroke: '#2563eb',
      strokeWidth: 2,
      ...(isDashed ? {
        strokeDasharray: '6 4',
        animation: 'dashFlow 0.8s linear infinite',
      } : {}),
    },
  };
}

const nodeTypes = { custom: CustomNode };

const NODE_W = 160;
const NODE_H = 40;

type RoadmapFlowProps = {
  nodes: Node[];
  edges: Edge[];
  isEditable: boolean;
  containerWidth: number;
  containerHeight: number;
};

type SelectedNode = { id: string; label: string } | null;
type ToastData    = { id: number; nodeLabel: string; x: number; y: number } | null;
type PendingNode  = { sourceNodeId: string } | null;
const SPACING = 120;

function computeViewport(
  nodes: Node[],
  containerW: number,
  containerH: number,
  padding = 24,
): { x: number; y: number; zoom: number } {
  if (!nodes.length || containerW <= 0 || containerH <= 0) return { x: 0, y: 0, zoom: 0.5 };

  const minX = Math.min(...nodes.map(n => n.position.x));
  const minY = Math.min(...nodes.map(n => n.position.y));
  const maxX = Math.max(...nodes.map(n => n.position.x)) + NODE_W;
  const maxY = Math.max(...nodes.map(n => n.position.y)) + NODE_H;

  const contentW = maxX - minX;
  const contentH = maxY - minY;

  const scaleX = (containerW - padding * 2) / contentW;
  const scaleY = (containerH - padding * 2) / contentH;
  const zoom   = Math.min(scaleX, scaleY, 1.3);

  const x = (containerW - contentW * zoom) / 2 - minX * zoom;
  const y = padding - minY * zoom;

  return { x, y, zoom };
}

function getAutoSide(sourceNodeId: string, nodes: Node[], edges: Edge[]): 'left' | 'right' {
  const sourceNode = nodes.find(n => n.id === sourceNodeId);
  if (!sourceNode) return 'right';
  const childIds = edges.filter(e => e.source === sourceNodeId).map(e => e.target);
  let leftCount = 0, rightCount = 0;
  childIds.forEach(id => {
    const child = nodes.find(n => n.id === id);
    if (!child) return;
    if (child.position.x < sourceNode.position.x) leftCount++;
    else rightCount++;
  });
  return leftCount <= rightCount ? 'left' : 'right';
}

function FlowContent({ nodes, edges, isEditable, containerWidth, containerHeight }: RoadmapFlowProps) {
  const [selectedNode, setSelectedNode]     = useState<SelectedNode>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [toast, setToast]                   = useState<ToastData>(null);
  const [pendingNode, setPendingNode]       = useState<PendingNode>(null);
  const [inputScreenPos, setInputScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile]             = useState(window.innerWidth < 768);

  const flowWrapper              = useRef<HTMLDivElement>(null);
  const { getViewport, setViewport } = useReactFlow();

  const flowNodesRef = useRef<Node[]>([]);
  const flowEdgesRef = useRef<Edge[]>([]);

  // Compute initial viewport from known container dimensions
  const initialViewport = computeViewport(nodes, containerWidth, containerHeight);

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(
    nodes.map(n => ({ ...n, data: { ...n.data, isEditable } }))
  );
  const [flowEdges, setFlowEdges] = useEdgesState(edges.map(e => styleEdge(e)));

  useEffect(() => { flowNodesRef.current = flowNodes; }, [flowNodes]);
  useEffect(() => { flowEdgesRef.current = flowEdges; }, [flowEdges]);

  useEffect(() => {
    setFlowNodes(prev => prev.map(n => ({ ...n, data: { ...n.data, isEditable } })));
  }, [isEditable]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Re-apply viewport when container dimensions change (resize/rotate)
  useEffect(() => {
    const vp = computeViewport(nodes, containerWidth, containerHeight);
    setViewport(vp, { duration: 200 });
  }, [containerWidth, containerHeight, nodes, setViewport]);

  const handleNodeClick = useCallback((_e: React.MouseEvent, node: Node) => {
    if (pendingNode) return;
    setSelectedNode({ id: node.id, label: node.data.label });
    setSelectedNodeId(node.id);
  }, [pendingNode]);

  const handleNodeDragStop: NodeDragHandler = useCallback((_e, node) => {
    setFlowNodes(nds =>
      resolveCollisions(nds, { maxIterations: Infinity, overlapThreshold: 0.5, margin: 15 })
    );
    setToast({ id: Date.now(), nodeLabel: node.data.label, x: node.position.x, y: node.position.y });
  }, []);

  const handleConfirmNewNode = useCallback((label: string, nodeType: NewNodeType) => {
    if (!pendingNode) return;
    const newNodeId  = `node-${Date.now()}`;
    const sourceNode = flowNodesRef.current.find(n => n.id === pendingNode.sourceNodeId);
    if (!sourceNode) return;
    const srcX = sourceNode.position.x;
    const srcY = sourceNode.position.y;

    if (nodeType === 'root') {
      const bottomEdge  = flowEdgesRef.current.find(e => e.source === pendingNode.sourceNodeId && e.sourceHandle === 'bottom');
      const targetNode  = bottomEdge ? flowNodesRef.current.find(n => n.id === bottomEdge.target) : null;
      const tgtY        = targetNode?.position.y ?? srcY + 150;
      const newPosition = { x: srcX, y: srcY + Math.max((tgtY - srcY) / 2, 80) };
      if (bottomEdge) {
        setFlowEdges(prev => [
          ...prev.filter(e => e.id !== bottomEdge.id),
          styleEdge({ id: `e-${pendingNode.sourceNodeId}-${newNodeId}`, source: pendingNode.sourceNodeId, target: newNodeId, sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } }),
          styleEdge({ id: `e-${newNodeId}-${bottomEdge.target}`, source: newNodeId, target: bottomEdge.target, sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } }),
        ]);
      } else {
        setFlowEdges(prev => [...prev,
          styleEdge({ id: `e-${pendingNode.sourceNodeId}-${newNodeId}`, source: pendingNode.sourceNodeId, target: newNodeId, sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } }),
        ]);
      }
      setFlowNodes(prev => {
        const shifted = prev.map(n =>
          n.id !== pendingNode.sourceNodeId && n.position.y > srcY
            ? { ...n, position: { ...n.position, y: n.position.y + SPACING } } : n
        );
        return [...shifted, { id: newNodeId, type: 'custom', position: newPosition, data: { label, variant: 'spine', isEditable } }];
      });
    } else {
      const side         = getAutoSide(pendingNode.sourceNodeId, flowNodesRef.current, flowEdgesRef.current);
      const sourceHandle = side === 'left' ? 'left' : 'right';
      const targetHandle = side === 'left' ? 'right-target' : 'left-target';
      const siblingsOnSide = flowEdgesRef.current
        .filter(e => e.source === pendingNode.sourceNodeId)
        .map(e => flowNodesRef.current.find(n => n.id === e.target))
        .filter((n): n is Node => !!n && (side === 'left' ? n.position.x < srcX : n.position.x > srcX));
      const lowestY     = siblingsOnSide.length > 0 ? Math.max(...siblingsOnSide.map(n => n.position.y)) + 60 : srcY;
      const newPosition = { x: side === 'left' ? srcX - 220 : srcX + 220, y: lowestY };
      setFlowEdges(prev => [...prev,
        styleEdge({ id: `e-${pendingNode.sourceNodeId}-${newNodeId}`, source: pendingNode.sourceNodeId, target: newNodeId, sourceHandle, targetHandle, data: { variant: 'dashed' } }),
      ]);
      setFlowNodes(prev => [...prev,
        { id: newNodeId, type: 'custom', position: newPosition, data: { label, variant: 'side', isEditable } },
      ]);
    }
    setPendingNode(null);
    setInputScreenPos(null);
  }, [pendingNode, isEditable]);

  const addButtonPos = selectedNodeId && isEditable && !pendingNode
    ? (() => {
        const node   = flowNodesRef.current.find(n => n.id === selectedNodeId);
        if (!node) return null;
        const bounds = flowWrapper.current?.getBoundingClientRect();
        if (!bounds) return null;
        const { x: vpX, y: vpY, zoom } = getViewport();
        return {
          x: (node.position.x + 90) * zoom + vpX + bounds.left,
          y: (node.position.y + 20) * zoom + vpY + bounds.top + 10,
        };
      })()
    : null;

  return (
    <div ref={flowWrapper} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={isEditable ? onNodesChange : undefined}
        onEdgesChange={undefined}
        nodeTypes={nodeTypes}
        nodesDraggable={isEditable && !isMobile}
        nodesConnectable={false}
        elementsSelectable={true}
        onNodeClick={handleNodeClick}
        onNodeDragStop={isEditable && !isMobile ? handleNodeDragStop : undefined}
        onPaneClick={() => {
          if (pendingNode) { setPendingNode(null); setInputScreenPos(null); return; }
          setSelectedNode(null);
          setSelectedNodeId(null);
        }}
        minZoom={0.05}
        maxZoom={2.5}
        panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={true}
        panOnScroll={true}
        defaultViewport={initialViewport}
        style={{ background: '#f1f5f9', width: '100%', height: '100%' }}
      >
        <Background gap={18} size={1} color="#cbd5e1" />
        <Controls showInteractive={false} />
      </ReactFlow>

      {isEditable && !isMobile && selectedNodeId && addButtonPos && !pendingNode && (
        <div
          onMouseDown={e => {
            e.stopPropagation();
            setInputScreenPos({ x: addButtonPos.x, y: addButtonPos.y + 20 });
            setPendingNode({ sourceNodeId: selectedNodeId });
          }}
          style={{
            position: 'fixed', left: addButtonPos.x, top: addButtonPos.y,
            transform: 'translate(-50%, 0)', width: 16, height: 16,
            borderRadius: '50%', background: '#2563eb', border: '2px solid #ffffff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#ffffff', fontWeight: 700,
            boxShadow: '0 2px 6px rgba(37,99,235,0.5)', zIndex: 50,
            userSelect: 'none', transition: 'transform 0.15s',
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'translate(-50%, 0) scale(1.4)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'translate(-50%, 0) scale(1)')}
        >+</div>
      )}

      {isEditable && !isMobile && pendingNode && inputScreenPos && (
        <InlineNodeInput
          x={inputScreenPos.x}
          y={inputScreenPos.y}
          onConfirm={handleConfirmNewNode}
          onCancel={() => { setPendingNode(null); setInputScreenPos(null); }}
        />
      )}

      {selectedNode && !pendingNode && (
        <NodePanel
          label={selectedNode.label}
          content={getNodeContent(selectedNode.label)}
          onClose={() => { setSelectedNode(null); setSelectedNodeId(null); }}
        />
      )}

      {isEditable && !isMobile && toast && (
        <Toast key={toast.id} nodeLabel={toast.nodeLabel} x={toast.x} y={toast.y} onDone={() => setToast(null)} />
      )}
    </div>
  );
}

export default function RoadmapFlow(props: RoadmapFlowProps) {
  return (
    <ReactFlowProvider>
      <FlowContent {...props} />
    </ReactFlowProvider>
  );
}