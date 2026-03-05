import RoadmapFlow from '../components/RoadmapFlow';
import { useRoadmap } from '../hooks/useRoadmap';

type Props = {
  isEditable: boolean;
};

export const RoadmapPage = ({ isEditable }: Props) => {
  const { nodes, edges } = useRoadmap();

  return (
    <RoadmapFlow
      nodes={nodes}
      edges={edges}
      isEditable={isEditable}
    />
  );
};