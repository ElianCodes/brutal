---
title: 💄 Use TailwindCSS with Sveltekit (2021)
pubDate: 12/05/2021 22:45
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - Svelte
  - Sveltekit
imgUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--k-z0ysHD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p3nn57r52krvpdieblta.png
description: Earlier this week, Sveltekit beta got released, ofcourse I wanted to fiddle with it.
layout: '../../layouts/BlogPost.astro'
---

# Use TailwindCSS with Sveltekit (2021)

Since my previous blogpost on using [TailwindCSS](<https://tailwindcss.com/>) (JIT) with [Sveltekit](<https://kit.svelte.dev/>), a lot has changed. That's why I've updated the article to a newer (and better) method.

## Setting up Sveltekit

Setting up a new Sveltekit project is not that hard anymore. Just run the following set of commands:

```bash
npm init svelte@next tailwind-sveltekit-app
```

You can always search [the official documentation](<https://kit.svelte.dev/docs>) for more info

### Adding an adapter

In most cases, I tend to use Sveltekit as a static site generator. To tell Sveltekit to create static pages, add the static-adapter with following command:

```bash
npm i @sveltejs/adapter-static@next
```

Also add the following to the `svelte.config.cjs`

```js
const adapter = require('@sveltejs/adapter-static');

module.exports = {
 kit: {
  adapter: adapter({
   pages: 'build',
   assets: 'build',
   fallback: null
  })
 }
};
```

This tells Sveltekit to put the output in the `build` folder and dont use a fallback (so generate a `index.html`, `404.html`, `contact.html`, ...)

more info on the adapter [here](<https://kit.svelte.dev/docs#adapters-supported-environments-static-sites>)

## Adding TailwindCSS

Previously I described some additional steps to install Tailwind, like installing autoprefixer and PostCSS. I also setup some extra NPM scripts.

Since TailwindCSS is used a lot across the web these days, it got way easier. Just use the following command:

```bash
npx svelte-add@latest tailwindcss
```

This will install TailwindCSS, PostCSS and other dependencies. It will also add the configuration and a basic `app.css` file with Tailwind imported.
