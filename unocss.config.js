import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import presetWebFonts from '@unocss/preset-web-fonts';
import transformerDirective from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Noto+Sans+TC:400,500,700'
      }
    })
  ],
  shortcuts: {
    'content-width': '[max-w="lg:262"]',
    'content-height':
      '[h="[calc(100vh-122px)]"] at-sm:(h-[calc(100vh-120px)])  sm:(h-[calc(100vh-148px)]) lg:(h-[calc(100vh-80px)])'
  },
  safelist: [
    '[w="100%"]',
    '[w="24"]',
    '[h="10"]',
    '[color="status-active"]',
    '[color="status-general"]',
    '[color="blue-350"]',
    '[color="white"]',
    '[color="black"]',
    '[cursor="not-allowed"]',
    '[bg="status-active"]',
    '[bg="white"]',
    '[bg="black"]',
    '[bg="transparent"]',
    '[border="rounded-xl"]',
    '[display="none"]',
    '[display="lg:flex"]',
    '[grid~="cols-4"]',
    '[text="underline"]',
    '[animate~="close"]',
    '[animate~="favorite"]'
  ],
  theme: {
    colors: {
      black: '#262626',
      blue: {
        350: '#70D4F4'
      },
      gray: {
        50: '#F8F8F8',
        450: '#878787'
      },
      status: {
        active: '#FDAAA2',
        general: '#DEDEDE'
      }
    },
    boxShadow: {
      default: '0px 2px 7px rgba(10, 10, 10, 0.07)',
      card: '-4px 6px 12px rgba(0, 0, 0, 0.25)',
      'card-light': '0px 4px 24px rgba(0, 0, 0, 0.25)',
      'card-dark': '0px 9px 11px rgba(0, 0, 0, 0.25)',
      header: '0px 1px 9px rgba(38, 38, 38, 0.05)',
      tabs: '0px -3.6px 8px rgba(38, 38, 38, 0.05)'
    },
    textShadow: {
      icon: '4px 4px 10px rgb(255, 255, 255, 0.5)'
    },
    animation: {
      keyframes: {
        close: '{100%{transform:rotate(-20deg) translate(-100vw, -125%);}}',
        favorite: '{100%{transform:rotate(15deg) translate(100vw, -125%);}}'
      },
      durations: {
        close: '0.3s',
        favorite: '0.3s'
      }
    }
  },
  transformers: [transformerDirective()]
});
