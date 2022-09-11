import { Gender, Family } from '@prisma/client';
import { ICON_COLOR_CONFIG, getIconByGenderAndFamily } from '.';

describe('getIconByGenderAndFamily', () => {
  const testCases: [
    [Gender, Family],
    ReturnType<typeof getIconByGenderAndFamily>
  ][] = [
    [
      [Gender.Null, Family.Dog],
      { icon: 'Bone', color: ICON_COLOR_CONFIG.Bone }
    ],
    [
      [Gender.Null, Family.Cat],
      { icon: 'Fish', color: ICON_COLOR_CONFIG.Fish }
    ],
    [
      [Gender.Male, Family.Dog],
      { icon: Gender.Male, color: ICON_COLOR_CONFIG.Male }
    ],
    [
      [Gender.Male, Family.Dog],
      { icon: Gender.Male, color: ICON_COLOR_CONFIG.Male }
    ],
    [
      [Gender.Male, Family.Cat],
      { icon: Gender.Male, color: ICON_COLOR_CONFIG.Male }
    ],
    [
      [Gender.Female, Family.Dog],
      { icon: Gender.Female, color: ICON_COLOR_CONFIG.Female }
    ],
    [
      [Gender.Female, Family.Cat],
      { icon: Gender.Female, color: ICON_COLOR_CONFIG.Female }
    ]
  ];
  test('get expected output', () => {
    testCases.forEach(([input, output]) => {
      const [gender, family] = input;
      expect(getIconByGenderAndFamily({ gender, family })).toBe(output);
    });
  });
});
