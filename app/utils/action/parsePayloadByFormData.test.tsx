import parsePayloadByJson from './parsePayloadByFormData';

type Payload = Parameters<typeof parsePayloadByJson>['0'];

const mock = {
  fallback: 'fallback'
};

describe('parsed result', () => {
  let payload: Payload;
  test('return fallback when formData.json is falsy', () => {
    payload = {
      formData: new FormData(),
      fallback: mock.fallback
    };

    expect(parsePayloadByJson(payload)).toBe(mock.fallback);
  });

  test('return fallback when payload is fall', () => {
    const formData = new FormData();
    formData.set('json', 'wrongjsonstring;');

    payload = {
      formData,
      fallback: mock.fallback
    };

    expect(parsePayloadByJson(payload)).toBe(mock.fallback);
  });

  test('return parsed json', () => {
    const data = { test: 1 };
    const formData = new FormData();
    formData.set('json', JSON.stringify(data));

    payload = {
      formData,
      fallback: mock.fallback
    };

    expect(parsePayloadByJson(payload)).toEqual(data);
  });
});
