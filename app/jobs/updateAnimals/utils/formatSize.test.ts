import { formatSize } from './index';
import { Size } from '@prisma/client';

describe('updateAnimals/utils#formatSize', () => {
  const testCases = [
    {
      input: 'BIG',
      output: Size.Large
    },
    {
      input: 'MEDIUM',
      output: Size.Medium
    },
    {
      input: 'SMALL',
      output: Size.Small
    },
    {
      input: '',
      output: Size.Small
    }
  ];

  testCases.forEach(({ input, output }) => {
    it(`input: "${input}" returns ${output} expectedly`, () => {
      expect(formatSize(input)).toBe(output);
    });
  });
});
