import updateAnimals from '~/jobs/update-animals';

export const loader = async () => {
  await updateAnimals();
  return;
};
