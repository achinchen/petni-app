import type { User } from 'server/entities/user.entity';
import type { Payload, UserRepository } from 'server/gateways/user.repository';

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async upsertUser(payload: Payload): Promise<User> {
    const user = await this.userRepository.upsert(payload);
    return user;
  }
}
