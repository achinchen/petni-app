import Filter from './Filter';
import Setting from './Setting';
import Button from '~/components/button';
import { usePairContext } from '~/features/Pairing/context';
import { SUBMIT_BUTTON } from './constants';

export default function Panel() {
  const { showPanel } = usePairContext();

  return (
    <section
      position="relative"
      display="lg:flex"
      flex="col"
      w="screen lg:120"
      p="4 sm:8 lg:10"
      shadow="default"
      bg="gray-50"
      z="1"
      {...(!showPanel && { display: 'none' })}
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
        onClick={() => {}}
        isDark
        z="1"
      >
        {SUBMIT_BUTTON}
      </Button>
    </section>
  );
}
