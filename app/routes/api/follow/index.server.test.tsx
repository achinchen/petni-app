import type { DataFunctionArgs } from '@remix-run/node';
import getJsonFormData from 'spec/utils/getJsonFormData';
import increaseFollow from '~/models/AnimalFollow/increase/index.server';
import decreaseFollow from '~/models/AnimalFollow/decrease/index.server';
import { json } from '@remix-run/node';

import { action, METHOD_DIST } from '.';

const mock = {
  request: new Request('', { method: 'DELETE' })
};

jest.mock('~/models/AnimalFollow/increase/index.server');
jest.mock('~/models/AnimalFollow/decrease/index.server');

const USED_METHODS = Object.keys(METHOD_DIST);

const context = { request: mock.request } as DataFunctionArgs;

describe('request.formData', () => {
  test('incorrect payload: return 400', async () => {
    const formData = getJsonFormData('');
    context.request.formData = jest.fn().mockReturnValue(formData);
    context.request = { ...context.request };
    await action(context);
    expect(json).toBeCalledWith(null, 400);
  });

  test('correct payload: not return 400', async () => {
    const formData = getJsonFormData(1);
    context.request.formData = jest.fn().mockReturnValue(formData);
    context.request = { ...context.request };
    await action(context);
    expect(json).not.toBeCalledWith(null, 400);
  });
});

describe('methods', () => {
  const methods = {
    whitelist: USED_METHODS,
    outOfWhitelist: ['GET', 'POST', 'PUT']
  };

  const formData = getJsonFormData(1);
  context.request.formData = jest.fn().mockReturnValue(formData);

  methods.outOfWhitelist.forEach((method) => {
    it(`${method}: return 405`, async () => {
      context.request = { ...context.request, method };
      await action(context);
      expect(json).toBeCalledWith(null, 405);
    });
  });

  methods.whitelist.forEach((method) => {
    it(`${method}: not return 405`, async () => {
      context.request = { ...context.request, method };
      await action(context);
      expect(json).not.toBeCalledWith(null, 405);
    });
  });
});

describe('falsy result', () => {
  const id = 1;
  const formData = getJsonFormData(id);
  context.request.formData = jest.fn().mockReturnValue(formData);

  beforeAll(() => {
    (increaseFollow as jest.Mock).mockReturnValue(null);
    (decreaseFollow as jest.Mock).mockReturnValue(null);
  });

  Object.entries(METHOD_DIST).forEach(([method, callback]) => {
    beforeEach(async () => {
      context.request = { ...context.request, method };
      await action(context);
    });

    it(`${method}: call ${callback.name}`, () => {
      expect(callback).toBeCalledWith(id);
    });

    it(`${method}: return 500`, () => {
      expect(json).toBeCalledWith(null, 500);
    });
  });
});

describe('truthy result', () => {
  beforeAll(() => {
    (increaseFollow as jest.Mock).mockReturnValue({});
    (decreaseFollow as jest.Mock).mockReturnValue({});
  });

  Object.entries(METHOD_DIST).forEach(([method, callback]) => {
    beforeEach(async () => {
      context.request = { ...context.request, method };
      await action(context);
    });

    it(`${method}: call ${callback.name}`, () => {
      expect(callback).toBeCalled();
    });

    it(`${method}: return 200`, () => {
      expect(json).toBeCalledWith(null, 200);
    });
  });
});
