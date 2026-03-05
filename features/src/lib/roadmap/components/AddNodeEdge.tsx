import { useState } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export function AddNodeEdge({
  id,
  sourceX, sourceY,
  targetX, targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  source,
  target,
  data,
}: EdgeProps) {
  const [hovered, setHovered] = useState(false);

  const [edgePath] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;
  const isDashed = data?.variant === 'dashed';

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('+ clicked, midX:', midX, 'midY:', midY, 'source:', source, 'target:', target);
    console.log('data.onAddNode exists:', !!data?.onAddNode);
    data?.onAddNode(midX, midY, source, target);
  };

  return (
    <>
      <path
        d={edgePath}
        fill="none"
        stroke="#2563eb"
        strokeWidth={1.5}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="#2563eb"
        strokeWidth={1.5}
        strokeDasharray={isDashed ? '6 4' : undefined}
        markerEnd={markerEnd}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {hovered && (
      <g
        transform={`translate(${midX}, ${midY})`}
        
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer', pointerEvents: 'all' }}
      >
        
        
        <circle r={10} fill="#ffffff" stroke="#2563eb" strokeWidth={1.5} onClick={handleAdd}/>
        
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fill="#2563eb"
          fontSize={14}
          fontWeight="bold"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          +
        </text>
      </g>
    )}
    </>
  );
  
}