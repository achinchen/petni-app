import fetch from 'node-fetch';
import { ENDPOINT, HEADERS } from '~/utils/imgur/constants';

export async function deleteImage(deletehash: string) {
  try {
    const response = await fetch(`${ENDPOINT.IMAGE}/${deletehash}`, {
      method: 'DELETE',
      headers: HEADERS
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
