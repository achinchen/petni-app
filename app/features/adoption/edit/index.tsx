import type { AnimalInfo as Animal } from 'server/adapters/animal/index.presenter';
import { Form } from '@remix-run/react';
import { HeaderPortal } from '~/components/common/Layout/Header';
import Button from '~/components/common/Button';
import { EditAdoptionContextProvider, useEditAdoptionContext } from './context';
import Photo from './Photo';
import AnimalInfo from './AnimalInfo';
import OtherInfo from './OtherInfo';
import { TITLE } from '~/features/adoption/constants';
import { BUTTON, REQUIRED_REMINDER } from './constants';
import { Fragment } from 'react';

type Props = {
  animal?: Animal;
};

export function EditAdoption() {
  const { canSubmit, onSubmit, isLoading, isEditMode } =
    useEditAdoptionContext();

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
        <Photo />
        <div flex="~ col lg:row" justify="between" gap="4">
          <AnimalInfo />
          <OtherInfo>
            <Fragment>
              <Button
                h="12.5"
                theme="black"
                border="rounded-xl"
                disabled={!canSubmit || isLoading}
                onClick={onSubmit}
              >
                {isEditMode ? BUTTON.UPDATE : BUTTON.SUBMIT}
              </Button>
              <div text="sm" color="status-active" hidden={canSubmit}>
                {REQUIRED_REMINDER}
              </div>
            </Fragment>
          </OtherInfo>
        </div>
      </Form>
    </main>
  );
}

export default function EditAdoptionWithProvider({ animal }: Props) {
  return (
    <EditAdoptionContextProvider animal={animal}>
      <EditAdoption />
    </EditAdoptionContextProvider>
  );
}
