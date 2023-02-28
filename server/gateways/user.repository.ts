import type { User } from 'server/entities/user.entity';

export type Payload = Omit<User, 'id'>;

export interface UserRepository {
  upsert(payload: Payload): Promise<User>;
}
