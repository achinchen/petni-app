import React from 'react';

// eslint-disable-next-line react/display-name
export const MockComponent = (name: string) => () => {
  return React.createElement('div', {
    'data-testid': name
  });
};
