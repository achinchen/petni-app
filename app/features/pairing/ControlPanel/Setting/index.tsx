import { Fragment, useReducer } from 'react';
import SwitchButton from '~/components/common/SwitchButton';
import {
  Setting,
  SETTING_OPTIONS
} from '~/features/pairing/ControlPanel/constants/setting';

type State = {
  [key in Setting]: boolean;
};

const initial = {
  [Setting.SearchNear]: true,
  [Setting.Sounds]: true
};

function reducer(state: State, type: Setting) {
  return { ...state, [type]: !state[type] };
}

export default function SettingPanel() {
  const [setting, dispatchSetting] = useReducer(reducer, initial);

  const onSettingChange = (type: Setting) => () => dispatchSetting(type);

  return (
    <Fragment>
      {SETTING_OPTIONS.map(({ CATEGORY, LABEL }) => (
        <div flex="~" justify="between" mb="8" key={CATEGORY}>
          <div font="medium">{LABEL}</div>
          <SwitchButton
            onChange={onSettingChange(CATEGORY)}
            checked={setting[CATEGORY]}
          />
        </div>
      ))}
    </Fragment>
  );
}
