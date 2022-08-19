import Filter from './Filter';
import Setting from './Setting';
import Button from '~/components/common/Button';
import { usePairContext } from '~/features/pairing/context';
import { useControlContext, ControlContextProvider } from './context';
import { SUBMIT_BUTTON } from './constants';
import { setSoundPreference } from '~/hooks/useSound/utils';
import { setFilter } from '~/features/pairing/ControlPanel/utils';

function Panel() {
  const { showPanel, setShowPanel, refreshCards } = usePairContext();
  const { filter, setting } = useControlContext();

  const updatePreference = () => {
    return new Promise((resolve) => {
      const { sound } = setting;
      setFilter(filter);
      setSoundPreference(sound);
      resolve(null);
    });
  };

  const onSubmit = async () => {
    await updatePreference();
    refreshCards();
    setShowPanel(false);
  };

  return (
    <section
      position="relative"
      display="lg:flex"
      flex="col"
      w="screen lg:120"
      px="9"
      py="8 lg:4"
      shadow="default"
      bg="gray-50"
      z="1"
      overflow-y="scroll"
      {...(!showPanel && { display: 'none lg:flex' })}
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
        justify="self-end"
        onClick={onSubmit}
        theme="black"
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
