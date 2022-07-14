import 'dotenv/config';

export const ALBUM_HASH = process.env.IMGUR_ALBUM_DELETE_HASH as string;

export const ENDPOINT = {
  ALBUM: {
    CREATE: 'https://api.imgur.com/3/album',
    ADD_IMAGE: `https://api.imgur.com/3/album/${ALBUM_HASH}/add`
  },
  IMAGE: 'https://api.imgur.com/3/image'
};

export const HEADERS = {
  Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
};
