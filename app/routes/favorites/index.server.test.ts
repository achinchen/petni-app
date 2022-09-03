import { json } from '@remix-run/node';
import getAnimalByIds from '~/models/animal/getAnimalsByIds/index.server';
import getContext from 'spec/utils/getContext';
import getJsonFormData from 'spec/utils/getJsonFormData';
import { ANIMALS } from 'spec/__mock__/constants/animal';
import { action } from './index';

jest.mock('~/models/animal/getAnimalsByIds/index.server');

let context = getContext({
  request: { formData: jest.fn() }
});

const ids = ANIMALS.map(({ id }) => id);

describe('action', () => {
  it('return 400 when request.formData is falsy', async () => {
    context.request.formData = jest.fn().mockResolvedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith(400);
  });

  it('not trigger getAnimalByIds when request.formData is empty array', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData([]));
    await action(context);
    expect(getAnimalByIds).not.toBeCalled();
  });

  it('return empty animals when request.formData is empty array', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData([]));
    await action(context);
    expect(json).toBeCalledWith({ animals: [] });
  });

  it('trigger getAnimalByIds when request.formData is truthy array', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(ids));
    (getAnimalByIds as jest.Mock).mockResolvedValueOnce(ANIMALS);
    await action(context);
    expect(getAnimalByIds).toBeCalledWith(ids);
  });

  it('return animals when request.formData is truthy array', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(ids));
    (getAnimalByIds as jest.Mock).mockResolvedValueOnce(ANIMALS);
    await action(context);
    expect(json).toBeCalledWith({ animals: ANIMALS });
  });
});
