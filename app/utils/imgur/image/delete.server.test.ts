import { ENDPOINT, HEADERS } from '~/utils/imgur/constants';
import deleteImage from './delete.server';

jest.spyOn(global, 'fetch');

const mock = {
  fetch: global.fetch as jest.Mock
};

describe('delete', () => {
  const deletehash = 'test';
  it('trigger fetch', async () => {
    await deleteImage(deletehash);
    expect(mock.fetch).toBeCalledWith(`${ENDPOINT.IMAGE}/${deletehash}`, {
      method: 'DELETE',
      headers: HEADERS
    });
  });

  it('trigger console.log', async () => {
    const response = { data: { link: 'https://example.com' } };
    mock.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(response)
    });

    await deleteImage(deletehash);
    expect(console.log).toBeCalledWith(response);
  });

  it('trigger console.error when error occurs', async () => {
    mock.fetch.mockResolvedValue({
      json: {}
    });

    await deleteImage(deletehash);
    expect(console.error).toBeCalled();
  });
});
