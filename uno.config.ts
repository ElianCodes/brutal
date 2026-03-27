import {
  defineConfig,
  presetIcons,
  presetWind3,
  presetTypography,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      collections: {
        logos: () =>
          import('@iconify-json/logos/icons.json').then((i) => i.default),
        uil: () =>
          import('@iconify-json/uil/icons.json').then((l) => l.default),
      },
    }),
    presetTypography(),
  ],
});
