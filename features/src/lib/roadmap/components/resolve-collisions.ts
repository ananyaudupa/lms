import { Node } from 'reactflow';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Options = {
  maxIterations?: number;
  overlapThreshold?: number; // fraction of overlap to trigger push (0–1)
  margin?: number;           // extra gap between nodes
};

function getRect(node: Node, margin: number): Rect {
  const w = (node.width  ?? 160) + margin * 2;
  const h = (node.height ?? 44)  + margin * 2;
  return {
    x: node.position.x - margin,
    y: node.position.y - margin,
    width:  w,
    height: h,
  };
}

function getOverlap(a: Rect, b: Rect) {
  const overlapX = Math.min(a.x + a.width,  b.x + b.width)  - Math.max(a.x, b.x);
  const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
  return { overlapX, overlapY };
}

/**
 * Resolves node overlaps using the naive O(n²) algorithm from the official
 * ReactFlow node-collisions example.
 *
 * Iterates over all node pairs, detects overlaps, and pushes nodes apart
 * along the axis with the smallest overlap. Repeats until no overlaps remain
 * or maxIterations is reached.
 */
export function resolveCollisions(nodes: Node[], options: Options = {}): Node[] {
  const {
    maxIterations    = Infinity,
    overlapThreshold = 0.5,
    margin           = 15,
  } = options;

  // Work on a mutable copy of positions
  const positions = nodes.map(n => ({ ...n.position }));

  let overlapFound = true;
  let iterations   = 0;

  while (overlapFound && iterations < maxIterations) {
    overlapFound = false;
    iterations++;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const rectA: Rect = {
          x:      positions[i].x - margin,
          y:      positions[i].y - margin,
          width:  (nodes[i].width  ?? 160) + margin * 2,
          height: (nodes[i].height ?? 44)  + margin * 2,
        };
        const rectB: Rect = {
          x:      positions[j].x - margin,
          y:      positions[j].y - margin,
          width:  (nodes[j].width  ?? 160) + margin * 2,
          height: (nodes[j].height ?? 44)  + margin * 2,
        };

        const { overlapX, overlapY } = getOverlap(rectA, rectB);

        // No overlap on either axis → skip
        if (overlapX <= 0 || overlapY <= 0) continue;

        // Check threshold — only resolve if overlap exceeds fraction of smaller dimension
        const minDim = Math.min(rectA.width, rectA.height, rectB.width, rectB.height);
        if (overlapX < minDim * overlapThreshold && overlapY < minDim * overlapThreshold) continue;

        overlapFound = true;

        // Push along axis with smallest overlap (least resistance)
        if (overlapX < overlapY) {
          const push = overlapX / 2;
          const dirX = positions[i].x < positions[j].x ? -1 : 1;
          positions[i].x += dirX * push;
          positions[j].x -= dirX * push;
        } else {
          const push = overlapY / 2;
          const dirY = positions[i].y < positions[j].y ? -1 : 1;
          positions[i].y += dirY * push;
          positions[j].y -= dirY * push;
        }
      }
    }
  }

  return nodes.map((n, i) => ({
    ...n,
    position: positions[i],
  }));
}