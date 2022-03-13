import presetAttributify from '@unocss/preset-attributify';
import presetUno from '@unocss/preset-uno';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  extendTheme: {
    // #F8F8F8
  }
});
