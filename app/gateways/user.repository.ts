import type { User } from '~/entities/user.entity';

type Payload = Omit<User, 'id'>;

export interface AnimalFollowRepository {
  upsert(payload: Payload): Promise<User>;
}
