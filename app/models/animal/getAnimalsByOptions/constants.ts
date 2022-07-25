import { Family } from '@prisma/client';
import { DogColor } from '~/constants/dogs';
import { CatColor } from '~/constants/cats';

export const ANIMAL_COUNT = 6;

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

export const CITIES = [
  '臺東縣',
  '花蓮縣',
  '宜蘭縣',
  '新北市',
  '臺北市',
  '基隆市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '臺中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '高雄市',
  '屏東縣'
];
export const DEFAULT_CITY_RANGE = {
  START: 4,
  END: 6
};

export const OUTLYING_ISLAND_CITIES = ['澎湖縣', '金門縣', '連江縣'];
