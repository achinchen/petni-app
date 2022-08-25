import { fetchAnimals, getIsAvailableAnimal } from './index';
import type { RawAnimal } from './types';
import { RAW_ANIMALS } from './mockData';

describe('updateAnimals/utils#fetchAnimals', () => {
  describe('failure happened', () => {
    let result: undefined;
    console.error = jest.fn();

    beforeEach(async () => {
      global.fetch = jest.fn().mockResolvedValue(undefined);
      result = (await fetchAnimals()) as undefined;
    });

    it('return undefined', async () => {
      expect(result).toBeUndefined();
    });

    it('calls console.error', async () => {
      expect(console.error).toBeCalled();
    });
  });

  describe('normal process', () => {
    let result: RawAnimal[];

    beforeEach(async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(RAW_ANIMALS)
      });
      result = (await fetchAnimals()) as RawAnimal[];
    });

    it('return expected availableAnimal animals', async () => {
      expect(result).toEqual(RAW_ANIMALS.filter(getIsAvailableAnimal));
    });
  });
});
