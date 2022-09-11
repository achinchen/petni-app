import { DogColor, DOG_COLOR_LABEL } from '~/constants/dogs';
import RustDog from '~/assets/images/theme/dog/rust.png';
import GoldDog from '~/assets/images/theme/dog/gold.png';
import WhiteDog from '~/assets/images/theme/dog/white.png';
import BlackDog from '~/assets/images/theme/dog/black.png';
import TwoColorDog from '~/assets/images/theme/dog/two-color.png';
import TabbyDog from '~/assets/images/theme/dog/tabby.png';
import GrayDog from '~/assets/images/theme/dog/gray.png';

export const DOGS = [
  {
    KEY: DogColor.Brown,
    LABEL: DOG_COLOR_LABEL[DogColor.Brown],
    CHARACTERISTIC: '個性獨立、外向、喜歡與人互動。',
    IMAGE: RustDog
  },
  {
    KEY: DogColor.Gold,
    LABEL: DOG_COLOR_LABEL[DogColor.Gold],
    CHARACTERISTIC: '溫和友善、忠誠護主、乖巧聽話、不太主動攻擊人。',
    IMAGE: GoldDog
  },
  {
    KEY: DogColor.White,
    LABEL: DOG_COLOR_LABEL[DogColor.White],
    CHARACTERISTIC: '憂雅氣質、乖巧安靜。白毛容易髒，需要花心思照顧。',
    IMAGE: WhiteDog
  },
  {
    KEY: DogColor.Black,
    LABEL: DOG_COLOR_LABEL[DogColor.Black],
    CHARACTERISTIC: '個性穩重、敏捷聰明、學習力強。',
    IMAGE: BlackDog
  },
  {
    KEY: DogColor.TwoColor,
    LABEL: DOG_COLOR_LABEL[DogColor.TwoColor],
    CHARACTERISTIC: '活潑好動、憨厚、愛玩、天生少根筋、無厘頭，親人也親狗。',
    IMAGE: TwoColorDog
  },
  {
    KEY: DogColor.Tabby,
    LABEL: DOG_COLOR_LABEL[DogColor.Tabby],
    CHARACTERISTIC: ' 身上有著老虎斑點，面惡心善、忠心勇敢、聰明機警。',
    IMAGE: TabbyDog
  },
  {
    KEY: DogColor.Gray,
    LABEL: DOG_COLOR_LABEL[DogColor.Gray],
    CHARACTERISTIC: '善良優雅、好奇心重、喜歡嘗試新鮮事物、樂於取悅主人。',
    IMAGE: GrayDog
  }
].map((info) => ({ ...info, LABEL: `${info.LABEL}狗` }));
