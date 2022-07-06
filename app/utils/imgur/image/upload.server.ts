import fs from 'node:fs/promises';
import path from 'node:path';
import fetch, { FormData } from 'node-fetch';
import { ENDPOINT, HEADERS, ALBUM_HASH } from '~/utils/imgur/constants';

async function getPlaceholderImage() {
  const imagePath = path.resolve(
    __dirname,
    '../../../assets/images/placeholder.jpg'
  );
  const imageBuffer = await fs.readFile(imagePath);
  return imageBuffer.toString('base64');
}

export async function uploadImage(image: string) {
  const formData = new FormData();
  formData.set('image', image, 'image.jpg');
  formData.set('album', ALBUM_HASH);

  try {
    const response = await fetch(ENDPOINT.IMAGE, {
      method: 'POST',
      headers: HEADERS
      body: formData
    });
    const {
      data: { link }
    } = (await response.json()) as ImgurImage;
    return link;
  } catch (error) {
    console.error(error);
  }
}
