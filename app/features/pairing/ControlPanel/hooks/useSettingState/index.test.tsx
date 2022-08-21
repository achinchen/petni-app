import { renderHook } from '@testing-library/react-hooks';
import useSettingState from '.';

import * as utils from '~/features/pairing/ControlPanel/utils';

type ReturnResult = ReturnType<typeof useSettingState>;

jest.spyOn(utils, 'getLocationCity');

describe('return value', () => {
  let result: ReturnResult;

  beforeEach(() => {
    const {
      result: { current }
    } = renderHook(() => useSettingState());
    result = current;
  });

  test('return setting', () => {
    expect(result.setting).toBeDefined();
  });

  test('return dispatchSetting', () => {
    expect(result.dispatchSetting).toBeDefined();
  });
});

describe('initialization', () => {
  test('trigger getLocationCity', () => {
    jest.spyOn(utils, 'getLocationCity').mockReturnValueOnce('台北市');
    renderHook(() => useSettingState());
    expect(utils.getLocationCity).toBeCalled();
  });

  test('update setting.searchNear when getLocation is truthy', () => {
    jest.spyOn(utils, 'getLocationCity').mockReturnValueOnce('台北市');

    const {
      result: {
        current: { setting }
      }
    } = renderHook(() => useSettingState());

    expect(setting.searchNear).toBe(true);
  });

  test('not update setting.searchNear when getLocation is falsy', () => {
    jest.spyOn(utils, 'getLocationCity').mockReturnValueOnce(undefined);
    const {
      result: {
        current: { setting }
      }
    } = renderHook(() => useSettingState());

    expect(setting.searchNear).toBe(false);
  });
});
