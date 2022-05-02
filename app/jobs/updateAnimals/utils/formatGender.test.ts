import { formatGender } from './index';
import { Gender } from '@prisma/client';

describe('updateAnimals/utils#formatGender', () => {
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
    it(`input: "${input}" returns ${output} expectedly`, () => {
      expect(formatGender(input)).toBe(output);
    });
  });
});
