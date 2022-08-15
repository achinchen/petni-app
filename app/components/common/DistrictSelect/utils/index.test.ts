import { formatCityInput, getInitCountryAndDistrict } from '.';

describe('getInitCountryAndDistrict', () => {
  const testCases = [
    { input: undefined, output: ['', ''] },
    { input: '台北市士林區', output: ['台北市', '士林區'] },
    { input: '臺中市中區', output: ['臺中市', '中區'] },
    { input: '屏東縣三地門鄉', output: ['屏東縣', '三地門鄉'] }
  ];

  testCases.forEach(({ input, output }) => {
    test(`${input}: ${output}`, () => {
      expect(getInitCountryAndDistrict(input)).toEqual(output);
    });
  });
});

describe('formatCityInput', () => {
  const testCases = [
    { input: '台北市', output: '臺北市' },
    { input: '臺南市', output: '臺南市' }
  ];

  testCases.forEach(({ input, output }) => {
    test(`${input}: ${output}`, () => {
      expect(formatCityInput(input)).toBe(output);
    });
  });
});
