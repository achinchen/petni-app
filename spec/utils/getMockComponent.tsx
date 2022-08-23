/* eslint-disable react/display-name */
import React from 'react';
import { screen } from '@testing-library/react';
import kebabCase from 'kebab-case';

const BOOLEAN_ATTRIBUTES = [
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'selected',
  'truespeed'
];

const MyComponent = (props: any = {}) => {
  const updatedProps = Object.entries(props).reduce((temp, [key, value]) => {
    const isListener = key.match(/^on/);
    const formattedKey = isListener ? 'onClick' : kebabCase(key);
    const shouldUseOriginValue = isListener || BOOLEAN_ATTRIBUTES.includes(key);
    const formattedValue = shouldUseOriginValue ? value : String(value);
    return {
      ...temp,
      [formattedKey]: formattedValue
    };
  }, {});
  return <div {...updatedProps} />;
};

let testId = '';
export const getProp = (prop: string, targetTestId = testId) =>
  screen.getAllByTestId(targetTestId)[0].getAttribute(kebabCase(prop));

export const MockComponent =
  (name: string, mockProps: any = {}) =>
  (props: any = {}): JSX.Element => {
    testId = name;
    return React.createElement(MyComponent, {
      'data-testid': name,
      ...props,
      ...mockProps
    });
  };
