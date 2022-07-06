import fetch, { FormData } from 'node-fetch';
import { ENDPOINT, HEADERS } from '~/utils/imgur/constants';

export async function createAlbum() {
  const formData = new FormData();
  formData.set('title', 'Petni App Dev');
  formData.set(
    'description',
    'This album provides some animals could be adopted!'
  );

  const response = await fetch(ENDPOINT.ALBUM.CREATE, {
    method: 'POST',
    headers: HEADERS,
    body: formData
  });

  const result = await response.text();
  console.log(result);
}

createAlbum();
