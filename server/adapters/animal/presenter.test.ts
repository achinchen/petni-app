import { AnimalPresenter } from './index.presenter';
import { ANIMAL, ANIMALS } from 'spec/mock/constants/animal';

describe('AnimalPresenter', () => {
  const animalFollowPresenter = new AnimalPresenter();

  const testCases = [
    {
      expected: [400],
      method: animalFollowPresenter.invalidInput
    },
    {
      expected: [403],
      method: animalFollowPresenter.forbidden
    },
    {
      expected: [405],
      method: animalFollowPresenter.invalidMethod
    },
    { expected: [500], method: animalFollowPresenter.failed },
    {
      expected: [200, ANIMAL],
      method: () => animalFollowPresenter.success(ANIMAL)
    },
    {
      expected: [200, ANIMALS],
      method: () => animalFollowPresenter.success(ANIMALS)
    },
    { expected: [204], method: animalFollowPresenter.saveSuccess }
  ];

  it.concurrent.each(testCases)(
    'return $expected when $method.name',
    ({ expected, method }) => {
      expect(method()).toEqual(expected);
    }
  );
});
