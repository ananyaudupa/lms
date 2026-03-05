import { useEffect, useCallback, useState, useRef } from 'react';
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

const nodeTypes = { custom: CustomNode };

type RoadmapFlowProps = {
  nodes: Node[];
  edges: Edge[];
  isEditable: boolean;
};

type SelectedNode = { id: string; label: string } | null;
type ToastData    = { id: number; nodeLabel: string; x: number; y: number } | null;
type PendingNode  = { sourceNodeId: string } | null;

const SPACING = 120;

function getAutoSide(sourceNodeId: string, nodes: Node[], edges: Edge[]): 'left' | 'right' {
  const sourceNode = nodes.find(n => n.id === sourceNodeId);
  if (!sourceNode) return 'right';

  const childIds = edges.filter(e => e.source === sourceNodeId).map(e => e.target);
  let leftCount = 0;
  let rightCount = 0;

  childIds.forEach(id => {
    const child = nodes.find(n => n.id === id);
    if (!child) return;
    if (child.position.x < sourceNode.position.x) leftCount++;
    else rightCount++;
  });

  return leftCount <= rightCount ? 'left' : 'right';
}

function FlowContent({ nodes, edges, isEditable }: RoadmapFlowProps) {
  const [selectedNode, setSelectedNode]     = useState<SelectedNode>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [toast, setToast]                   = useState<ToastData>(null);
  const [pendingNode, setPendingNode]       = useState<PendingNode>(null);
  const [inputScreenPos, setInputScreenPos] = useState<{ x: number; y: number } | null>(null);
  const flowWrapper                         = useRef<HTMLDivElement>(null);
  const { fitView, getViewport }            = useReactFlow();

  const flowNodesRef = useRef<Node[]>([]);
  const flowEdgesRef = useRef<Edge[]>([]);

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(
    nodes.map(n => ({
      ...n,
      data: { ...n.data, isEditable },
    }))
  );

  const [flowEdges, setFlowEdges] = useEdgesState(
    edges.map(e => ({ ...e }))
  );

  useEffect(() => { flowNodesRef.current = flowNodes; }, [flowNodes]);
  useEffect(() => { flowEdgesRef.current = flowEdges; }, [flowEdges]);

  const triggerFitView = useCallback(() => {
    setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 50);
  }, [fitView]);

  useEffect(() => {
    setTimeout(() => fitView({ padding: 0.2 }), 100);
    window.visualViewport?.addEventListener('resize', triggerFitView);
    window.addEventListener('resize', triggerFitView);
    return () => {
      window.visualViewport?.removeEventListener('resize', triggerFitView);
      window.removeEventListener('resize', triggerFitView);
    };
  }, [fitView, triggerFitView]);

  useEffect(() => {
    setFlowNodes(prev => prev.map(n => ({
      ...n,
      data: { ...n.data, isEditable },
    })));
  }, [isEditable]);

  const handleNodeClick = useCallback((_e: React.MouseEvent, node: Node) => {
    if (pendingNode) return;
    setSelectedNode({ id: node.id, label: node.data.label });
    setSelectedNodeId(node.id);
  }, [pendingNode]);

  const handleNodeDragStop: NodeDragHandler = useCallback((_e, node) => {
    setToast({
      id: Date.now(),
      nodeLabel: node.data.label,
      x: node.position.x,
      y: node.position.y,
    });
  }, []);

  const handleConfirmNewNode = useCallback((label: string, nodeType: NewNodeType) => {
    if (!pendingNode) return;

    const newNodeId = `node-${Date.now()}`;
    const sourceNode = flowNodesRef.current.find(n => n.id === pendingNode.sourceNodeId);
    if (!sourceNode) return;

    const srcX = sourceNode.position.x;
    const srcY = sourceNode.position.y;

    if (nodeType === 'root') {
      const bottomEdge = flowEdgesRef.current.find(
        e => e.source === pendingNode.sourceNodeId && e.sourceHandle === 'bottom'
      );
      const targetNode = bottomEdge
        ? flowNodesRef.current.find(n => n.id === bottomEdge.target)
        : null;
      const tgtY = targetNode?.position.y ?? srcY + 150;
      const newPosition = { 
        x: srcX, 
        y: srcY + Math.max((tgtY - srcY) / 2, 80), // minimum 80px gap
      };

      if (bottomEdge) {
        setFlowEdges(prev => {
          const filtered = prev.filter(e => e.id !== bottomEdge.id);
          return [
            ...filtered,
            {
              id: `e-${pendingNode.sourceNodeId}-${newNodeId}`,
              source: pendingNode.sourceNodeId,
              target: newNodeId,
              sourceHandle: 'bottom',
              targetHandle: 'top',
              data: { variant: 'solid' },
            },
            {
              id: `e-${newNodeId}-${bottomEdge.target}`,
              source: newNodeId,
              target: bottomEdge.target,
              sourceHandle: 'bottom',
              targetHandle: 'top',
              data: { variant: 'solid' },
            },
          ];
        });
      } else {
        setFlowEdges(prev => [
          ...prev,
          {
            id: `e-${pendingNode.sourceNodeId}-${newNodeId}`,
            source: pendingNode.sourceNodeId,
            target: newNodeId,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            data: { variant: 'solid' },
          },
        ]);
      }

      setFlowNodes(prev => {
        const shifted = prev.map(n => {
          if (n.id === pendingNode.sourceNodeId) return n;
          if (n.position.y > srcY) {
            return { ...n, position: { ...n.position, y: n.position.y + SPACING } };
          }
          return n;
        });
        return [
          ...shifted,
          {
            id: newNodeId,
            type: 'custom',
            position: newPosition,
            data: { label, variant: 'spine', isEditable },
          },
        ];
      });

    } else {
      const side = getAutoSide(
        pendingNode.sourceNodeId,
        flowNodesRef.current,
        flowEdgesRef.current
      );

      const sourceHandle = side === 'left' ? 'left'         : 'right';
      const targetHandle = side === 'left' ? 'right-target' : 'left-target';

      const siblingsOnSide = flowEdgesRef.current
        .filter(e => e.source === pendingNode.sourceNodeId)
        .map(e => flowNodesRef.current.find(n => n.id === e.target))
        .filter((n): n is Node => !!n && (
          side === 'left' ? n.position.x < srcX : n.position.x > srcX
        ));

      const lowestY = siblingsOnSide.length > 0
        ? Math.max(...siblingsOnSide.map(n => n.position.y)) + 60
        : srcY;

      const newPosition = {
        x: side === 'left' ? srcX - 220 : srcX + 220,
        y: lowestY,
      };

      setFlowEdges(prev => [
        ...prev,
        {
          id: `e-${pendingNode.sourceNodeId}-${newNodeId}`,
          source: pendingNode.sourceNodeId,
          target: newNodeId,
          sourceHandle,
          targetHandle,
          data: { variant: 'dashed' },
        },
      ]);

      setFlowNodes(prev => [
        ...prev,
        {
          id: newNodeId,
          type: 'custom',
          position: newPosition,
          data: { label, variant: 'side', isEditable },
        },
      ]);
    }

    setPendingNode(null);
    setInputScreenPos(null);
  }, [pendingNode, isEditable]);

  // + button position from selected node canvas coords → screen coords
