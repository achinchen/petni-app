import type { User } from 'server/entities/user';

export type Payload = Omit<User, 'id'>;

export interface UserRepository {
  upsert(payload: Payload): Promise<User>;
}
