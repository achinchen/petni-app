import type { AnimalRepository } from 'server/gateways/animal';
import type { AnimalFollowRepository } from 'server/gateways/animal-follow';
import { AnimalUseCase } from '.';
import { ANIMAL_FOLLOW } from 'spec/mock/constants/animal-follow';
import { ANIMAL, ANIMALS, ANIMAL_INFO } from 'spec/mock/constants/animal';
import type { Animal } from 'server/entities/animal';

const animalWithUserId = { ...ANIMAL_INFO, userId: 1 };

let useCase: AnimalUseCase;
let animalRepository: jest.Mocked<AnimalRepository>;
let animalFollowRepository: jest.Mocked<AnimalFollowRepository>;

const animalId = 1;
const userId = animalWithUserId.userId;

beforeEach(() => {
  animalRepository = {
    getOneById: jest.fn(),
    getManyByIds: jest.fn(),
    getManyByUserId: jest.fn(),
    getManyByOptions: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    deleteById: jest.fn()
  } as unknown as jest.Mocked<AnimalRepository>;
  animalFollowRepository = {
    getOneByAnimalId: jest.fn()
  } as unknown as jest.Mocked<AnimalFollowRepository>;

  useCase = new AnimalUseCase(animalRepository, animalFollowRepository);
});

describe('getAnimalInfo', () => {
  describe('invoke repository', () => {
    beforeEach(async () => {
      animalFollowRepository.getOneByAnimalId.mockResolvedValueOnce(
        ANIMAL_FOLLOW
      );
      animalRepository.getOneById.mockResolvedValueOnce(animalWithUserId);
      await useCase.getAnimalInfo(animalId, userId);
    });

    it('invoke AnimalRepository.getOneById with the given animalId', () => {
      expect(animalRepository.getOneById).toHaveBeenCalledWith(
        animalId,
        userId
      );
    });

    it('invoke AnimalFollowRepository.getOneByAnimalId with the given animalId and userId', () => {
      expect(animalFollowRepository.getOneByAnimalId).toHaveBeenCalledWith(
        animalId
      );
    });
  });

  describe('result.follow', () => {
    let result: Awaited<ReturnType<AnimalUseCase['getAnimalInfo']>>;

    beforeEach(() => {
      animalRepository.getOneById.mockResolvedValueOnce(animalWithUserId);
    });

    it('return fallback follow', async () => {
      animalFollowRepository.getOneByAnimalId.mockResolvedValueOnce(null);
      result = await useCase.getAnimalInfo(animalId, userId);

      expect(result!.follows).toBe(0);
    });

    it('return follow', async () => {
      animalFollowRepository.getOneByAnimalId.mockResolvedValueOnce(
        ANIMAL_FOLLOW
      );
      result = await useCase.getAnimalInfo(animalId, userId);

      expect(result!.follows).toBe(ANIMAL_FOLLOW.count);
    });
  });

  describe('result.editable', () => {
    let result: Awaited<ReturnType<AnimalUseCase['getAnimalInfo']>>;

    beforeEach(() => {
      animalFollowRepository.getOneByAnimalId.mockResolvedValueOnce(
        ANIMAL_FOLLOW
      );
    });

    it('return false when animal.userId is not equal with args.userId', async () => {
      animalRepository.getOneById.mockResolvedValueOnce(animalWithUserId);
      result = await useCase.getAnimalInfo(animalId);

      expect(result!.editable).toBe(false);
    });

    it('return true when animal.userId is not equal with args.userId', async () => {
      animalRepository.getOneById.mockResolvedValueOnce(animalWithUserId);
      result = await useCase.getAnimalInfo(animalId, userId);

      expect(result!.editable).toBe(true);
    });
  });
});

describe('getCreatedAnimals', () => {
  let result: Awaited<ReturnType<AnimalUseCase['getCreatedAnimals']>>;
  const animals = ANIMALS.map((animal) => ({ ...animal, userId }));
  beforeEach(async () => {
    animalRepository.getManyByUserId.mockResolvedValueOnce(animals);
    result = await useCase.getCreatedAnimals(userId);
  });

  it('invoke AnimalRepository.getManyByUserId with the given userId', () => {
    expect(animalRepository.getManyByUserId).toHaveBeenCalledWith(userId);
  });

  it('return animal', () => {
    expect(result).toEqual(animals);
  });
});

describe('getFavoritesAnimals', () => {
  let result: Awaited<ReturnType<AnimalUseCase['getFavoritesAnimals']>>;
  const animalIds = ANIMALS.map(({ id }) => id);

  beforeEach(async () => {
    animalRepository.getManyByIds.mockResolvedValueOnce(ANIMALS);
    result = await useCase.getFavoritesAnimals(animalIds);
  });

  it('invoke AnimalRepository.getManyByIds with the given animalIds', () => {
    expect(animalRepository.getManyByIds).toHaveBeenCalledWith(animalIds);
  });

  it('return animal', () => {
    expect(result).toEqual(ANIMALS);
  });
});

describe('getFilteredAnimals', () => {
  let result: Awaited<ReturnType<AnimalUseCase['getFilteredAnimals']>>;
  const options = {};

  beforeEach(async () => {
    animalRepository.getManyByOptions.mockResolvedValueOnce(ANIMALS);
    result = await useCase.getFilteredAnimals(options);
  });

  it('invoke AnimalRepository.getManyByOptions with the given options', () => {
    expect(animalRepository.getManyByOptions).toHaveBeenCalledWith(options);
  });

  it('return animal', () => {
    expect(result).toEqual(ANIMALS);
  });
});

describe('updateAnimal', () => {
  let result: Awaited<ReturnType<AnimalUseCase['updateAnimal']>>;
  let payload = { name: 'new name', id: animalId };
  beforeEach(async () => {
    animalRepository.update.mockResolvedValueOnce({
      ...ANIMAL,
      ...payload
    } as unknown as Animal);
    result = await useCase.updateAnimal(payload, userId);
  });

  it('invoke AnimalRepository.update with the given animalId', () => {
    expect(animalRepository.update).toHaveBeenCalledWith(payload, userId);
  });

  it('return updated animal', () => {
    expect(result!.name).toBe(payload.name);
  });
});

describe('createAnimal', () => {
  let result: Awaited<ReturnType<AnimalUseCase['createAnimal']>>;
  beforeEach(async () => {
    animalRepository.create.mockResolvedValueOnce({
      ...ANIMAL,
      userId
    } as unknown as Animal);
    result = await useCase.createAnimal(ANIMAL, userId);
  });

  it('invoke AnimalRepository.create with the given animalId', () => {
    expect(animalRepository.create).toHaveBeenCalledWith(ANIMAL, userId);
  });

  it('return animal', () => {
    expect(result?.userId).toBe(userId);
  });
});

describe('deleteAnimal', () => {
  const animalId = ANIMAL.id;
  let result: Awaited<ReturnType<AnimalUseCase['deleteAnimal']>>;
  beforeEach(async () => {
    animalRepository.deleteById.mockResolvedValueOnce();
    result = await useCase.deleteAnimal(animalId, userId);
  });

  it('invoke AnimalRepository.deleteById with the given animalId', () => {
    expect(animalRepository.deleteById).toHaveBeenCalledWith(animalId, userId);
  });

  it('return nothing', () => {
    expect(result).toBe(undefined);
  });
});
