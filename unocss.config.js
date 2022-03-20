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
  safelist: [
    '[w="100%"]',
    '[w="24"]',
    '[color="status-active"]',
    '[color="white"]',
    '[bg="status-active"]',
    '[bg="white"]'
  ],
  theme: {
    colors: {
      black: '#262626',
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
      header: '0px 1px 9px rgba(38, 38, 38, 0.05)',
      tabs: '0px -3.6px 8px rgba(38, 38, 38, 0.05)'
    }
  },
  transformers: [transformerDirective()]
});