const addButtonPos = selectedNodeId && isEditable && !pendingNode
  ? (() => {
      const node = flowNodesRef.current.find(n => n.id === selectedNodeId);
      if (!node) return null;
      const bounds = flowWrapper.current?.getBoundingClientRect();
      if (!bounds) return null;
      const { x: vpX, y: vpY, zoom } = getViewport();
      return {
        x: (node.position.x + 90) * zoom + vpX + bounds.left,
        y: (node.position.y + 20) * zoom + vpY + bounds.top + 10,  // ← reduced y offset
      };
    })()
  : null;

  return (
    <div ref={flowWrapper} style={{ position: 'fixed', inset: 0 }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={isEditable ? onNodesChange : undefined}
        onEdgesChange={undefined}
        nodeTypes={nodeTypes}
        nodesDraggable={isEditable}
        nodesConnectable={false}
        elementsSelectable={true}
        onNodeClick={handleNodeClick}
        onPaneClick={() => {
          if (pendingNode) {
            setPendingNode(null);
            setInputScreenPos(null);
            return;
          }
          setSelectedNode(null);
          setSelectedNodeId(null);
        }}
        onNodeDragStop={isEditable ? handleNodeDragStop : undefined}
        minZoom={0.3}
        maxZoom={2}
        panOnDrag={true}
        zoomOnScroll
        zoomOnPinch
        fitView
        fitViewOptions={{ padding: 0.2 }}
        style={{ background: '#f1f5f9' }}
      >
        <Background gap={18} size={1} color="#cbd5e1" />
        <Controls />
      </ReactFlow>

      {/* + button — fixed overlay, triggered by node selection */}
      {isEditable && selectedNodeId && addButtonPos && !pendingNode && (
        <div
          onMouseDown={e => {
            e.stopPropagation();
            if (!addButtonPos) return;
            setInputScreenPos({
              x: addButtonPos.x,
              y: addButtonPos.y + 20,
            });
            setPendingNode({ sourceNodeId: selectedNodeId });
          }}
          style={{
            position: 'fixed',
            left: addButtonPos.x,
            top: addButtonPos.y,
            transform: 'translate(-50%, 0)',
            width: 16, height: 16,
            borderRadius: '50%',
            background: '#2563eb',
            border: '2px solid #ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            color: '#ffffff',
            fontWeight: 700,
            boxShadow: '0 2px 6px rgba(37,99,235,0.5)',
            zIndex: 50,
            userSelect: 'none',
            transition: 'transform 0.15s',
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'translate(-50%, 0) scale(1.4)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'translate(-50%, 0) scale(1)')}
        >+</div>
      )}

      {isEditable && pendingNode && inputScreenPos && (
        <InlineNodeInput
          x={inputScreenPos.x}
          y={inputScreenPos.y}
          onConfirm={handleConfirmNewNode}
          onCancel={() => {
            setPendingNode(null);
            setInputScreenPos(null);
          }}
        />
      )}

      {selectedNode && !pendingNode && (
        <NodePanel
          label={selectedNode.label}
          onClose={() => {
            setSelectedNode(null);
            setSelectedNodeId(null);
          }}
        />
      )}

      {isEditable && toast && (
        <Toast
          key={toast.id}
          nodeLabel={toast.nodeLabel}
          x={toast.x}
          y={toast.y}
          onDone={() => setToast(null)}
        />
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