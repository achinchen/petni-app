import type { AnimalFollow } from 'server/entities/animal-follow';
import type { AnimalFollowUseCase } from 'server/usecases/animal-follow';
import type {
  AnimalFollowPresenter,
  Payload
} from 'server/adapters/animal-follow/index.presenter';
import { AnimalFollowController } from 'server/adapters/animal-follow/index.controller';

const animalId = 123;
let useCase: jest.Mocked<AnimalFollowUseCase>;
let presenter: jest.Mocked<AnimalFollowPresenter>;
let controller: AnimalFollowController;
const mockPresenterResult = {
  success: 200,
  failed: 500,
  invalidInput: 400
};

beforeEach(() => {
  useCase = {
    follow: jest.fn(),
    unfollow: jest.fn()
  } as unknown as jest.Mocked<AnimalFollowUseCase>;

  presenter = {
    success: jest.fn().mockResolvedValue(mockPresenterResult.success),
    failed: jest.fn().mockResolvedValue(mockPresenterResult.failed),
    invalidInput: jest.fn().mockResolvedValue(mockPresenterResult.invalidInput)
  } as unknown as jest.Mocked<AnimalFollowPresenter>;

  controller = new AnimalFollowController(useCase, presenter);
});

describe('follow', () => {
  describe('when animalId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.follow(0);
    });

    it('return invalid input', async () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', async () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('not call usecase', async () => {
      expect(useCase.follow).not.toBeCalled();
    });
  });

  describe('when the follow request is successful', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.follow(animalId);
    });

    it('return success', async () => {
      expect(payload).toBe(mockPresenterResult.success);
    });

    it('invoke presenter.success', async () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', async () => {
      expect(useCase.follow).toBeCalledWith(animalId);
    });
  });

  describe('when the follow request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.follow.mockRejectedValue('error');
      payload = await controller.follow(animalId);
    });

    it('return failed', async () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', async () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', async () => {
      expect(useCase.follow).toBeCalledWith(animalId);
    });
  });
});

describe('unfollowRequest', () => {
  describe('when animalId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.unfollow(0);
    });

    it('return invalid input', async () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', async () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('not call usecase', async () => {
      expect(useCase.unfollow).not.toBeCalled();
    });
  });

  describe('when the unfollow request is successful', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.unfollow.mockResolvedValue({} as AnimalFollow);
      payload = await controller.unfollow(animalId);
    });

    it('return success', async () => {
      expect(payload).toBe(mockPresenterResult.success);
    });

    it('invoke presenter.success', async () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', async () => {
      expect(useCase.unfollow).toBeCalledWith(animalId);
    });
  });

  describe('when the follow request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.unfollow.mockResolvedValue(null);
      payload = await controller.unfollow(animalId);
    });

    it('return failed', async () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', async () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', async () => {
      expect(useCase.unfollow).toBeCalledWith(animalId);
    });
  });
});
