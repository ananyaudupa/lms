import { Handle, Position, NodeProps } from 'reactflow';

type CustomNodeData = {
  label: string;
  variant: 'spine' | 'side';
};

export function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const isSpine = data.variant === 'spine';

  const handleStyle = {
    background: 'transparent', border: 'none',
    width: 1, height: 1, minWidth: 0, minHeight: 0,
  };

  return (
    <div
      style={{
        padding: '10px 20px',
        borderRadius: 8,
        background: isSpine ? '#2563eb' : '#ffffff',
        border: selected ? '2px solid #1d4ed8' : '2px solid #2563eb',
        color: isSpine ? '#ffffff' : '#1e3a8a',
        fontSize: 13,
        fontWeight: isSpine ? 700 : 500,
        boxShadow: selected
          ? '0 0 0 3px rgba(37,99,235,0.6), 0 0 20px 6px rgba(37,99,235,0.5)'
          : '0 2px 6px rgba(0,0,0,0.08)',
        minWidth: 120,
        textAlign: 'center',
        transition: 'box-shadow 0.2s ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <Handle type="target" position={Position.Top}    id="top"          style={handleStyle} />
      <Handle type="source" position={Position.Left}   id="left"         style={handleStyle} />
      <Handle type="target" position={Position.Left}   id="left-target"  style={handleStyle} />
      <Handle type="source" position={Position.Right}  id="right"        style={handleStyle} />
      <Handle type="target" position={Position.Right}  id="right-target" style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom"       style={handleStyle} />
      {data.label}
    </div>
  );
}