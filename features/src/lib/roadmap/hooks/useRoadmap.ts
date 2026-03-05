import { useState } from 'react';
import { roadmapNodes, roadmapEdges } from '../roadmap.data';

export const useRoadmap = () => {
  const [nodes] = useState(roadmapNodes);
  const [edges] = useState(roadmapEdges);
  return { nodes, edges };
};