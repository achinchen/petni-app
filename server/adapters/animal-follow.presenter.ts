type StatusCode = number;
export type Payload = StatusCode;

export class AnimalFollowPresenter {
  invalidInput(): Payload {
    return 400;
  }

  invalidMethod(): Payload {
    return 405;
  }

  failed(): Payload {
    return 500;
  }

  success(): Payload {
    return 200;
  }
}
