import type { InitialState } from '~/features/adoption/edit/context';
import type { AnimalInfoState } from '~/features/adoption/edit/hooks/useAnimalInfo';
import {
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION,
  NAME_OPTION,
  COLOR_OPTION
} from './constants';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Context from '~/features/adoption/edit/context';
import AnimalInfo from '.';

let mock = { animalInfo: Context.initialState.animalInfo };
const dispatchAnimalInfo: InitialState['dispatchAnimalInfo'] = jest.fn(
  ({ value, type }) => {
    mock.animalInfo = {
      ...mock.animalInfo,
      [type]: value
    };
  }
);

jest.spyOn(Context, 'useEditAdoptionContext').mockImplementation(() => {
  return {
    ...Context.initialState,
    animalInfo: mock.animalInfo,
    dispatchAnimalInfo
  };
});

const currentFamily = FAMILY_OPTION.OPTIONS[0].VALUE;
beforeEach(() => {
  mock = {
    animalInfo: {
      ...Context.initialState.animalInfo,
      family: currentFamily
    }
  };
});

describe('rendering', () => {
  beforeEach(() => {
    render(<AnimalInfo />);
  });

  test('render Family label', () => {
    expect(
      screen.getByRole('group', { name: new RegExp(FAMILY_OPTION.LABEL) })
    ).toBeDefined();
  });

  test('render Family option button', () => {
    FAMILY_OPTION.OPTIONS.forEach(({ LABEL }) => {
      expect(screen.getByRole('button', { name: LABEL().label })).toBeDefined();
    });
  });

  test('render Gender label', () => {
    expect(
      screen.getByRole('group', { name: new RegExp(GENDER_OPTION.LABEL) })
    ).toBeDefined();
  });

  test('render Gender option button', () => {
    GENDER_OPTION.OPTIONS.forEach(({ LABEL }) => {
      const { label } = LABEL();
      expect(screen.getByRole('button', { name: label })).toBeDefined();
    });
  });

  test('render Size label', () => {
    expect(
      screen.getByRole('group', { name: new RegExp(SIZE_OPTION.LABEL) })
    ).toBeDefined();
  });

  test('render Size option button', () => {
    SIZE_OPTION.OPTIONS.forEach(({ LABEL }) => {
      expect(screen.getByRole('button', { name: LABEL })).toBeDefined();
    });
  });

  test('render Name label', () => {
    expect(
      screen.getByRole('group', { name: NAME_OPTION.LABEL })
    ).toBeDefined();
  });

  test('render Name input', () => {
    expect(screen.getByPlaceholderText(NAME_OPTION.PLACEHOLDER)).toBeDefined();
  });

  test('render Color label when family is defined', () => {
    expect(
      screen.getByRole('group', { name: new RegExp(COLOR_OPTION.LABEL) })
    ).toBeDefined();
  });

  test('render Color option button when family is defined', () => {
    COLOR_OPTION.OPTIONS[currentFamily].forEach(({ LABEL }) => {
      expect(screen.getByRole('button', { name: LABEL })).toBeDefined();
    });
  });
});

describe('interaction: button case', () => {
  const selected = {
    family: FAMILY_OPTION.OPTIONS[0],
    gender: GENDER_OPTION.OPTIONS[0],
    size: SIZE_OPTION.OPTIONS[0],
    color: COLOR_OPTION.OPTIONS[currentFamily][0]
  };

  const testCases = [
    {
      type: 'family',
      selectedOption: selected.family,
      selectedButtonName: selected.family.LABEL().label
    },
    {
      type: 'gender',
      selectedOption: selected.gender,
      selectedButtonName: selected.gender.LABEL().label
    },
    {
      type: 'size',
      selectedOption: selected.size,
      selectedButtonName: selected.size.LABEL
    },
    {
      type: 'color',
      selectedOption: selected.color,
      selectedButtonName: selected.color.LABEL
    }
  ];

  testCases.forEach(({ type, selectedOption, selectedButtonName }) => {
    describe(`${type}`, () => {
      beforeEach(async () => {
        render(<AnimalInfo />);
        await act(() =>
          userEvent.click(
            screen.getByRole('button', {
              name: selectedButtonName
            })
          )
        );
      });

      test('trigger dispatchAnimalInfo', () => {
        expect(dispatchAnimalInfo).toBeCalledWith({
          type,
          value: selectedOption.VALUE
        });
      });

      test(`update animalInfo.${type}`, () => {
        expect(mock.animalInfo[type as keyof AnimalInfoState]).toBe(
          selectedOption.VALUE
        );
      });
    });
  });
});

describe('interaction: input case', () => {
  const name = 'a';
  beforeEach(async () => {
    render(<AnimalInfo />);
    await act(() =>
      userEvent.type(screen.getByPlaceholderText(NAME_OPTION.PLACEHOLDER), name)
    );
  });

  test('trigger dispatchAnimalInfo', () => {
    expect(dispatchAnimalInfo).toBeCalledWith({
      type: 'name',
      value: name
    });
  });

  test(`update animalInfo.name`, () => {
    expect(mock.animalInfo.name).toBe(name);
  });
});
