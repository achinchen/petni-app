import type { FormProps } from '@remix-run/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPanel from '.';
import { TITLE, CANCEL, OAUTH_PROVIDER } from './constants';

const mock = {
  onClose: jest.fn(),
  onSubmit: jest.fn().mockImplementation((e) => e.preventDefault())
};

jest.mock('@remix-run/react', () => {
  const remix = jest.requireActual('@remix-run/react');
  return {
    ...remix,
    Form: (props: FormProps) => (
      // eslint-disable-next-line jsx-a11y/no-redundant-roles
      <form role="form" {...props} onSubmit={mock.onSubmit}>
        {props!.children}
      </form>
    )
  };
});

describe('rendering', () => {
  beforeEach(() => {
    render(<LoginPanel onClose={mock.onClose} isOpen />);
  });

  test('render TITLE', () => {
    expect(screen.getByText(TITLE)).toBeDefined();
  });

  test('render form with action', () => {
    expect(screen.getByRole('form').getAttribute('action')).toBe(
      '/api/auth/google'
    );
  });

  test('render form with method', () => {
    expect(screen.getByRole('form').getAttribute('method')).toBe('post');
  });

  test('render google button', () => {
    expect(screen.getByText(OAUTH_PROVIDER.GOOGLE.CONTENT)).toBeDefined();
  });

  test('render google icon', () => {
    expect(screen.getByRole('img')).toHaveProperty(
      'src',
      expect.stringContaining(OAUTH_PROVIDER.GOOGLE.ICON)
    );
  });

  test('render cancel button', () => {
    expect(screen.getByText(CANCEL)).toBeDefined();
  });
});

describe('interaction: cancel', () => {
  beforeEach(async () => {
    render(<LoginPanel onClose={mock.onClose} isOpen />);
    await userEvent.click(screen.getByText(CANCEL));
  });

  test('trigger onClose', () => {
    expect(mock.onClose).toBeCalled();
  });
});

describe('interaction: confirm', () => {
  beforeEach(() => {
    render(<LoginPanel onClose={mock.onClose} isOpen />);
  });

  test('trigger onSubmit', async () => {
    await userEvent.click(screen.getByText(OAUTH_PROVIDER.GOOGLE.CONTENT));

    expect(mock.onSubmit).toBeCalled();
  });
});
