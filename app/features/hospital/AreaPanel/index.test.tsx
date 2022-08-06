import { render, screen } from '@testing-library/react';
import AreaPanel from '.';
import { AREA_LABEL, TITLE, Area } from './constants';

describe('rendering', () => {
  beforeEach(() => {
    render(<AreaPanel />);
  });

  test('renders title', () => {
    expect(screen.getByText(TITLE)).toBeDefined();
  });

  test('renders expected area', () => {
    const areaList = Object.values(Area);
    areaList.forEach((area) => {
      expect(screen.getByText(AREA_LABEL[area])).toHaveProperty(
        'href',
        `http://localhost/hospital#${area}`
      );
    });
  });
});
