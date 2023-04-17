import type { AnimalUseCase } from 'server/usecases/animal';
import type {
  AnimalPresenter,
  Payload
} from 'server/adapters/animal/index.presenter';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { ANIMAL_INFO, ANIMAL, ANIMALS } from 'spec/mock/constants/animal';
import type { Animal } from 'server/entities/animal';

const userId = 456;
const animal = { ...ANIMAL, userId };

let useCase: jest.Mocked<AnimalUseCase>;
let presenter: jest.Mocked<AnimalPresenter>;
let controller: AnimalController;
const mockPresenterResult = {
  success: 200,
  saveSuccess: [204],
  invalidInput: [400],
  forbidden: [403],
  notFound: [404],
  invalidMethod: [405],
  failed: [500]
};

beforeEach(() => {
  useCase = {
    getAnimalInfo: jest.fn(),
    getFavoritesAnimals: jest.fn(),
    getFilteredAnimals: jest.fn(),
    getCreatedAnimals: jest.fn(),
    updateAnimal: jest.fn(),
    createAnimal: jest.fn(),
    deleteAnimal: jest.fn()
  } as unknown as jest.Mocked<AnimalUseCase>;

  presenter = {
    success: jest.fn((payload: Payload['1']) => [
      mockPresenterResult.success,
      payload
    ]),
    saveSuccess: jest.fn().mockReturnValue(mockPresenterResult.saveSuccess),
    forbidden: jest.fn().mockReturnValue(mockPresenterResult.forbidden),
    notFound: jest.fn().mockReturnValue(mockPresenterResult.notFound),
    invalidInput: jest.fn().mockReturnValue(mockPresenterResult.invalidInput),
    failed: jest.fn().mockReturnValue(mockPresenterResult.failed)
  } as unknown as jest.Mocked<AnimalPresenter>;

  controller = new AnimalController(useCase, presenter);
});

describe('getInfo', () => {
  const animalId = ANIMAL_INFO.id;

  describe('when animalId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getInfo(0);
    });

    it('return invalid input', () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.getAnimalInfo).not.toBeCalled();
    });
  });

  describe('when the retrieved result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getInfo(animalId, userId);
    });

    it('return notFound', () => {
      expect(payload).toBe(mockPresenterResult.notFound);
    });

    it('invoke presenter.notFound', () => {
      expect(presenter.notFound).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getAnimalInfo).toBeCalledWith(animalId, userId);
    });
  });

  describe('when the retrieved result is truthy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getAnimalInfo.mockResolvedValue(ANIMAL_INFO);
      payload = await controller.getInfo(animalId, userId);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, ANIMAL_INFO]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getAnimalInfo).toBeCalledWith(animalId, userId);
    });
  });

  describe('when the get info request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getAnimalInfo.mockRejectedValue('error');
      payload = await controller.getInfo(animalId, userId);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getAnimalInfo).toBeCalledWith(animalId, userId);
    });
  });
});

describe('getCreated', () => {
  const animal = ANIMALS.map((animal) => ({ ...animal, userId }));

  describe('when userId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getCreated(null!);
    });

    it('return forbidden', () => {
      expect(payload).toBe(mockPresenterResult.forbidden);
    });

    it('invoke presenter.forbidden', () => {
      expect(presenter.forbidden).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.getCreatedAnimals).not.toBeCalled();
    });
  });

  describe('when the retrieved result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getCreated(userId);
    });

    it('return notFound', () => {
      expect(payload).toBe(mockPresenterResult.notFound);
    });

    it('invoke presenter.notFound', () => {
      expect(presenter.notFound).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getCreatedAnimals).toBeCalledWith(userId);
    });
  });

  describe('when the retrieved result is truthy', () => {
    let payload: Payload;

    beforeEach(async () => {
      useCase.getCreatedAnimals.mockResolvedValue(animal);
      payload = await controller.getCreated(userId);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, animal]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getCreatedAnimals).toBeCalledWith(userId);
    });
  });

  describe('when the get created request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getCreatedAnimals.mockRejectedValue('error');
      payload = await controller.getCreated(userId);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getCreatedAnimals).toBeCalledWith(userId);
    });
  });
});

describe('getFavorites', () => {
  const animalIds = ANIMALS.map(({ id }) => id);

  describe('when animalId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getFavorites([]);
    });

    it('return invalid input', () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.getFavoritesAnimals).not.toBeCalled();
    });
  });

  describe('when the retrieved result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getFavorites(animalIds);
    });

    it('return notFound', () => {
      expect(payload).toBe(mockPresenterResult.notFound);
    });

    it('invoke presenter.notFound', () => {
      expect(presenter.notFound).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getFavoritesAnimals).toBeCalledWith(animalIds);
    });
  });

  describe('when the retrieved result is truthy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getFavoritesAnimals.mockResolvedValue(ANIMALS);
      payload = await controller.getFavorites(animalIds);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, ANIMALS]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getFavoritesAnimals).toBeCalledWith(animalIds);
    });
  });

  describe('when the get favorites request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getFavoritesAnimals.mockRejectedValue('error');
      payload = await controller.getFavorites(animalIds);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getFavoritesAnimals).toBeCalledWith(animalIds);
    });
  });
});

