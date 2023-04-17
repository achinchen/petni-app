import { AnimalFollowPresenter } from './index.presenter';

describe('AnimalFollowPresenter', () => {
  const animalFollowPresenter = new AnimalFollowPresenter();

  const testCases = [
    {
      expected: 400,
      method: animalFollowPresenter.invalidInput
    },
    {
      expected: 405,
      method: animalFollowPresenter.invalidMethod
    },
    { expected: 500, method: animalFollowPresenter.failed },
    { expected: 200, method: animalFollowPresenter.success }
  ];

  it.concurrent.each(testCases)(
    'return $expected when $method.name',
    ({ expected, method }) => {
      expect(method()).toBe(expected);
    }
  );
});
