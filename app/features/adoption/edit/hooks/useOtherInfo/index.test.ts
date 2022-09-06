import { getInitialOtherInfo, INITIAL_OTHER_INFO } from '.';
import { ANIMAL } from 'spec/mock/constants/animal';

describe('getInitialOtherInfo', () => {
  test('return INITIAL_OTHER_INFO when arg is undefined', () => {
    expect(getInitialOtherInfo()).toBe(INITIAL_OTHER_INFO);
  });

  test('return animal when arg is animal', () => {
    expect(getInitialOtherInfo(ANIMAL)).not.toBe(INITIAL_OTHER_INFO);
  });
});
