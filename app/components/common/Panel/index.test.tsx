import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Panel from '.';

const CHILDREN = 'children';
const TITLE = 'title';
const onClose = jest.fn();

const renderComponent = ({ isOpen = true, title = '' } = {}) => {
  render(
    <Panel isOpen={isOpen} onClose={onClose} title={title}>
      <div>{CHILDREN}</div>
    </Panel>
  );
};

describe('rendering', () => {
  test('render dialog backdrop', () => {
    renderComponent();
    expect(screen.getByRole('presentation')).toBeDefined();
  });

  test('not render dialog backdrop', () => {
    renderComponent({ isOpen: false });
    expect(() => screen.getByRole('presentation')).toThrow();
  });

  test('render dialog', () => {
    renderComponent();
    expect(screen.getByRole('dialog')).toHaveProperty('open', true);
  });

  test('not render dialog', () => {
    renderComponent({ isOpen: false });
    expect(() => screen.getByRole('dialog')).toThrow();
  });

  test('render title', () => {
    renderComponent({ title: TITLE });
    expect(
      screen.getByRole('heading', { level: 2, name: TITLE })
    ).toBeDefined();
  });

  test('not render title', () => {
    renderComponent();
    expect(() => screen.getByRole('heading')).toThrow();
  });

  test('render children', () => {
    renderComponent();
    expect(screen.getByText(CHILDREN)).toBeDefined();
  });
});

describe('interaction', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('trigger onClose when click backdrop', async () => {
    await act(() => userEvent.click(screen.getByRole('presentation')));
    expect(onClose).toBeCalled();
  });

  test('not trigger onClose when click dialog', async () => {
    await act(() => userEvent.click(screen.getByRole('dialog')));
    expect(onClose).not.toBeCalled();
  });
});
