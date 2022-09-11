import {
  getCityFromAddressXML,
  fetchAddressXMLByGeolocation,
  getGeolocation,
  ENDPOINT
} from './utils';

const xml = `<townVillageItem>
<ctyCode>A</ctyCode>
<ctyName>臺北市</ctyName>
<townCode>A10</townCode>
<townName>中山區</townName>
<officeCode>AC</officeCode>
<officeName>中山</officeName>
<sectCode>0402</sectCode>
<sectName>中山段三小段</sectName>
<villageCode>63000040006</villageCode>
<villageName>中山里</villageName>
</townVillageItem>`;

const geolocation = {
  longitude: 200,
  latitude: 201
};

let originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('getCityFromAddressXML', () => {
  const testCases = [
    ['TEST123', ''],
    [xml, '臺北市']
  ];

  testCases.forEach(([input, output]) => {
    test(`get ${output}`, () => {
      expect(getCityFromAddressXML(input)).toBe(output);
    });
  });
});

describe('fetchAddressXMLByGeolocation', () => {
  global.fetch = jest.fn();

  test('get empty string when input is null', async () => {
    const result = await fetchAddressXMLByGeolocation(null);
    expect(result).toBe('');
  });

  test('get empty string while catching error', async () => {
    const result = await fetchAddressXMLByGeolocation(geolocation);
    expect(result).toBe('');
  });

  test('trigger fetch when input is truthy', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ text: jest.fn().mockReturnValue(xml) });
    await fetchAddressXMLByGeolocation(geolocation);
    expect(global.fetch).toBeCalledWith(
      `${ENDPOINT}/${geolocation.longitude}/${geolocation.latitude}`
    );
  });

  test('get xml string from response.text', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ text: jest.fn().mockReturnValue(xml) });
    const result = await fetchAddressXMLByGeolocation(geolocation);
    expect(result).toBe(xml);
  });
});

describe('getGeolocation', () => {
  test('throw error when navigator.geolocation not supports', async () => {
    await getGeolocation();
    expect(console.error).toBeCalled();
  });

  test('get null when navigator.geolocation not supports', async () => {
    const result = await getGeolocation();
    expect(result).toBe(null);
  });

  test('get geolocation', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: (callback: any) => callback({ coords: geolocation })
      },
      writable: true
    });
    const result = await getGeolocation();
    expect(result).toEqual(geolocation);
  });
});
