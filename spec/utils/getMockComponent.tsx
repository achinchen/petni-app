/* eslint-disable react/display-name */
import React from 'react';

const MyComponent = (props: any = {}) => {
  const updatedProps = Object.entries(props).reduce((temp, [key, value]) => {
    return { ...temp, [key.match('on') ? 'onClick' : key]: value };
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
