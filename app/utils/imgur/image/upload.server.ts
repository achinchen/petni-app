import { ENDPOINT, HEADERS, ALBUM_HASH } from '~/utils/imgur/constants';

type ImgurImage = {
  data: {
    id: string;
    deletehash: string;
    link: string;
  };
};

export default async function uploadImage(formData: FormData) {
  formData.set('album', ALBUM_HASH);

  try {
    const response = await fetch(ENDPOINT.IMAGE, {
      method: 'POST',
      headers: HEADERS,
      body: formData
    });
    const {
      data: { link: url }
    } = (await response.json()) as ImgurImage;
    return { url };
  } catch (error) {
    console.error(error);
  }
}
