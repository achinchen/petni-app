import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeletePanel from '.';
import { CONFIRM, CANCEL, TITLE } from './constants';

const props = {
  onConfirm: jest.fn(),
  onClose: jest.fn(),
  onCancel: jest.fn()
};

describe('rendering', () => {
  beforeEach(() => {
    render(<DeletePanel isOpen {...props} />);
  });

  test('render dialog', () => {
    expect(screen.getByRole('dialog')).toHaveProperty('open', true);
  });

  test('render TITLE', () => {
    expect(screen.getByText(TITLE)).toBeDefined();
  });

  test('render CONFIRM button', () => {
    expect(screen.getByRole('button', { name: CONFIRM })).toBeDefined();
  });

  test('render CANCEL button', () => {
    expect(screen.getByRole('button', { name: CANCEL })).toBeDefined();
  });
});

describe('interaction', () => {
  beforeEach(() => {
    render(<DeletePanel isOpen {...props} />);
  });

  test('trigger onConfirm when click confirm', async () => {
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: CONFIRM }))
    );
    expect(props.onConfirm).toBeCalled();
  });

  test('trigger onClose when click cancel', async () => {
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: CANCEL }))
    );
    expect(props.onClose).toBeCalled();
  });

  test('trigger onCancel when click cancel', async () => {
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: CANCEL }))
    );
    expect(props.onCancel).toBeCalled();
  });
});
