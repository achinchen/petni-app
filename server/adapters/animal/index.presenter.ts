import type { AnimalInfo } from 'server/usecases/animal';

type StatusCode = number;
export type Payload = [StatusCode, AnimalInfo?];
export type { AnimalInfo };

export class AnimalPresenter {
  invalidInput(): Payload {
    return [400];
  }

  notFound(): Payload {
    return [404];
  }

  invalidMethod(): Payload {
    return [405];
  }

  failed(): Payload {
    return [500];
  }

  success(animalInfo: AnimalInfo): Payload {
    return [200, animalInfo];
  }
}
