import type { ActionFunction } from '@remix-run/node';
import type { AnimalId } from '~/models/animal/type';
import { json } from '@remix-run/node';
import increaseFollow from '~/models/AnimalFollow/increase/index.server';
import decreaseFollow from '~/models/AnimalFollow/decrease/index.server';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';

export const METHOD_DIST = {
  DELETE: decreaseFollow,
  PATCH: increaseFollow
};

export const action: ActionFunction = async ({ request }) => {
  const { method } = request;
  const formData = await request.formData();

  const id: AnimalId = Number(parsePayloadByJson({ formData, fallback: 0 }));
  if (!id) return;

  const action = METHOD_DIST[method as keyof typeof METHOD_DIST];
  if (!action) return;

  const animals = await action(id);
  if (!animals) return json(null, 500);

  return json(null, 200);
};
