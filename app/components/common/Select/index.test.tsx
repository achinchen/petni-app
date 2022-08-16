import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '.';

const options = ['A', 'B', 'C'];
const placeholder = 'placeholder';
const onChange = jest.fn((option) => {});

describe('rendering', () => {
  beforeEach(() => {
    render(
      <Select
        show
        options={options}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  });

  test('render listbox', () => {
    expect(screen.getByRole('listbox')).toBeDefined();
  });

  test('render placeholder item', () => {
    // work around for weird behaviors of toHaveProperty
    expect(
      screen.getByRole('option', { name: placeholder }).attributes
    ).toHaveProperty('disabled');
  });

  test('render options item', () => {
    options.forEach((option) => {
      expect(screen.getByRole('option', { name: option })).toBeDefined();
    });
  });
});

describe('interaction', () => {
  const selectedOption = options[0];

  beforeEach(() => {
    render(
      <Select
        show
        options={['', ...options]}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  });

  test('not trigger onChange when option is empty', async () => {
    await userEvent.click(screen.getByRole('option', { name: '' }));
    expect(onChange).not.toBeCalled();
  });

  test('trigger onChange', async () => {
    await userEvent.click(screen.getByRole('option', { name: selectedOption }));
    expect(onChange).toBeCalled();
  });

  test('update selected state', async () => {
    await userEvent.click(screen.getByRole('option', { name: selectedOption }));
    // work around for weird behaviors of toHaveProperty
    expect(
      screen
        .getByRole('option', { name: selectedOption })
        .getAttribute('aria-selected')
    ).toBe('true');
  });
});

//   const [selectedOption, setSelectedOption] = useState('');

//   const onClick = (event: MouseEvent<HTMLLIElement>) => {
//     const option = (event.target as HTMLLIElement).textContent;
//     if (!option) return;
//     onChange(option);
//     setSelectedOption(option);
//   };
