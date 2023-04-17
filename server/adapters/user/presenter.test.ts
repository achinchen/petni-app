import { UserPresenter } from './index.presenter';
import { USER } from 'spec/mock/constants/user';

describe('UserPresenter', () => {
  const animalFollowPresenter = new UserPresenter();

  const testCases = [
    {
      expected: [400],
      method: animalFollowPresenter.invalidInput
    },
    { expected: [500], method: animalFollowPresenter.failed },
    { expected: [200, USER], method: () => animalFollowPresenter.success(USER) }
  ];

  it.concurrent.each(testCases)(
    'return $expected when $method.name',
    ({ expected, method }) => {
      expect(method()).toEqual(expected);
    }
  );
});
