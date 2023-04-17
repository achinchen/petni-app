import type { UserUseCase } from 'server/usecases/user';
import type {
  UserPresenter,
  Payload
} from 'server/adapters/user/index.presenter';
import { UserController } from 'server/adapters/user/index.controller';
import { USER } from 'spec/mock/constants/user';

let useCase: jest.Mocked<UserUseCase>;
let presenter: jest.Mocked<UserPresenter>;
let controller: UserController;
const mockPresenterResult = {
  success: [200, USER],
  failed: [500],
  invalidInput: [400]
};

beforeEach(() => {
  useCase = {
    upsert: jest.fn()
  } as unknown as jest.Mocked<UserUseCase>;

  presenter = {
    success: jest.fn().mockResolvedValue(mockPresenterResult.success),
    failed: jest.fn().mockResolvedValue(mockPresenterResult.failed),
    invalidInput: jest.fn().mockResolvedValue(mockPresenterResult.invalidInput)
  } as unknown as jest.Mocked<UserPresenter>;

  controller = new UserController(useCase, presenter);
});

describe('upsert', () => {
  describe('when payload is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.upsert(null!);
    });

    it('return invalid input', async () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', async () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('not call usecase', async () => {
      expect(useCase.upsert).not.toBeCalled();
    });
  });

  describe('when the upsert request is successful', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.upsert(USER);
    });

    it('return success', async () => {
      expect(payload).toBe(mockPresenterResult.success);
    });

    it('invoke presenter.success', async () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', async () => {
      expect(useCase.upsert).toBeCalledWith(USER);
    });
  });

  describe('when the follow request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.upsert.mockRejectedValue('error');
      payload = await controller.upsert(USER);
    });

    it('return failed', async () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', async () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', async () => {
      expect(useCase.upsert).toBeCalledWith(USER);
    });
  });
});
