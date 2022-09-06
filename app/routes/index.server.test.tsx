import getContext from 'spec/utils/getContext';
import getJsonFormData from 'spec/utils/getJsonFormData';
import getAnimalsByOptions from '~/models/Animal/getAnimalsByOptions/index.server';
import { json } from '@remix-run/node';
import { action } from './index';
import { ANIMALS } from 'spec/mock/constants/animal';

jest.mock('~/models/Animal/getAnimalsByOptions/index.server');

describe('action', () => {
  const options = { family: 'Dog' };
  beforeEach(async () => {
    (getAnimalsByOptions as jest.Mock).mockResolvedValue(ANIMALS);
    const context = getContext({
      request: {
        formData: jest.fn().mockResolvedValue(getJsonFormData(options))
      }
    });
    await action(context);
  });

  it('trigger getAnimalsByOptions', () => {
    expect(getAnimalsByOptions).toBeCalledWith(options);
  });

  it('return animals', () => {
    expect(json).toBeCalledWith({ animals: ANIMALS });
  });
});
