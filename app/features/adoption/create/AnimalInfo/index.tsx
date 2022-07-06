import Input from '~/components/common/Input';
import OptionButton from '../CardOptionButton';
import Card from '../Card';

import {
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION,
  NAME_OPTION,
  REQUIRED,
  COLOR_OPTION
} from './constants';
import { Fragment } from 'react';
import { Family } from '@prisma/client';

export default function AnimalInfo() {
  return (
    <div flex="~ col" w="100%" max-w="98" gap="4">
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
              <span color="status-active">{REQUIRED}</span>
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
            <span color="status-active">{REQUIRED}</span>
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
            <span color="status-active">{REQUIRED}</span>
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
