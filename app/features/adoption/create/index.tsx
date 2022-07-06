import { Form } from '@remix-run/react';
import { HeaderPortal } from '~/components/common/Layout/Header';
import Button from '~/components/common/Button';
import { CreateAdoptionContextProvider } from './context';
import Photo from './Photo';
import AnimalInfo from './AnimalInfo';
import OtherInfo from './OtherInfo';
import { TITLE } from '~/features/adoption/constants';
import { BUTTON } from './constants';

export default function CreateAdoption() {
  return (
    <CreateAdoptionContextProvider>
      <main className="content-width" m="4 lg:auto" p="md:8">
        <HeaderPortal>
          <div m="auto" text="xl" font="bold">
            {TITLE}
          </div>
        </HeaderPortal>
        <Form
          flex="~ col md:row"
          justify="center"
          items="center md:start"
          gap="4"
        >
          <Photo />
          <div flex="~ col lg:row" justify="between" gap="4">
            <AnimalInfo />
            <OtherInfo>
              <Button
                h="12.5"
                theme="black"
                border="rounded-xl"
                onClick={() => {}}
              >
                {BUTTON.SUBMIT}
              </Button>
            </OtherInfo>
          </div>
        </Form>
      </main>
    </CreateAdoptionContextProvider>
  );
}
