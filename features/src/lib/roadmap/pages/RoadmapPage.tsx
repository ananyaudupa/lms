import { useEffect, useRef, useState } from 'react';
import RoadmapFlow from '../components/RoadmapFlow';
import { useRoadmap } from '../hooks/useRoadmap';

type Props = {
  isEditable: boolean;
};

export const RoadmapPage = ({ isEditable }: Props) => {
  const { nodes, edges } = useRoadmap();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setDims({ width, height });
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // This div fills the parent Box (which has position:relative + vh height)
    <div ref={containerRef} style={{ position: 'absolute', inset: 0 }}>
      {dims && (
        <RoadmapFlow
          nodes={nodes}
          edges={edges}
          isEditable={isEditable}
          containerWidth={dims.width}
          containerHeight={dims.height}
        />
      )}
    </div>
  );
};