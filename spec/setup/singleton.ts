import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { db } from '~/utils/db.server';

jest.mock('~/utils/db.server', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
  db: mockDeep<PrismaClient>()
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;
