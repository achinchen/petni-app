import type { Animal } from 'server/entities/animal';
import type { AnimalInfo } from 'server/usecases/animal';

type StatusCode = number;
export type Payload = [StatusCode, (AnimalInfo | Animal | Animal[])?];
export type { AnimalInfo };

export class AnimalPresenter {
  invalidInput(): Payload {
    return [400];
  }

  forbidden(): Payload {
    return [403];
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

  success(payload: AnimalInfo | Animal | Animal[]): Payload {
    return [200, payload];
  }

  saveSuccess(): Payload {
    return [204];
  }
}
