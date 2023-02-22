---
title: ✨ What is TailwindCSS JIT and how to use it.
pubDate: 03/16/2021 17:10
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - JIT
  - CSS
imgUrl: https://miro.medium.com/max/1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg
description: TailwindCSS just released a new feature @tailwindcss/jit. In this post I explain what it is and how to use it.
layout: '../../layouts/BlogPost.astro'
---

# What is TailwindCSS JIT and how to use it

Yesterday the [TailwindCSS blog](<https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css>) published an article about a new feature they released called [TailwindCSS JIT](<https://www.npmjs.com/package/@tailwindcss/jit>) (which stands for Just-In-Time). For now it's still an experimental feature, but it has worked great for me.

## What is tailwindcss/jit

tailwindcss/jit is a just-in-time compiler for TailwindCSS. Yesterday [Adam Wathan](<https://twitter.com/adamwathan>)(creator of TailwindCSS) posted [a video on Youtube](<https://www.youtube.com/watch?v=3O_3X7InOw8>) explaining the basics of @tailwindcss/jit and how to use it.

Before this package got release Tailwind would add all classes to a compiled CSS file or you had to specify and disable exactly what variants and classes you would be using. If you enabled everything, the file would increase to enormous sizes. Which made development and compiling very slow. They added purging to decrease the file size, but the slow compiling and lots of configuring were still remaining problems. For example: if you enabled dark mode classes, the CSS file in development would almost double, since it added light and dark mode variant of all classes. in JIT, all variants are enabled by default, but only those you use are added to the compiled CSS. Thanks to this, we see an enormous improvement in compiling speed and browser performance in development.

## How to use it

@tailwindcss/jit is actually very easy to install and setup. It even makes the whole configuration easier.

### Installing it

Installing @tailwindcss/jit is actually very easy.

```bash
yarn add -D @tailwindcss/jit
```

### Configuring PostCSS to use JIT instead of TailwindCSS

Now we can tell PostCSS to use JIT instead of 'normal' TailwindCSS by changing `require('tailwindcss')` to `require('@tailwindcss/jit')`

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/jit'),
    require('autoprefixer')
  ]
}
```

### Using it

@tailwindcss/jit doesn't require a whole configuration for variants colors since it won't add the utility-classes that aren't used anyway to the compiled CSS file and only compiles the used classes. Below is a configuration before the use of @tailwindcss/jit

```js
// tailwind.config.js
module.exports = {
  variants: {
    extend: {
      backgroundColor: ['active'],
      // ...
      borderColor: ['focus-visible', 'first'],
      // ...
      textColor: ['visited'],
    }
  },
}
```

You had to specify every variant you were using because if it enabled every class, your compiled CSS file would be over 10MB in CSS. Which didn't work great for slower internet speeds. They solved part of the problem by using PurgeCSS to only include used CSS in the compiled CSS file, which already shrank the compiled CSS a significant lot (if everything was configured correctly). But now everything got so much easier. Now we can remove the whole `variants` part and only use our configuration to specify our own utilities or theme.

Below is an example of a full configuration with @tailwindcss/jit:

```js
// tailwind.config.js
module.exports = {
  purge: {
    enabled: true,
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}'
    ],
  },
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
```

Depending on your specific situation you might need to change a few other things.

[I also wrote a blogpost on how to use JIT with Nuxtjs](<https://www.elian.codes/blog/21-03-18-add-tailwind-jit-to-your-nuxtjs-site/>).

In my specific situation this is how @tailwindcss/jit affected my development process:

Work project:

|package|compiling time|compiled filesize|
|:--|:-:|:-:|
|TailwindCSS|25328ms|918KiB|
|@tailwindcss/jit|10295ms|84KiB|

on this very website:

|package|run|side|compiling time|
|:--|:-:|:-:|:-:|
|TailwindCSS|1st|client|28.73s|
|TailwindCSS|1st|server|24.58s|
|TailwindCSS|2nd|client|18.31s|
|TailwindCSS|2nd|server|15.60s|
|@tailwindcss/jit|1st|client|10.07s|
|@tailwindcss/jit|1st|server|9.19s|
|@tailwindcss/jit|2nd|client|4.98s|
|@tailwindcss/jit|2nd|server|4.22s|

this was measured on 1st and 2nd run with viewer option disabled
