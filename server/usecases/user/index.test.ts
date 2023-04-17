import type { UserRepository } from 'server/gateways/user';
import { UserUseCase } from '.';
import { USER } from 'spec/mock/constants/user';

describe('User', () => {
  let useCase: UserUseCase;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repository = {
      upsert: jest.fn()
    } as unknown as jest.Mocked<UserRepository>;
    useCase = new UserUseCase(repository);
  });

  describe('upsert', () => {
    const expectedResult = USER;
    const payload = USER;
    let result: Awaited<ReturnType<UserUseCase['upsert']>>;
    beforeEach(async () => {
      repository.upsert.mockResolvedValueOnce(expectedResult);
      result = await useCase.upsert(payload);
    });
    it('invoke UserRepository.upsert with the given payload', () => {
      expect(repository.upsert).toHaveBeenCalledWith(payload);
    });

    it('return result', () => {
      expect(result).toEqual(expectedResult);
    });
  });
});
