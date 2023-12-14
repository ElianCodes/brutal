import { defineConfig } from "@pandacss/dev";
import { brutalCardRecipe } from "./src/styles/panda-recipes/Card";
import { brutalPillRecipe } from "./src/styles/panda-recipes/Pill";
import colors from "./src/styles/panda-tokens/colors";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}', './pages/**/*.{ts,tsx,js,jsx,astro}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        ...colors
      }
    },
    extend: {
      recipes: {
        brutalCard: brutalCardRecipe,
        brutalPill: brutalPillRecipe,
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
