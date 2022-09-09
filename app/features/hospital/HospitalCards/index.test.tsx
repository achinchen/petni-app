import { render, screen } from '@testing-library/react';
import setup from 'spec/utils/IntersectionObserver';
import HospitalCards from '.';
import { HOSPITALS, City } from '~/features/hospital/constants';

const mockTelephone = 'tel:02123569';
const mockAddress = 'https://adress.map/';

jest.mock('~/utils', () => ({
  getTelephoneLink: () => mockTelephone,
  getAddressLink: () => mockAddress
}));

setup();

describe('rendering', () => {
  const city = City.Taipei;
  const hospitals = HOSPITALS[City.Taipei];
  const hospital = hospitals[0];

  beforeEach(() => {
    render(<HospitalCards city={city} hospitals={hospitals} />);
  });

  test('renders expected hospitals', () => {
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      hospitals.length
    );
  });

  test('renders expected telephone', () => {
    expect(screen.getByText(hospital.TEL as string)).toHaveProperty(
      'href',
      mockTelephone
    );
  });

  test('renders expected telephone icon', () => {
    expect(screen.getAllByLabelText(/phone/)).toBeTruthy();
  });

  test('renders expected address', () => {
    expect(screen.getByText(hospital.ADDRESS)).toHaveProperty(
      'href',
      mockAddress
    );
  });
});
