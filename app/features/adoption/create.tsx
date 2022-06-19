import { Form } from '@remix-run/react';
import { HeaderPortal } from '~/components/common/Layout/Header';
import placeholder from '~/assets/images/placeholder.jpg';
import Button from '~/components/common/Button';
import {
  TITLE,
  BUTTON,
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION,
  REQUIRED
} from './constants';
import OptionButton from './OptionButton';

export default function CreateAdoption() {
  return (
    <main className="content-width" m="4 lg:auto" py="8">
      <HeaderPortal>
        <div m="auto" text="xl" font="bold">
          {TITLE}
        </div>
      </HeaderPortal>
      <Form flex="~" justify="between" gap="4">
        <div flex="~ col" w="60" h="90" p="4" bg="white" border="rounded-3xl">
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
        <div flex="~ col" gap="4">
          <div
            flex="~"
            justify="between"
            p="5"
            gap="4"
            h="fit"
            bg="white"
            border="rounded-3xl"
          >
            <fieldset>
              <legend>
                {FAMILY_OPTION.LABEL}
                <span color="status-active">{REQUIRED}</span>
                <div flex="~" gap="1" mt="2">
                  {FAMILY_OPTION.OPTIONS.map(({ LABEL, VALUE }) => {
                    const isPressed = false;
                    return (
                      <OptionButton
                        key={VALUE}
                        isPressed={isPressed}
                        icon={LABEL(isPressed)}
                        onClick={() => {}}
                      />
                    );
                  })}
                </div>
              </legend>
            </fieldset>
            <fieldset>
              <legend>
                {GENDER_OPTION.LABEL}
                <span color="status-active">{REQUIRED}</span>
                <div flex="~" gap="1" mt="2">
                  {GENDER_OPTION.OPTIONS.map(({ LABEL, VALUE }) => {
                    const isPressed = false;
                    return (
                      <OptionButton
                        key={VALUE}
                        isPressed={isPressed}
                        icon={LABEL()}
                        onClick={() => {}}
                      />
                    );
                  })}
                </div>
              </legend>
            </fieldset>
          </div>
          <div p="5" h="fit" bg="white" border="rounded-3xl">
            <fieldset>
              <legend>
                {SIZE_OPTION.LABEL}
                <span color="status-active">{REQUIRED}</span>
                <div flex="~" gap="2" mt="2" w="100%">
                  {SIZE_OPTION.OPTIONS.map(({ LABEL, VALUE }) => {
                    const isPressed = false;
                    return (
                      <Button
                        key={VALUE}
                        flex="1"
                        h="10"
                        isDark={isPressed}
                        bg="gray-50"
                        shadow="none"
                        border="rounded-lg"
                        onClick={() => {}}
                      >
                        {LABEL}
                      </Button>
                    );
                  })}
                </div>
              </legend>
            </fieldset>
          </div>
        </div>
      </Form>
    </main>
  );
}
