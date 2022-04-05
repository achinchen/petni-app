import Filter from './Filter';
import Setting from './Setting';
import Button from '~/components/button';
import { SUBMIT_BUTTON } from './constants';

export default function FilterPanel() {
  return (
    <section
      position="relative"
      flex="~ col"
      w="100% lg:120"
      p="8 lg:10"
      shadow="default"
      style={{ height: 'calc(100vh - 80px)' }}
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
