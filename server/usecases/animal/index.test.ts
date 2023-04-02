import type { AnimalRepository } from 'server/gateways/animal';
import type { AnimalFollowRepository } from 'server/gateways/animal-follow';
import { AnimalUseCase } from '.';
import { ANIMAL_FOLLOW } from 'spec/mock/constants/animal-follow';
import { ANIMAL, ANIMAL_INFO } from 'spec/mock/constants/animal';
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

  describe('result.count', () => {
    let result: Awaited<ReturnType<AnimalUseCase['getAnimalInfo']>>;

    beforeEach(() => {
      animalRepository.getOneById.mockResolvedValueOnce(animalWithUserId);
    });

    it('return fallback count', async () => {
      animalFollowRepository.getOneByAnimalId.mockResolvedValueOnce(null);
      result = await useCase.getAnimalInfo(animalId, userId);

      expect(result!.count).toBe(0);
    });

    it('return count', async () => {
      animalFollowRepository.getOneByAnimalId.mockResolvedValueOnce(
        ANIMAL_FOLLOW
      );
      result = await useCase.getAnimalInfo(animalId, userId);

      expect(result!.count).toBe(ANIMAL_FOLLOW.count);
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

describe('updateAnimal', () => {
  describe('invoke repository', () => {
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
});

describe('createAnimal', () => {
  describe('invoke repository', () => {
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
});

describe('deleteAnimal', () => {
  const animalId = ANIMAL.id;
  describe('invoke repository', () => {
    let result: Awaited<ReturnType<AnimalUseCase['deleteAnimal']>>;
    beforeEach(async () => {
      animalRepository.deleteById.mockResolvedValueOnce();
      result = await useCase.deleteAnimal(animalId, userId);
    });

    it('invoke AnimalRepository.deleteById with the given animalId', () => {
      expect(animalRepository.deleteById).toHaveBeenCalledWith(
        animalId,
        userId
      );
    });

    it('return nothing', () => {
      expect(result).toBe(undefined);
    });
  });
});
