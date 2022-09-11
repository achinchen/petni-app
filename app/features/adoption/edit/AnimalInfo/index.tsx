import type {
  ColorValue,
  FamilyValue,
  GenderValue,
  SizeValue
} from '~/features/adoption/edit/types';
import { Fragment } from 'react';
import Input from '~/components/common/Input';
import OptionButton from '~/features/adoption/edit/CardOptionButton';
import Card from '~/features/adoption/edit/Card';
import RequiredLabel from '~/features/adoption/edit/RequiredLabel';
import { useEditAdoptionContext } from '~/features/adoption/edit/context';
import {
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION,
  NAME_OPTION,
  COLOR_OPTION
} from './constants';
import { DEFAULT_VALUE } from '~/constants/options';

export default function AnimalInfo() {
  const { animalInfo, dispatchAnimalInfo } = useEditAdoptionContext();
  const { family, gender, size, color, name } = animalInfo;
  const isSelectedFamily = family !== DEFAULT_VALUE;

  const onFamilyChange = (family: FamilyValue) => () =>
    dispatchAnimalInfo({ type: 'family', value: family });

  const onGenderChange = (gender: GenderValue) => () =>
    dispatchAnimalInfo({ type: 'gender', value: gender });

  const onSizeChange = (size: SizeValue) => () =>
    dispatchAnimalInfo({ type: 'size', value: size });

  const onNameChange = (value: string) =>
    dispatchAnimalInfo({ type: 'name', value });

  const onColorChange = (color: ColorValue) => () =>
    dispatchAnimalInfo({ type: 'color', value: color });

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
                  const isPressed = VALUE === family;
                  const { icon, label } = LABEL();
                  return (
                    <OptionButton
                      key={VALUE}
                      isPressed={isPressed}
                      onClick={onFamilyChange(VALUE)}
                      icon={icon}
                      label={label!}
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
                  const { icon, label } = LABEL();
                  return (
                    <OptionButton
                      key={VALUE}
                      isPressed={VALUE === gender}
                      icon={icon}
                      label={label!}
                      onClick={onGenderChange(VALUE)}
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
                return (
                  <OptionButton
                    key={VALUE}
                    isPressed={VALUE === size}
                    label={LABEL}
                    shape="rectangle"
                    onClick={onSizeChange(VALUE)}
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
            <Input
              value={name}
              onValueChange={onNameChange}
              placeholder={NAME_OPTION.PLACEHOLDER}
            />
          </legend>
        </fieldset>
      </Card>
      {isSelectedFamily && (
        <Card>
          <fieldset w="100%">
            <legend>
              {COLOR_OPTION.LABEL}
              <RequiredLabel />
              <div grid="~ wrap cols-3" gap="2" mt="2">
                {COLOR_OPTION.OPTIONS[family].map(({ LABEL, VALUE }) => {
                  return (
                    <OptionButton
                      key={VALUE}
                      label={LABEL}
                      shape="rectangle"
                      isPressed={color === VALUE}
                      onClick={onColorChange(VALUE)}
                    />
                  );
                })}
              </div>
            </legend>
          </fieldset>
        </Card>
      )}
    </div>
  );
}
