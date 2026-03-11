import RoadmapFlow from '../components/RoadmapFlow';
import { useRoadmap } from '../hooks/useRoadmap';

type Props = {
  isEditable: boolean;
};

export const RoadmapPage = ({ isEditable }: Props) => {
  const { nodes, edges } = useRoadmap();

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 'inherit' }}>
      <RoadmapFlow nodes={nodes} edges={edges} isEditable={isEditable} />
    </div>
  );
};