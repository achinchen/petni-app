import { formatGender } from './index';
import type { Gender } from 'server/entities/animal';

describe('basic', () => {
  const testCases = [
    {
      input: 'F',
      output: Gender.Female
    },
    {
      input: 'M',
      output: Gender.Male
    },
    {
      input: '',
      output: Gender.Null
    },
    {
      input: 'random',
      output: Gender.Null
    }
  ];

  testCases.forEach(({ input, output }) => {
    test(`input: "${input}" returns ${output} expectedly`, () => {
      expect(formatGender(input)).toBe(output);
    });
  });
});
