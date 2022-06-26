import { Form } from '@remix-run/react';
import { HeaderPortal } from '~/components/common/Layout/Header';
import placeholder from '~/assets/images/placeholder.jpg';
import Button from '~/components/common/Button';
import AnimalInfo from './AnimalInfo';
import OtherInfo from './OtherInfo';

import { TITLE, BUTTON } from './constants';

export default function CreateAdoption() {
  return (
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
        <div
          flex="~ col"
          w="60"
          h="90"
          p="4"
          bg="md:white"
          border="rounded-3xl"
        >
          <div
            w="100%"
            h="100%"
            border="rounded-2xl"
            bg="center cover"
            style={{ backgroundImage: `url(${placeholder})` }}
          />
          <Button
            mt="3"
            h="12.5"
            bg="status-active"
            color="white"
            border="rounded-2xl"
            onClick={() => {}}
          >
            {BUTTON.UPDATE_IMAGE}
          </Button>
        </div>
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
  );
}
