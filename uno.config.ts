import { defineConfig } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import logos from '@iconify-json/logos/icons.json';
import uil from '@iconify-json/uil/icons.json';
import presetWind from '@unocss/preset-wind';
import presetTypography from '@unocss/preset-typography';

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      collections: {
        logos,
        uil,
      },
    }),
    presetTypography(),
  ],
});
