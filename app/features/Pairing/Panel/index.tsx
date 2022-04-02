import Filter from './Filter';
import Setting from './Setting';
import Button from '~/components/button';
import { SUBMIT_BUTTON } from './constants';

export default function FilterPanel() {
  return (
    <section
      position="relative"
      w="100% lg:120"
      h="100vh"
      p="8 lg:10"
      shadow="default"
    >
      <Filter />
      <Setting />
      <Button
        position="fixed lg:relative"
        mt="6"
        h="16 lg:12"
        w="100vw lg:100%"
        left="0"
        bottom="0"
        border="lg:rounded-2xl"
        justify="end"
        onClick={() => {}}
        isDark
      >
        {SUBMIT_BUTTON}
      </Button>
    </section>
  );
}
