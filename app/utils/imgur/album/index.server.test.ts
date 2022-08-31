import { ENDPOINT, HEADERS } from '~/utils/imgur/constants';
import { createAlbum, DESCRIPTION, TITLE } from './index.server';

jest.spyOn(global, 'fetch');

const mock = {
  fetch: global.fetch as jest.Mock
};

describe('create album', () => {
  const deletehash = 'test';
  it('trigger fetch', async () => {
    const formData = new FormData();
    formData.set('title', TITLE);
    formData.set('description', DESCRIPTION);

    await createAlbum();
    expect(mock.fetch).toBeCalledWith(ENDPOINT.ALBUM.CREATE, {
      method: 'POST',
      headers: HEADERS,
      body: formData
    });
  });

  it('trigger console.log', async () => {
    const response = { data: { link: 'https://example.com' } };
    mock.fetch.mockResolvedValue({
      text: jest.fn().mockReturnValue(response)
    });

    await createAlbum();
    expect(console.log).toBeCalledWith(response);
  });
});
