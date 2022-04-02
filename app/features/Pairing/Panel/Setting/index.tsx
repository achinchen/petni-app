import { Fragment, useReducer } from 'react';
import SwitchButton from '~/components/SwitchButton';
import { Setting, SETTING_OPTIONS } from './constants';

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

export default function FilterPanel() {
  const [setting, dispatchSetting] = useReducer(reducer, initial);

  const onSettingChange = (type: Setting) => () => dispatchSetting(type);

  return (
    <Fragment>
      {SETTING_OPTIONS.map(({ CATEGORY, LABEL }) => (
        <div flex="~" justify="between" mb="8 lg:3" key={CATEGORY}>
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
