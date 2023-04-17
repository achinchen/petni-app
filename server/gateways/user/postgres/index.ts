import type { User } from 'server/entities/user';
import type { UserRepository } from 'server/gateways/user';
import { db } from '~/utils/db/index.server';

type Payload = Omit<User, 'id'>;

export class UserRepositoryPostgres implements UserRepository {
  async upsert(payload: Payload): Promise<User> {
    const record = await db.user.upsert({
      create: payload,
      update: payload,
      where: { email: payload.email }
    });

    return record;
  }
}
