import { ENDPOINT, HEADERS } from '~/utils/imgur/constants';

export const TITLE = 'Petni App Dev';
export const DESCRIPTION = 'This album provides some animals could be adopted!';

export async function createAlbum() {
  const formData = new FormData();
  formData.set('title', TITLE);
  formData.set('description', DESCRIPTION);

  const response = await fetch(ENDPOINT.ALBUM.CREATE, {
    method: 'POST',
    headers: HEADERS,
    body: formData
  });

  const result = await response.text();
  console.log(result);
}

createAlbum();
