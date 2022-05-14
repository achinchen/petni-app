import { useReducer } from 'react';
import { Setting } from '~/features/pairing/ControlPanel/constants/setting';
export { Setting } from '~/features/pairing/ControlPanel/constants/setting';

export type SettingState = {
  [key in Setting]: boolean;
};

export const initialSetting = {
  [Setting.SearchNear]: true,
  [Setting.Sounds]: true
};

function reducer(state: SettingState, type: Setting) {
  return { ...state, [type]: !state[type] };
}

export default function useSettingState() {
  const [setting, dispatchSetting] = useReducer(reducer, initialSetting);
  return { setting, dispatchSetting };
}
