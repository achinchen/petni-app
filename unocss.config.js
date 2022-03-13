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
        sans: 'Noto+Sans+TC:400,700'
      }
    })
  ],
  theme: {
    colors: {
      black: '#262626',
      gray: {
        50: '#F8F8F8'
      }
    },
    breakpoints: {
      xs: '360px',
      sm: '768px'
    }
  },
  transformers: [transformerDirective()]
});
