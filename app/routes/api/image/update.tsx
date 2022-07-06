import type { ActionFunction } from '@remix-run/node';
import {
  json,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler
} from '@remix-run/node';
import uploadImage from '~/utils/imgur/image/upload.server';

const uploadHandler = unstable_composeUploadHandlers(async ({ data }) => {
  const uploadedImage = await uploadImage(data.toString());
  return uploadedImage?.link;
}, unstable_createMemoryUploadHandler());

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const url = formData.get('image');

  return json({ url });
};
