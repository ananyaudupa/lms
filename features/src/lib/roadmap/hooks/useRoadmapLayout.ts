import dagre from 'dagre';
import { Node, Edge } from 'reactflow';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 40;

// Full re-layout — commented out, use if needed
// export function applyDagreLayout(nodes: Node[], edges: Edge[]): Node[] { ... }

export function getNewNodePosition(
  newNodeId: string,
  allNodes: Node[],
  allEdges: Edge[]
): { x: number; y: number } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: 'TB',
    nodesep: 60,
    ranksep: 80,
    marginx: 40,
    marginy: 40,
  });

  allNodes.forEach(node => {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  allEdges.forEach(edge => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  // Only return the new node's position from Dagre
  const { x, y } = g.node(newNodeId);
  return {
    x: x - NODE_WIDTH / 2,
    y: y - NODE_HEIGHT / 2,
  };
}

export function getAutoSide(
  sourceNodeId: string,
  nodes: Node[],
  edges: Edge[]
): 'left' | 'right' {
  const sourceNode = nodes.find(n => n.id === sourceNodeId);
  if (!sourceNode) return 'right';

  // Count ALL nodes on each side of source, not just direct children
  let leftCount = 0;
  let rightCount = 0;

  nodes.forEach(n => {
    if (n.id === sourceNodeId) return;
    if (n.position.x < sourceNode.position.x) leftCount++;
    else rightCount++;
  });

  return leftCount <= rightCount ? 'left' : 'right';
}
// import dagre from 'dagre';
// import { Node, Edge } from 'reactflow';

// const NODE_WIDTH = 160;
// const NODE_HEIGHT = 40;

// export function applyDagreLayout(nodes: Node[], edges: Edge[]): Node[] {
//   const g = new dagre.graphlib.Graph();
//   g.setDefaultEdgeLabel(() => ({}));
//   g.setGraph({
//     rankdir: 'TB',       // top to bottom
//     nodesep: 60,
//     ranksep: 80,
//     marginx: 40,
//     marginy: 40,
//   });

//   nodes.forEach(node => {
//     g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
//   });

//   edges.forEach(edge => {
//     g.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(g);

//   return nodes.map(node => {
//     const { x, y } = g.node(node.id);
//     return {
//       ...node,
//       position: {
//         x: x - NODE_WIDTH / 2,
//         y: y - NODE_HEIGHT / 2,
//       },
//     };
//   });
// }

// export function getAutoSide(
//   sourceNodeId: string,
//   nodes: Node[],
//   edges: Edge[]
// ): 'left' | 'right' {
//   // Count existing child nodes on each side of the source
//   const childEdges = edges.filter(e => e.source === sourceNodeId);
//   const childIds = childEdges.map(e => e.target);

//   const sourceNode = nodes.find(n => n.id === sourceNodeId);
//   if (!sourceNode) return 'right';

//   let leftCount = 0;
//   let rightCount = 0;

//   childIds.forEach(childId => {
//     const child = nodes.find(n => n.id === childId);
//     if (!child) return;
//     if (child.position.x < sourceNode.position.x) leftCount++;
//     else rightCount++;
//   });

//   return leftCount <= rightCount ? 'left' : 'right';
// }