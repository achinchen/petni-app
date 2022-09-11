import { CatColor, CAT_COLOR_LABEL } from '~/constants/cats';
import OrangeCat from '~/assets/images/theme/cat/orange.png';
import CalicoCat from '~/assets/images/theme/cat/calico.png';
import WhiteCat from '~/assets/images/theme/cat/white.png';
import BlackCat from '~/assets/images/theme/cat/black.png';
import TuxedoCat from '~/assets/images/theme/cat/tuxedo.png';
import TabbyCat from '~/assets/images/theme/cat/tabby.png';
import TortoiseshellCat from '~/assets/images/theme/cat/tortoiseshell.png';

export const CATS = [
  {
    KEY: CatColor.Orange,
    LABEL: CAT_COLOR_LABEL[CatColor.Orange],
    CHARACTERISTIC: '個性膽小、貪吃、愛講話，十隻橘貓九隻胖。',
    IMAGE: OrangeCat
  },
  {
    KEY: CatColor.Calico,
    LABEL: CAT_COLOR_LABEL[CatColor.Calico],
    CHARACTERISTIC: '個性黏人、愛撒嬌，因為遺傳基因的關係，99%以上都是母貓。',
    IMAGE: CalicoCat
  },
  {
    KEY: CatColor.White,
    LABEL: CAT_COLOR_LABEL[CatColor.White],
    CHARACTERISTIC: '個性獨立。撒嬌時，會輕聲喵喵叫，或是輕拍主人討摸摸。',
    IMAGE: WhiteCat
  },
  {
    KEY: CatColor.Black,
    LABEL: CAT_COLOR_LABEL[CatColor.Black],
    CHARACTERISTIC:
      '愛撒嬌、聰明、貼心、學習力強、會認人，對牠好，牠會記在心裡。',
    IMAGE: BlackCat
  },
  {
    KEY: CatColor.Tuxedo,
    LABEL: CAT_COLOR_LABEL[CatColor.Tuxedo],
    CHARACTERISTIC: '貓界的哈士奇、個性好動，容易跟其他貓打成一片。',
    IMAGE: TuxedoCat
  },
  {
    KEY: CatColor.Tabby,
    LABEL: CAT_COLOR_LABEL[CatColor.Tabby],
    CHARACTERISTIC:
      '狩獵高手、傲嬌脾氣、警戒心強，一旦被牠認定，就會很依賴主子。',
    IMAGE: TabbyCat
  },
  {
    KEY: CatColor.Tortoiseshell,
    LABEL: CAT_COLOR_LABEL[CatColor.Tortoiseshell],
    CHARACTERISTIC: '脾氣最好、愛撒嬌、不挑食，99%以上都是母貓，親人也親貓。',
    IMAGE: TortoiseshellCat
  }
].map((info) => ({ ...info, LABEL: `${info.LABEL.replace('色', '')}貓` }));
