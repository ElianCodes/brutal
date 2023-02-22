import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import unocss from '@unocss/astro';
import presetIcons from '@unocss/preset-icons';
import logos from '@iconify-json/logos/icons.json';
import uil from '@iconify-json/uil/icons.json';
import presetWind from '@unocss/preset-wind';
import presetTypography from '@unocss/preset-typography';

const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'pink',
  'purple',
  'orange',
  'teal',
  'cyan',
  'lime',
  'emerald',
  'fuchsia',
  'violet',
  'rose',
  'sky',
  'amber',
];

const getSafeList = () => {
  const list = [];
  colors.forEach((color) => {
    list.push(`hover:bg-${color}`);
    list.push(`bg-${color}`);
    list.push(`prose-${color}`);
  });
  return list;
};

export default defineConfig({
  site: 'https://brutal.elian.codes/',
  trailingSlash: 'ignore',
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    sitemap(),
    unocss({
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
      safelist: getSafeList(),
    }),
  ],
});
