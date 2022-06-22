import { Form } from '@remix-run/react';
import { HeaderPortal } from '~/components/common/Layout/Header';
import placeholder from '~/assets/images/placeholder.jpg';
import DistrictSelect from '~/components/common/DistrictSelect';
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import OptionButton from './OptionButton';
import Card from './Card';

import {
  TITLE,
  BUTTON,
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION,
  NAME_OPTION,
  REQUIRED,
  COLOR_OPTION,
  CONTACT_OPTION
} from './constants';
import { Fragment } from 'react';
import { Family } from '@prisma/client';
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
        <div flex="~ col" w="98" gap="4">
          <Card>
            <Fragment>
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
            </Fragment>
          </Card>
          <Card>
            <fieldset flex="1">
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
                        theme="gray"
                        isPressed={isPressed}
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
          </Card>
          <Card>
            <fieldset flex="1">
              <legend flex="~ col">
                {NAME_OPTION.LABEL}
                <Input placeholder={NAME_OPTION.PLACEHOLDER} />
              </legend>
            </fieldset>
          </Card>
          <Card>
            <fieldset>
              <legend>
                {COLOR_OPTION.LABEL}
                <span color="status-active">{REQUIRED}</span>
                <div flex="~ wrap" gap="2" mt="2">
                  {COLOR_OPTION.OPTION(Family.Dog).map(({ LABEL, VALUE }) => {
                    const isPressed = false;
                    return (
                      <Button
                        key={VALUE}
                        theme="gray"
                        h="10"
                        w="100% lg:28"
                        shadow="none"
                        isPressed={isPressed}
                        onClick={() => {}}
                      >
                        {LABEL}
                      </Button>
                    );
                  })}
                </div>
              </legend>
            </fieldset>
          </Card>
        </div>
        <div flex="~ col" w="78" gap="4">
          <Card>
            <fieldset flex="1">
              <legend>
                {CONTACT_OPTION.LABEL}
                <span color="status-active">{REQUIRED}</span>
                <Input placeholder={CONTACT_OPTION.TEL_PLACEHOLDER} />
              </legend>
              <DistrictSelect />
            </fieldset>
          </Card>
        </div>
      </Form>
    </main>
  );
}
