import { Gender, Family } from 'server/entities/animal';
import { ICON_COLOR_CONFIG, ICON, getIconByGenderAndFamily } from '.';

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
      { icon: ICON[Gender.Male], color: ICON_COLOR_CONFIG[Gender.Male] }
    ],
    [
      [Gender.Male, Family.Dog],
      { icon: ICON[Gender.Male], color: ICON_COLOR_CONFIG[Gender.Male] }
    ],
    [
      [Gender.Male, Family.Cat],
      { icon: ICON[Gender.Male], color: ICON_COLOR_CONFIG[Gender.Male] }
    ],
    [
      [Gender.Female, Family.Dog],
      { icon: ICON[Gender.Female], color: ICON_COLOR_CONFIG[Gender.Female] }
    ],
    [
      [Gender.Female, Family.Cat],
      { icon: ICON[Gender.Female], color: ICON_COLOR_CONFIG[Gender.Female] }
    ]
  ];
  test('get expected output', () => {
    testCases.forEach(([input, output]) => {
      const [gender, family] = input;
      expect(getIconByGenderAndFamily({ gender, family })).toBe(output);
    });
  });
});
