import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSelect from '.';

const options = ['AAA', 'ABB', 'ABC', 'QQQ'];
const placeholder = 'placeholder';
const formatFilterInput = jest.fn((input: string) => input);
const onSelect = jest.fn((option: string) => {});

jest.mock('debounce', () => {
  return {
    debounce: (callback: any, timer: number) => callback
  };
});

describe('rendering', () => {
  beforeEach(() => {
    render(
      <SearchSelect
        options={options}
        placeholder={placeholder}
        formatFilterInput={formatFilterInput}
        onSelect={onSelect}
      />
    );
  });

  test('render input', () => {
    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });

  test('render option list', () => {
    expect(screen.queryByRole('listbox')).toBeDefined();
  });
});

describe('initialization', () => {
  const initValue = 'QQ';

  beforeEach(() => {
    render(
      <SearchSelect
        options={options}
        placeholder={placeholder}
        formatFilterInput={formatFilterInput}
        onSelect={onSelect}
        initValue={initValue}
        disabled
      />
    );
  });

  test('use initValue as input.value', () => {
    expect(screen.getByPlaceholderText(placeholder)).toHaveProperty(
      'value',
      initValue
    );
  });

  test('set input disabled when props.disabled is true', () => {
    expect(screen.getByPlaceholderText(placeholder)).toHaveProperty(
      'disabled',
      true
    );
  });
});

describe('interaction: focus', () => {
  beforeEach(async () => {
    render(
      <SearchSelect
        options={options}
        placeholder={placeholder}
        formatFilterInput={formatFilterInput}
        onSelect={onSelect}
      />
    );

    await userEvent.click(screen.getByPlaceholderText('placeholder'));
  });

  test('render option list', () => {
    expect(screen.getByRole('listbox')).toBeDefined();
  });
});

describe('interaction: blur', () => {
  beforeEach(async () => {
    render(
      <SearchSelect
        options={options}
        placeholder={placeholder}
        formatFilterInput={formatFilterInput}
        onSelect={onSelect}
      />
    );

    await userEvent.click(screen.getByPlaceholderText('placeholder'));
    screen.getByPlaceholderText('placeholder').blur();
  });

  test('not render option list', () => {
    expect(() => screen.getByRole('listbox')).toThrow();
  });
});

describe('interaction: change', () => {
  const typedContent = 'A';
  beforeEach(() => {
    render(
      <SearchSelect
        options={options}
        placeholder={placeholder}
        formatFilterInput={formatFilterInput}
        onSelect={onSelect}
      />
    );
  });

  test('not trigger formatFilterInput when input is empty', async () => {
    await userEvent.clear(screen.getByPlaceholderText('placeholder'));
    expect(formatFilterInput).not.toBeCalled();
  });

  test('trigger formatFilterInput', async () => {
    await userEvent.type(
      screen.getByPlaceholderText('placeholder'),
      typedContent
    );
    expect(formatFilterInput).toBeCalled();
  });

  test('trigger onSelect', async () => {
    await userEvent.type(
      screen.getByPlaceholderText('placeholder'),
      typedContent
    );
    expect(onSelect).toBeCalled();
  });

  test('update value', async () => {
    await userEvent.type(
      screen.getByPlaceholderText('placeholder'),
      typedContent
    );
    expect(screen.getByPlaceholderText('placeholder')).toHaveProperty(
      'value',
      typedContent
    );
  });

  test('update filtered options', async () => {
    await userEvent.type(
      screen.getByPlaceholderText('placeholder'),
      typedContent
    );

    const filteredOptions = options.filter((option) =>
      option.includes(typedContent)
    );

    filteredOptions.forEach((option) => {
      expect(screen.getByRole('option', { name: option })).toBeDefined();
    });
  });
});
