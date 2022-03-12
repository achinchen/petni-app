import presetAttributify from '@unocss/preset-attributify';
import presetUno from '@unocss/preset-uno';
import presetMini from '@unocss/preset-mini';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetMini(), presetAttributify()]
});
