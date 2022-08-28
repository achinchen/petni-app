// import type { ActionFunction } from '@remix-run/node';
// import type { AnimalId } from '~/models/animal/type';
// import { json } from '@remix-run/node';
// import increaseFollow from '';
// import decreaseFollow from '~/models/animalFollow/decreaseFollow/index.server';
// import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';

const mock = {
  increaseFollow: jest.fn(),
  decreaseFollow: jest.fn()
};

jest.mock('~/models/animalFollow/increaseFollow/index.server', () => {
  return mock.increaseFollow;
});

jest.mock('~/models/animalFollow/decreaseFollow/index.server', () => {
  return mock.decreaseFollow;
});

// const METHOD_DIST = {
//   DELETE: decreaseFollow,
//   PATCH: increaseFollow
// };

// export const action: ActionFunction = async ({ request }) => {
//   const { method } = request;
//   const formData = await request.formData();

//   const id: AnimalId = Number(parsePayloadByJson({ formData, fallback: 0 }));
//   if (!id) return;

//   const action = METHOD_DIST[method as keyof typeof METHOD_DIST];
//   if (!action) return;

//   const animals = await action(id);
//   if (!animals) return json(null, 500);

//   return json({ animals });
// };
