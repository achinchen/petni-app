import type { AnimalRepository } from 'server/gateways/animal';
import type { AnimalFollowRepository } from 'server/gateways/animal-follow';
import { AnimalUseCase } from '.';
import { ANIMAL_FOLLOW } from 'spec/mock/constants/animal-follow';
import { ANIMAL_INFO } from 'spec/mock/constants/animal';

const animalWithUserId = { ...ANIMAL_INFO, userId: 1 };

describe('AnimalUseCase', () => {
  let useCase: AnimalUseCase;
  let animalRepository: jest.Mocked<AnimalRepository>;
  let animalFollowRepository: jest.Mocked<AnimalFollowRepository>;

  const animalId = 1;
  const userId = animalWithUserId.userId;

  beforeEach(() => {
    animalRepository = {
      getOneById: jest.fn()
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

      it('return treu when animal.userId is not equal with args.userId', async () => {
        animalRepository.getOneById.mockResolvedValueOnce(animalWithUserId);
        result = await useCase.getAnimalInfo(animalId, userId);

        expect(result!.editable).toBe(true);
      });
    });
  });
});
