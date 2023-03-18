import getJsonFormData from 'spec/utils/getJsonFormData';
import getContext from 'spec/utils/getContext';
import { json } from '@remix-run/node';
import { action, METHOD_DIST } from '.';

jest.mock('server/gateways/animal-follow/index.postgres');

const USED_METHODS = Object.keys(METHOD_DIST);

const mock = {
  request: new Request('', { method: USED_METHODS[0] })
};

const context = getContext({ request: mock.request });

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
