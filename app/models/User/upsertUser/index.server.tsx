import type { User } from '@prisma/client';
import { db } from '~/utils/db/index.server';

type Payload = Omit<User, 'id'>;

export default async (payload: Payload): Promise<User> => {
  const record = await db.user.upsert({
    create: payload,
    update: payload,
    where: { email: payload.email }
  });

  return record;
};
