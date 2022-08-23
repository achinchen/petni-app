import { render, screen } from '@testing-library/react';
import Header, { HeaderPortal } from '.';
import ReactDom from 'react-dom';

const mock = {
  createPortal: jest.fn(),
  children: 'children'
};

jest.spyOn(ReactDom, 'createPortal');

describe('initialization', () => {
  test('not trigger createPortal when Header does not mount', () => {
    render(
      <HeaderPortal>
        <div>{mock.children}</div>
      </HeaderPortal>
    );
    expect(ReactDom.createPortal).not.toBeCalled();
  });

  test('trigger createPortal when Header mounted', () => {
    render(<Header />);
    render(
      <HeaderPortal>
        <div>{mock.children}</div>
      </HeaderPortal>
    );
    expect(ReactDom.createPortal).toBeCalled();
  });
});
