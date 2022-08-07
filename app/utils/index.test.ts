import { Gender, Family } from '@prisma/client';
import {
  getIconByFamily,
  getIconByGenderAndFamily,
  getTelephoneLink,
  getAddressLink,
  formatDate
} from '.';

describe('getTelephoneLink', () => {
  const tel = ['02 2245 748', '02 2245 689'];
  test('works on the sole telephone', () => {
    const link = getTelephoneLink(tel[1]);
    expect(link).toBe('tel:022245689');
  });

  test('get first telephone number when input is multiple', () => {
    const link = getTelephoneLink(tel);
    expect(link).toBe('tel:022245748');
  });
});

describe('formatDate', () => {
  const testCases = [
    ['2020-10-12T00:00:00.000Z', '2020.10.12'],
    ['2009-05-31T00:00:00.000Z', '2009.05.31'],
    ['2022-01-01T00:00:00.000Z', '2022.01.01']
  ];

  test('get expected output', () => {
    testCases.forEach(([input, output]) => {
      expect(formatDate(input)).toBe(output);
    });
  });
});

describe('getAddressLink', () => {
  const address = '宜蘭縣五結鄉成興村利寶路60號';
  test('get expected output', () => {
    expect(getAddressLink(address)).toBe(
      `http://maps.google.com/maps?q=${address}`
    );
  });
});

describe('getIconByFamily', () => {
  const testCases: [Family, string][] = [
    [Family.Dog, 'Bone'],
    [Family.Cat, 'Fish']
  ];
  test('get expected output', () => {
    testCases.forEach(([input, output]) => {
      expect(getIconByFamily(input)).toBe(output);
    });
  });
});

describe('getIconByGenderAndFamily', () => {
  const testCases: [[Gender, Family], string][] = [
    [[Gender.Null, Family.Dog], 'Bone'],
    [[Gender.Null, Family.Cat], 'Fish'],
    [[Gender.Male, Family.Dog], Gender.Male],
    [[Gender.Male, Family.Cat], Gender.Male],
    [[Gender.Female, Family.Dog], Gender.Female],
    [[Gender.Female, Family.Cat], Gender.Female]
  ];
  test('get expected output', () => {
    testCases.forEach(([input, output]) => {
      const [gender, family] = input;
      expect(getIconByGenderAndFamily({ gender, family })).toBe(output);
    });
  });
});
