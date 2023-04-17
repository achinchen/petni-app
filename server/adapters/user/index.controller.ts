import type { User } from 'server/entities/user';
import type { UserUseCase } from 'server/usecases/user';
import type {
  UserPresenter,
  Payload
} from 'server/adapters/user/index.presenter';

export class UserController {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userPresenter: UserPresenter
  ) {}

  async upsert(payload: User): Promise<Payload> {
    if (!payload) return this.userPresenter.invalidInput();
    try {
      const user = await this.userUseCase.upsert(payload);
      return this.userPresenter.success(user);
    } catch {
      return this.userPresenter.failed();
    }
  }
}
