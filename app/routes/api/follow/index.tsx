import type { ActionFunction } from '@remix-run/node';
import type { AnimalFollow } from 'server/entities/animal-follow';
import { json } from '@remix-run/node';
import { AnimalFollowUseCase } from 'server/usecases/animal-follow';
import { AnimalFollowRepositoryPostgres } from 'server/gateways/animal-follow/postgres';
import { AnimalFollowController } from 'server/adapters/animal-follow/index.controller';
import { AnimalFollowPresenter } from 'server/adapters/animal-follow/index.presenter';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';

const animalFollowRepository = new AnimalFollowRepositoryPostgres();
const animalFollowUseCase = new AnimalFollowUseCase(animalFollowRepository);
const animalFollowPresenter = new AnimalFollowPresenter();
const animalFollowController = new AnimalFollowController(
  animalFollowUseCase,
  animalFollowPresenter
);

export const METHOD_DIST = {
  DELETE: animalFollowController.unfollow,
  PATCH: animalFollowController.follow
};

export const action: ActionFunction = async ({ request }) => {
  const { method } = request;
  const formData = await request.formData();
  const id: AnimalFollow['animalId'] = parsePayloadByJson({
    formData,
    fallback: '0'
  });

  const action = METHOD_DIST[method as keyof typeof METHOD_DIST];
  if (!action) return json(null, 405);
  const statusCode = await action.call(animalFollowController, id);
  return json(null, statusCode);
};
