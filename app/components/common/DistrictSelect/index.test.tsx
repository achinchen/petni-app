import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DistrictSelection from '.';
import * as utils from './utils';
import { PLACEHOLDER } from './constants';

jest.spyOn(utils, 'getInitCountryAndDistrict');
const onFinish = jest.fn();
const initDistrict = '士林區';
const initCountry = '臺北市';
const initLocation = `${initCountry}${initDistrict}`;

const renderComponent = (location = initLocation) => {
  render(<DistrictSelection location={location} onFinish={onFinish} />);
};

describe('rendering', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('render country input', () => {
    expect(screen.getByPlaceholderText(PLACEHOLDER.COUNTRY)).toBeDefined();
  });

  test('render district input', () => {
    expect(screen.getByPlaceholderText(PLACEHOLDER.DISTRICT)).toBeDefined();
  });

  test('trigger getInitCountryAndDistrict to init', () => {
    expect(utils.getInitCountryAndDistrict).toBeCalled();
  });
});

describe('interaction: country', () => {
  beforeEach(async () => {
    renderComponent();
    await userEvent.clear(screen.getByPlaceholderText(PLACEHOLDER.COUNTRY));
    await userEvent.click(screen.getAllByRole('option')[2]);
  });

  test('clear district input when country is different', () => {
    expect(screen.getByPlaceholderText(PLACEHOLDER.DISTRICT)).toHaveProperty(
      'value',
      ''
    );
  });

  test('update country', () => {
    expect(screen.getByPlaceholderText(PLACEHOLDER.COUNTRY)).not.toHaveProperty(
      'value',
      initCountry
    );
  });

  test('update district options', () => {
    expect(() => screen.getByRole('option', { name: initDistrict })).toThrow();
  });
});

describe('interaction: district', () => {
  beforeEach(async () => {
    renderComponent();
    await userEvent.clear(screen.getByPlaceholderText(PLACEHOLDER.DISTRICT));
  });
  test('be disabled when country is empty', async () => {
    await userEvent.clear(screen.getByPlaceholderText(PLACEHOLDER.COUNTRY));
    expect(screen.getByPlaceholderText(PLACEHOLDER.DISTRICT)).toHaveProperty(
      'disabled',
      true
    );
  });

  test('update district', async () => {
    expect(screen.getByPlaceholderText(PLACEHOLDER.DISTRICT)).toHaveProperty(
      'value',
      ''
    );
  });

  test('not trigger onFinish when district is empty', async () => {
    expect(onFinish).not.toBeCalled();
  });

  test('trigger onFinish', async () => {
    const option = screen.getAllByRole('option')[2];
    await userEvent.click(option);

    expect(onFinish).toBeCalledWith({
      country: initCountry,
      district: option.textContent
    });
  });
});

//   const onDistrictSelect = (district: Payload['district']) => {
//     if (!country) return;
//     setDistrict(district);
//     onFinish({ country, district });
//   };
