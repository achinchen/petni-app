import { Fragment } from 'react';
import { Family } from '@prisma/client';
import Input from '~/components/common/Input';
import OptionButton from '~/features/adoption/create/CardOptionButton';
import Card from '~/features/adoption/create/Card';
import RequiredLabel from '~/features/adoption/create/RequiredLabel';
import {
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION,
  NAME_OPTION,
  COLOR_OPTION
} from './constants';

export default function AnimalInfo() {
  return (
    <div flex="~ col" w="100%" max-w="98" gap="4">
      <Card>
        <Fragment>
          <fieldset>
            <legend>
              {FAMILY_OPTION.LABEL}
              <RequiredLabel />
              <div flex="~" gap="1" mt="2">
                {FAMILY_OPTION.OPTIONS.map(({ LABEL, VALUE }) => {
                  const isPressed = false;
                  return (
                    <OptionButton
                      key={VALUE}
                      isPressed={isPressed}
                      label={LABEL(isPressed)}
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
              <RequiredLabel />
              <div flex="~" gap="1" mt="2">
                {GENDER_OPTION.OPTIONS.map(({ LABEL, VALUE }) => {
                  const isPressed = false;
                  return (
                    <OptionButton
                      key={VALUE}
                      isPressed={isPressed}
                      label={LABEL()}
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
        <fieldset w="100%">
          <legend>
            {SIZE_OPTION.LABEL}
            <RequiredLabel />
            <div grid="~ cols-3" gap="2" mt="2">
              {SIZE_OPTION.OPTIONS.map(({ LABEL, VALUE }) => {
                const isPressed = false;
                return (
                  <OptionButton
                    key={VALUE}
                    isPressed={isPressed}
                    label={LABEL}
                    shape="rectangle"
                    onClick={() => {}}
                  />
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
        <fieldset w="100%">
          <legend>
            {COLOR_OPTION.LABEL}
            <RequiredLabel />
            <div grid="~ wrap cols-3" gap="2" mt="2">
              {COLOR_OPTION.OPTION(Family.Dog).map(({ LABEL, VALUE }) => {
                const isPressed = false;
                return (
                  <OptionButton
                    key={VALUE}
                    label={LABEL}
                    shape="rectangle"
                    isPressed={isPressed}
                    onClick={() => {}}
                  />
                );
              })}
            </div>
          </legend>
        </fieldset>
      </Card>
    </div>
  );
}
