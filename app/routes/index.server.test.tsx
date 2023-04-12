import getContext from 'spec/utils/getContext';
import getJsonFormData from 'spec/utils/getJsonFormData';
import { controller } from 'spec/mock/server/adapters/animal/index.controller';
import { json } from '@remix-run/node';
import { action } from './index';
import { ANIMALS } from 'spec/mock/constants/animal';

jest.mock('server/gateways/animal/postgres/index');

describe('action', () => {
  const options = { family: 'Dog' };

  describe('when result is truthy', () => {
    beforeEach(async () => {
      controller.getFiltered.mockResolvedValue([200, ANIMALS]);
      const context = getContext({
        request: {
          formData: jest.fn().mockResolvedValue(getJsonFormData(options))
        }
      });
      await action(context);
    });

    it('trigger getAnimalsByOptions', () => {
      expect(controller.getFiltered).toBeCalledWith(options);
    });

    it('return animals', () => {
      expect(json).toBeCalledWith({ animals: ANIMALS }, 200);
    });
  });
  describe('when options is empty', () => {
    beforeEach(async () => {
      controller.getFiltered.mockResolvedValue([400]);
      const context = getContext({
        request: {
          formData: jest.fn().mockResolvedValue(getJsonFormData(options))
        }
      });
      await action(context);
    });

    it('trigger getAnimalsByOptions', () => {
      expect(controller.getFiltered).toBeCalledWith(options);
    });

    it('return empty array', () => {
      expect(json).toBeCalledWith({ animals: [] }, 400);
    });
  });
});
