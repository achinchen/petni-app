import { ENDPOINT, HEADERS, ALBUM_HASH } from '~/utils/imgur/constants';
import uploadImage from './upload.server';

jest.spyOn(global, 'fetch');

const mock = {
  fetch: global.fetch as jest.Mock
};

describe('upload', () => {
  const formData = new FormData();

  it('trigger fetch', async () => {
    await uploadImage(formData);
    formData.set('album', ALBUM_HASH);

    expect(mock.fetch).toBeCalledWith(ENDPOINT.IMAGE, {
      method: 'POST',
      headers: HEADERS,
      body: formData
    });
  });

  it('return url', async () => {
    const image = { data: { link: 'https://example.com' } };
    mock.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(image)
    });
    const result = await uploadImage(formData);
    expect(result).toEqual({ url: image.data.link });
  });

  it('trigger console.error when error occurs', async () => {
    mock.fetch.mockResolvedValueOnce({
      json: {}
    });
    await uploadImage(formData);
    expect(console.error).toBeCalled();
  });
});
