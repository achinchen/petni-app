import { useEffect, useReducer } from 'react';
import { getLocationCity } from '~/features/pairing/ControlPanel/utils';
import { Setting } from '~/features/pairing/ControlPanel/constants/setting';
export { Setting } from '~/features/pairing/ControlPanel/constants/setting';

export type SettingState = {
  [key in Setting]: boolean;
};

export const initialSetting = {
  [Setting.SearchNear]: false,
  [Setting.Sound]: false
};

function reducer(state: SettingState, type: Setting) {
  return { ...state, [type]: !state[type] };
}

export default function useSettingState() {
  const [setting, dispatchSetting] = useReducer(reducer, initialSetting);

  useEffect(() => {
    const SearchNear = Boolean(getLocationCity());
    if (SearchNear) dispatchSetting(Setting.SearchNear);
  }, [dispatchSetting]);

  return { setting, dispatchSetting };
}
