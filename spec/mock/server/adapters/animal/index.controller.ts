import type { AnimalController } from 'server/adapters/animal/index.controller';
export const controller = {
  getInfo: jest.fn() as jest.MockedFunction<AnimalController['getInfo']>,
  updateAnimal: jest.fn() as jest.MockedFunction<
    AnimalController['updateAnimal']
  >
};

jest.mock('server/adapters/animal/index.controller', () => {
  return {
    AnimalController: jest.fn().mockImplementation(() => {
      return controller;
    })
  };
});