describe('getOptions', () => {
  const options = {};

  describe('when the retrieved result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getFiltered(options);
    });

    it('return notFound', () => {
      expect(payload).toBe(mockPresenterResult.notFound);
    });

    it('invoke presenter.notFound', () => {
      expect(presenter.notFound).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getFilteredAnimals).toBeCalledWith(options);
    });
  });

  describe('when the retrieved result is truthy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getFilteredAnimals.mockResolvedValue(ANIMALS);
      payload = await controller.getFiltered(options);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, ANIMALS]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getFilteredAnimals).toBeCalledWith(options);
    });
  });

  describe('when the get favorites request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getFilteredAnimals.mockRejectedValue('error');
      payload = await controller.getFiltered(options);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getFilteredAnimals).toBeCalledWith(options);
    });
  });
});

describe('updateAnimal', () => {
  const animalId = animal.id;
  describe('when userId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.updateAnimal(animal, undefined!);
    });

    it('return forbidden input', () => {
      expect(payload).toBe(mockPresenterResult.forbidden);
    });

    it('invoke presenter.forbidden', () => {
      expect(presenter.forbidden).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.updateAnimal).not.toBeCalled();
    });
  });

  describe('when the payload is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.updateAnimal({ id: animalId }, userId);
    });

    it('return invalid input', () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).not.toBeCalled();
    });
  });

  describe('when the retrieved result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.updateAnimal.mockResolvedValue(null);
      payload = await controller.updateAnimal(animal, userId);
    });

    it('return failed', () => {
      expect(payload).toEqual(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).toBeCalledWith(animal, userId);
    });
  });

  describe('when the retrieved result is truthy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.updateAnimal.mockResolvedValue(animal);
      payload = await controller.updateAnimal(animal, userId);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, animal]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).toBeCalledWith(animal, userId);
    });
  });

  describe('when the update request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.updateAnimal.mockRejectedValue('error');
      payload = await controller.updateAnimal(animal, userId);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).toBeCalledWith(animal, userId);
    });
  });
});

describe('createAnimal', () => {
  describe('when userId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.createAnimal(animal, undefined!);
    });

    it('return forbidden input', () => {
      expect(payload).toBe(mockPresenterResult.forbidden);
    });

    it('invoke presenter.forbidden', () => {
      expect(presenter.forbidden).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.createAnimal).not.toBeCalled();
    });
  });

  describe('when the payload is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.createAnimal({} as unknown as Animal, userId);
    });

    it('return invalid input', () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.createAnimal).not.toBeCalled();
    });
  });

  describe('when the result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.createAnimal.mockResolvedValue(null);
      payload = await controller.createAnimal(animal, userId);
    });

    it('return failed', () => {
      expect(payload).toEqual(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.createAnimal).toBeCalledWith(animal, userId);
    });
  });

  describe('when the result is truthy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.createAnimal.mockResolvedValue(animal);
      payload = await controller.createAnimal(animal, userId);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, animal]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.createAnimal).toBeCalledWith(animal, userId);
    });
  });

  describe('when the create request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.createAnimal.mockRejectedValue('error');
      payload = await controller.createAnimal(animal, userId);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.createAnimal).toBeCalledWith(animal, userId);
    });
  });
});

describe('deleteAnimal', () => {
  const animalId = ANIMAL.id;
  describe('when userId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.deleteAnimal(animalId, undefined!);
    });

    it('return forbidden input', () => {
      expect(payload).toBe(mockPresenterResult.forbidden);
    });

    it('invoke presenter.forbidden', () => {
      expect(presenter.forbidden).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.deleteAnimal).not.toBeCalled();
    });
  });

  describe('when the payload is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.deleteAnimal(
        null as unknown as Animal['id'],
        userId
      );
    });

    it('return invalid input', () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.deleteAnimal).not.toBeCalled();
    });
  });

  describe('when the update request successes', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.deleteAnimal.mockResolvedValueOnce();
      payload = await controller.deleteAnimal(animalId, userId);
    });

    it('return saveSuccess', () => {
      expect(payload).toBe(mockPresenterResult.saveSuccess);
    });

    it('invoke presenter.saveSuccess', () => {
      expect(presenter.saveSuccess).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.deleteAnimal).toBeCalledWith(animalId, userId);
    });
  });

  describe('when the update request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.deleteAnimal.mockRejectedValue('error');
      payload = await controller.deleteAnimal(animalId, userId);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.deleteAnimal).toBeCalledWith(animalId, userId);
    });
  });
});
