import { getTelephoneLink } from '.';

describe('getTelephoneLink', () => {
  const tel = ['02 2245 748', '02 2245 689'];
  test('works on the sole telephone', () => {
    const link = getTelephoneLink(tel[1]);
    expect(link).toBe('tel:022245689');
  });

  test('get first telephone number when input is multiple', () => {
    const link = getTelephoneLink(tel);
    expect(link).toBe('tel:022245748');
  });
});
