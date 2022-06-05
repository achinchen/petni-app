import type { SettingState } from './hooks/useSettingState';
import type { FilterState } from '~/features/pairing/ControlPanel/hooks/useFilterState';
import Filter from './Filter';
import Setting from './Setting';
import Button from '~/components/common/Button';
import { usePairContext } from '~/features/pairing/context';
import { useControlContext, ControlContextProvider } from './context';
import { SUBMIT_BUTTON } from './constants';
import { setSoundPreference } from '~/hooks/useSound/utils';
import { setFilterPreference } from './utils';

function Panel() {
  const { showPanel, onPreferenceSubmit } = usePairContext();
  const { filter, setting } = useControlContext();

  const updatePreference = () => {
    return new Promise((resolve) => {
      const { sounds } = setting;
      setFilterPreference(filter);
      setSoundPreference(sounds);
      resolve(null);
    });
  };

  const onSubmit = async () => {
    await updatePreference();
    onPreferenceSubmit();
  };

  return (
    <section
      position="relative"
      display="lg:flex"
      flex="col"
      w="screen lg:120"
      p="4 sm:8"
      shadow="default"
      bg="gray-50"
      z="1"
      {...(!showPanel && { display: 'lt-lg:none' })}
    >
      <Filter />
      <Setting />
      <Button
        position="fixed lg:relative"
        mt="auto"
        h="16 lg:12"
        w="100vw lg:100%"
        left="0"
        bottom="0"
        border="lg:rounded-2xl"
        justify="end"
        onClick={onSubmit}
        isDark
        z="1"
      >
        {SUBMIT_BUTTON}
      </Button>
    </section>
  );
}

export default function PanelWithContext() {
  return (
    <ControlContextProvider>
      <Panel />
    </ControlContextProvider>
  );
}
