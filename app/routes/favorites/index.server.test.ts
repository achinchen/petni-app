import { json } from '@remix-run/node';
import { controller } from 'spec/mock/server/adapters/animal/index.controller';
import getContext from 'spec/utils/getContext';
import getJsonFormData from 'spec/utils/getJsonFormData';
import { ANIMALS } from 'spec/mock/constants/animal';
import { action } from './index';

jest.mock('server/gateways/animal/postgres/index');

let context = getContext({
  request: { formData: jest.fn() }
});

const ids = ANIMALS.map(({ id }) => id);

describe('action', () => {
  beforeEach(() => {
    context.request.formData = jest
      .fn()
      .mockResolvedValue(getJsonFormData(ids));
  });

  it('trigger controller.getAnimalByIds', async () => {
    controller.getFavorites.mockResolvedValueOnce([200, ANIMALS]);
    await action(context);
    expect(controller.getFavorites).toBeCalledWith(ids);
  });

  it('return animals when retrieved animals is truthy array', async () => {
    controller.getFavorites.mockResolvedValueOnce([200, ANIMALS]);
    await action(context);
    expect(json).toBeCalledWith({ animals: ANIMALS });
  });

  it('return empty array when retrieved animals is falsy', async () => {
    controller.getFavorites.mockResolvedValueOnce([404]);
    await action(context);
    expect(json).toBeCalledWith({ animals: [] }, 404);
  });
});
