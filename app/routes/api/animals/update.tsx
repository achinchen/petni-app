import type { ActionFunction } from '@remix-run/node';
import updateAnimals from '~/jobs/updateAnimals';

export const action: ActionFunction = async () => {
  await updateAnimals();
  return;
};
