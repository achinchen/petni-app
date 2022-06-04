import updateAnimals from '~/jobs/updateAnimals';

export const loader = async () => {
  await updateAnimals();
  return;
};
