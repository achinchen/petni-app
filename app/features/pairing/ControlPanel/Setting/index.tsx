import type { Setting } from '~/features/pairing/ControlPanel/constants/setting';
import { Fragment, useEffect } from 'react';
import SwitchButton from '~/components/common/SwitchButton';
import { useControlContext } from '~/features/pairing/ControlPanel/context';
import { SETTING_OPTIONS } from '~/features/pairing/ControlPanel/constants/setting';
import getCurrentCity from './utils/getCurrentCity';

export default function SettingPanel() {
  const { setting, dispatchSetting } = useControlContext();

  const onSettingChange = (type: Setting) => () => dispatchSetting(type);

  useEffect(() => {
    if (setting.searchNear) getCurrentCity();
  }, [setting.searchNear]);

  return (
    <Fragment>
      {SETTING_OPTIONS.map(({ CATEGORY, LABEL }) => (
        <div flex="~" justify="between" mb="8 lg:4" key={CATEGORY}>
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
