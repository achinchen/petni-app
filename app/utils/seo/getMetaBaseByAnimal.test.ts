import getMetaBaseByAnimal from './getMetaBaseByAnimal';
import { DEFAULT_META } from '~/constants/meta';
import { ANIMAL } from 'spec/mock/constants/animal';
import { APP_NAME } from '~/constants';

describe('without animal', () => {
  it('return DEFAULT_META', () => {
    expect(getMetaBaseByAnimal({})).toEqual(DEFAULT_META);
  });
});

describe('with animal', () => {
  const { id, location } = ANIMAL;
  const title = `No.${id} ｜ ${APP_NAME} - 陪你找家`;
  const description = `No.${id} - 正在 ${location} 等家`;
  const prefix = {
    title: 'title',
    description: 'description'
  };

  const testCases = [
    [
      { animal: ANIMAL },
      {
        title,
        description
      }
    ],
    [
      { animal: ANIMAL, prefix: { title: prefix.title } },
      {
        title: `${prefix.title}${title}`,
        description
      }
    ],
    [
      { animal: ANIMAL, prefix: { description: prefix.description } },
      {
        title,
        description: `${prefix.description}${description}`
      }
    ],
    [
      { animal: ANIMAL, prefix },
      {
        title: `${prefix.title}${title}`,
        description: `${prefix.description}${description}`
      }
    ]
  ];

  test('return expected meta', () => {
    testCases.forEach(([input, output]) => {
      expect(getMetaBaseByAnimal(input)).toEqual(output);
    });
  });
});
