import type { User } from 'server/entities/user';
import type { Payload, UserRepository } from 'server/gateways/user';

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async upsert(payload: Payload): Promise<User> {
    const user = await this.userRepository.upsert(payload);
    return user;
  }
}
