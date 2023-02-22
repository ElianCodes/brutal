---
title: Blogpost 3
description: UnoCSS is an atomic-CSS engine, designed with flexibility and performance in mind, I wanted to give it a try. Let's take a look at implementing it in Astro and see how it works.
pubDate: 2023-02-14 23:49
author: Elian Van Cutsem
tags: 
  - CSS
  - Astro
  - UnoCSS
imgUrl: https://repository-images.githubusercontent.com/412152628/30d80147-4535-4ff1-9837-b9015eecbb07
layout: ../../layouts/BlogPost.astro
---

# Implementing UnoCSS in Astro

[UnoCSS](<https://github.com/unocss/unocss>) is a CSS engine, built by [Anthony Fu](<https://antfu.me>). It's rather a CSS engine than a CSS library. It's crazy fast, supports presets and is designed for flexibility and performance. I wanted to give this one a try, since I met Anthony last week at [JSWorld](<https://www.jsworldconference.com>), and I'm totally blast away by his work.

## Astro Integration

It's quite easy, since UnoCSS has a [third party integration for Astro](<https://github.com/unocss/unocss/tree/main/packages/astro>) (thus you can't install it through `astro add` CLI). Let's take a look at how to implement it.

Let's first install the integration for Astro and the reset package.

```bash
pnpm add @unocss/astro @unocss/reset
```

Now, since we didn't use `astro add` to install the integration, we need to add it to our `astro.config.mjs` file manually.

Also, I noticed that the integration doesn't work wit Node < v18, so be sure you're on Node v18!

```js
import { defineConfig } from 'astro/config';
import unocss from "@unocss/astro";

export default defineConfig({
  integrations: [
    /* ... */
    unocss(),
  ],
});
```

Now you should have a clean and resetted website. Let's add an integration to start writing utility-first CSS.

## Presets and Configuration

```bash
pnpm add @unocss/preset-wind
```

```js
import { defineConfig } from 'astro/config';
import unocss from '@unocss/astro';
import presetWind from '@unocss/preset-wind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      presets: [
        presetWind(),
        /* more presets */
      ],
      safelist: [
        /* this you can use to exclude utilities from purge */
      ],
    })
  ]
});
```

Now you can use all the classes / utilities from the [WindCSS](https://windicss.org) library, in UnoCSS!

Of course, there are many many more presets available, you can check them out [here](<https://github.com/unocss/unocss#presets>).

Another awesome usecase and one of the drivers for me to use it, is the integration from UnoCSS with pure CSS icons! You can find [that part of the repo here](<https://github.com/unocss/unocss/tree/main/packages/preset-icons/>), but it's quite easy and straightforward.

Tag [me on Twitter](<https://www.twitter.com/eliancodes>) if you have any questions or feedback!
