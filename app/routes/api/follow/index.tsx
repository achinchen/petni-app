import type { ActionFunction } from '@remix-run/node';
import type { AnimalId } from '~/models/animal/getAnimalsByIds/index.server';
import { json } from '@remix-run/node';
import increaseFollow from '~/models/animalFollow/increaseFollow/index.server';
import decreaseFollow from '~/models/animalFollow/decreaseFollow/index.server';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';

const METHOD_DIST = {
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
  return json({ animals });
};
