import type { InitialState } from '~/features/adoption/edit/context';
import type { OtherInfoState } from '~/features/adoption/edit/hooks/useOtherInfo';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockComponent } from 'spec/utils/getMockComponent';
import OtherInfo from '.';
import { CONTACT_OPTION, NOTE_OPTION } from './constants';
import * as Context from '~/features/adoption/edit/context';

let mock = {
  otherInfo: Context.initialState.otherInfo,
  districtSelectFinishPayload: {
    country: '台北市',
    district: '士林區'
  }
};

const dispatchOtherInfo: InitialState['dispatchOtherInfo'] = jest.fn(
  ({ value, type }) => {
    mock.otherInfo = {
      ...mock.otherInfo,
      [type]: value
    };
  }
);

beforeEach(() => {
  mock.otherInfo = {
    ...Context.initialState.otherInfo
  };
});

jest.spyOn(Context, 'useEditAdoptionContext').mockImplementation(() => {
  return {
    ...Context.initialState,
    otherInfo: mock.otherInfo,
    dispatchOtherInfo
  };
});

const testId = {
  districtSelect: 'DistrictSelect'
};

jest.mock('~/components/common/DistrictSelect', () =>
  MockComponent('DistrictSelect')
);

describe('rendering', () => {
  const CHILDREN = 'children';

  beforeEach(() => {
    render(
      <OtherInfo>
        <div>{CHILDREN}</div>
      </OtherInfo>
    );
  });

  test('render Contact label', () => {
    expect(
      screen.getByRole('group', { name: new RegExp(CONTACT_OPTION.LABEL) })
    ).toBeDefined();
  });

  test('render Contact input', () => {
    expect(
      screen.getByPlaceholderText(CONTACT_OPTION.TEL_PLACEHOLDER)
    ).toBeDefined();
  });

  test('render DistrictSelect', () => {
    expect(screen.getByTestId(testId.districtSelect)).toBeDefined();
  });

  test('render Note label', () => {
    expect(
      screen.getByRole('group', { name: new RegExp(NOTE_OPTION.LABEL) })
    ).toBeDefined();
  });

  test('render Note input', () => {
    expect(screen.getByPlaceholderText(NOTE_OPTION.PLACEHOLDER)).toBeDefined();
  });

  test('render children', () => {
    expect(screen.getByText(CHILDREN)).toBeDefined();
  });
});

describe('interaction: input', () => {
  const testCases = [
    {
      type: 'contact',
      placeholder: CONTACT_OPTION.TEL_PLACEHOLDER
    },
    {
      type: 'note',
      placeholder: NOTE_OPTION.PLACEHOLDER
    }
  ];

  const input = 'A';

  testCases.forEach(({ type, placeholder }) => {
    describe(`${type}`, () => {
      beforeEach(async () => {
        render(
          <OtherInfo>
            <div />
          </OtherInfo>
        );
        await userEvent.type(screen.getByPlaceholderText(placeholder), input);
      });

      test('trigger dispatchOtherInfo', () => {
        expect(dispatchOtherInfo).toBeCalledWith({
          type,
          value: input
        });
      });

      test('update otherInfo', () => {
        expect(mock.otherInfo[type as keyof OtherInfoState]).toBe(input);
      });
    });
  });
});

describe('interaction: select location', () => {
  beforeEach(async () => {
    render(
      <OtherInfo>
        <div />
      </OtherInfo>
    );

    await userEvent.click(screen.getByTestId(testId.districtSelect));
  });

  test('trigger dispatchOtherInfo', () => {
    expect(dispatchOtherInfo).toBeCalledWith({
      type: 'location',
      value: expect.any(String)
    });
  });

  test('update otherInfo', () => {
    expect(mock.otherInfo.location).not.toBe(
      Context.initialState.otherInfo.location
    );
  });
});
