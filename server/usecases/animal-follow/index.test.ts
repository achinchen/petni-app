import type { AnimalFollowRepository } from 'server/gateways/animal-follow';
import { AnimalFollowUseCase } from '.';

describe('AnimalFollowUseCase', () => {
  let useCase: AnimalFollowUseCase;
  let repository: jest.Mocked<AnimalFollowRepository>;
  const animalId = 1;
  const animalFollow = {
    id: 1,
    animalId,
    createdAt: new Date('2022/12/31'),
    updatedAt: new Date('2022/12/31')
  };

  beforeEach(() => {
    repository = {
      increase: jest.fn(),
      decrease: jest.fn()
    } as unknown as jest.Mocked<AnimalFollowRepository>;
    useCase = new AnimalFollowUseCase(repository);
  });

  describe('follow', () => {
    const expectedResult = { ...animalFollow, count: 1 };
    let result: Awaited<ReturnType<AnimalFollowUseCase['follow']>>;
    beforeEach(async () => {
      repository.increase.mockResolvedValueOnce(expectedResult);
      result = await useCase.follow(animalId);
    });
    it('invoke AnimalFollowRepository.increase with the given animalId', () => {
      expect(repository.increase).toHaveBeenCalledWith(animalId);
    });

    it('return result', () => {
      expect(result).toEqual(expectedResult);
    });
  });

  describe('unfollow', () => {
    const expectedResult = { ...animalFollow, count: 1 };
    let result: Awaited<ReturnType<AnimalFollowUseCase['unfollow']>>;
    beforeEach(async () => {
      repository.decrease.mockResolvedValueOnce(expectedResult);
      result = await useCase.unfollow(animalId);
    });
    it('invoke AnimalFollowRepository.decrease with the given animalId', () => {
      expect(repository.decrease).toHaveBeenCalledWith(animalId);
    });

    it('return result', () => {
      expect(result).toEqual(expectedResult);
    });
  });
});
