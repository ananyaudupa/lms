import { User } from '@org/core';

export const loginApi = async (
  email: string,
  password: string
): Promise<User> => {
  // Fake API simulation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'Ananya',
        email,
        role: 'student',
      });
    }, 500);
  });
};