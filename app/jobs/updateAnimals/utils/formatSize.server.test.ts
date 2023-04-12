import { formatSize } from './index';
import { Size } from 'server/entities/animal';

describe('basic', () => {
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
    test(`input: "${input}" returns ${output} expectedly`, () => {
      expect(formatSize(input)).toBe(output);
    });
  });
});
