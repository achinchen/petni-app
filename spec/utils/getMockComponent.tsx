/* eslint-disable react/display-name */
import React from 'react';

const MyComponent = (props: any = {}) => {
  const updatedProps = Object.entries(props).reduce((temp, [key, value]) => {
    const isListener = key.match('on');
    const formattedKey = isListener ? 'onClick' : key.toLowerCase();
    const formattedValue = isListener ? value : String(value);
    return {
      ...temp,
      [formattedKey]: formattedValue
    };
  }, {});
  return <div {...updatedProps} />;
};

export const MockComponent =
  (name: string, mockProps: any = {}) =>
  (props: any = {}) => {
    return React.createElement(MyComponent, {
      'data-testid': name,
      ...props,
      ...mockProps
    });
  };
