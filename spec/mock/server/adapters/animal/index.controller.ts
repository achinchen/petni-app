import type { AnimalController } from 'server/adapters/animal/index.controller';
export const controller = {
  getInfo: jest.fn() as jest.MockedFunction<AnimalController['getInfo']>,
  getFavorites: jest.fn() as jest.MockedFunction<
    AnimalController['getFavorites']
  >,
  getFiltered: jest.fn() as jest.MockedFunction<
    AnimalController['getFiltered']
  >,
  getCreated: jest.fn() as jest.MockedFunction<AnimalController['getCreated']>,
  updateAnimal: jest.fn() as jest.MockedFunction<
    AnimalController['updateAnimal']
  >,
  createAnimal: jest.fn() as jest.MockedFunction<
    AnimalController['createAnimal']
  >,
  deleteAnimal: jest.fn() as jest.MockedFunction<
    AnimalController['deleteAnimal']
  >
};

jest.mock('server/adapters/animal/index.controller', () => {
  return {
    AnimalController: jest.fn().mockImplementation(() => {
      return controller;
    })
  };
});
