import axios from 'axios';

export const saveNodePosition = async (
  id: string,
  position: { x: number; y: number }
) => {
  // temporary mock
  console.log('Saving to backend:', { id, position });

  // later:
  // return axios.put('/roadmap/position', { id, position });
};