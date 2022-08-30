import type { ActionFunction } from '@remix-run/node';
import {
  json,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData
} from '@remix-run/node';
import uploadImage from '~/utils/imgur/image/upload.server';

const uploadHandler = unstable_createFileUploadHandler({
  maxPartSize: 5_000_000,
  file: ({ filename }) => filename
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const result = await uploadImage(formData);
  if (!result) return json(null, 500);

  return json({ url: result.url }, 200);
};
