import type { User } from 'server/entities/user';

type StatusCode = number;
export type Payload = [StatusCode, User?];

export class UserPresenter {
  invalidInput(): Payload {
    return [400];
  }

  failed(): Payload {
    return [500];
  }

  success(payload: User): Payload {
    return [200, payload];
  }
}
