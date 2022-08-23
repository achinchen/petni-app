import type { Setting as SettingType } from '~/features/pairing/ControlPanel/constants/setting';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockComponent } from 'spec/utils/getMockComponent';
import Setting from '.';
import getCurrentCity from './utils/getCurrentCity';
import { initialState } from '~/features/pairing/ControlPanel/context';
import { SETTING_OPTIONS } from '~/features/pairing/ControlPanel/constants/setting';

const mock = {
  setting: initialState.setting,
  dispatchSetting: jest.fn()
};

mock.dispatchSetting = jest.fn(
  (type: SettingType) => (mock.setting[type] = !mock.setting[type])
);

jest.mock('~/features/pairing/ControlPanel/context', () => {
  const { initialState } = jest.requireActual(
    '~/features/pairing/ControlPanel/context'
  );

  return {
    __esModule: true,
    initialState,
    useControlContext: () => ({
      setting: mock.setting,
      dispatchSetting: mock.dispatchSetting
    })
  };
});

jest.mock('./utils/getCurrentCity');

const testId = {
  switchButton: 'SwitchButton'
};

jest.mock('~/components/common/SwitchButton', () =>
  MockComponent('SwitchButton')
);

describe('rendering', () => {
  beforeEach(() => {
    render(<Setting />);
  });

  test('render label', () => {
    SETTING_OPTIONS.forEach(({ LABEL }) => {
      expect(screen.getByText(LABEL)).toBeDefined();
    });
  });

  test('render SwitchButton', () => {
    expect(screen.getAllByTestId(testId.switchButton)).toHaveLength(
      SETTING_OPTIONS.length
    );
  });
});

describe('initial: setting.searchNear', () => {
  test('not trigger getCurrentCity when setting.searchNear is false', () => {
    mock.setting.searchNear = false;
    render(<Setting />);
    expect(getCurrentCity).not.toBeCalled();
  });

  test('trigger getCurrentCity when setting.searchNear is true', () => {
    mock.setting.searchNear = true;
    render(<Setting />);
    expect(getCurrentCity).toBeCalled();
  });
});

describe('interaction', () => {
  beforeEach(() => {
    render(<Setting />);
  });

  SETTING_OPTIONS.forEach(({ CATEGORY, LABEL }, index) => {
    test(`trigger dispatchSetting with ${CATEGORY} when click SwitchButton`, async () => {
      await userEvent.click(screen.getAllByTestId(testId.switchButton)[index]);
      expect(mock.dispatchSetting).toBeCalledWith(CATEGORY);
    });
  });
});
