import { Family } from 'server/entities/animal';
import { DogColor } from '~/constants/dogs';
import { CatColor } from '~/constants/cats';

export const FILTERED_ANIMAL_COUNT = 20;

export const SEARCH_KEY_DIST = {
  [Family.Dog]: {
    [DogColor.Brown]: ['棕', '咖啡'],
    [DogColor.Gold]: ['黃'],
    [DogColor.White]: ['白', '米'],
    [DogColor.Black]: ['黑'],
    [DogColor.TwoColor]: ['黑黃'],
    [DogColor.Tabby]: ['虎斑'],
    [DogColor.Gray]: ['灰']
  },
  [Family.Cat]: {
    [CatColor.Orange]: ['橘', '黃'],
    [CatColor.Calico]: ['花'],
    [CatColor.White]: ['白'],
    [CatColor.Black]: ['黑'],
    [CatColor.Tuxedo]: ['黑白'],
    [CatColor.Tabby]: ['虎斑'],
    [CatColor.Tortoiseshell]: ['玳瑁']
  }
};