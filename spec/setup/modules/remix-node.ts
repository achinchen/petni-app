import type { DeepMockProxy } from 'jest-mock-extended';
import { mockReset } from 'jest-mock-extended';
import { installGlobals } from '@remix-run/node';

jest.mock('@remix-run/node', () => ({
  __esModule: true,
  installGlobals: jest.fn(),
  redirect: jest.fn(),
  json: jest.fn()
}));

beforeEach(() => {
  mockReset(RemixNodeMock);
});

export const RemixNodeMock = installGlobals as unknown as DeepMockProxy<
  typeof installGlobals
>;
