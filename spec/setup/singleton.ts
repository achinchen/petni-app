import type { PrismaClient } from '@prisma/client';
import type { DeepMockProxy } from 'jest-mock-extended';
import { mockDeep, mockReset } from 'jest-mock-extended';

import { db } from '~/utils/db/index.server';

jest.mock('~/utils/db/index.server', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
  db: mockDeep<PrismaClient>()
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;
