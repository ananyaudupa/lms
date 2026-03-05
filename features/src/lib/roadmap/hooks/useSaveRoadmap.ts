import { saveNodePosition } from '@org/data-access';

export const useSaveRoadmap = () => {
  const savePosition = async (id: string, position: any) => {
    try {
      await saveNodePosition(id, position);
    } catch (error) {
      console.error('Save failed');
    }
  };

  return { savePosition };
};