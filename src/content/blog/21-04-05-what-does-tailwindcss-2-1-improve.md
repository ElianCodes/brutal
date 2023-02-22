---
title: ⬆️ What does TailwindCSS 2.1 improve?
pubDate: 04/05/2021 23:27
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - CSS
  - Release
imgUrl: https://miro.medium.com/max/1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg
description: TailwindCSS 2.1 just got released, but what does it bring and improve?
layout: '../../layouts/BlogPost.astro'
---

# What does TailwindCSS 2.1 improve?

TailwindCSS 2.1 just got released. Read [the official blogpost about that here](<https://blog.tailwindcss.com/tailwindcss-2-1>). I'm excited for it since it brings the new Just-In-Time engine to the core, I wrote [a detailed blogpost about what it is and how to use it](<https://www.elian.codes/blog/21-03-16-what-is-tailwindcss-jit-and-how-to-use-it>) some time ago, which actually did very well.

## Tailwind JIT

The JIT engine got added to the core which means that you don't have to install a separate package and do some PostCSS changes. Initially the JIT engine had some issues with some CSS classes and properties, but most of them already got ironed out.

### Using JIT engine in TailwindCSS 2.1

Using the JIT engine in TailwindCSS 2.0.4 required to set the PostCSS config to include another package called `@tailwindcss/jit` as seen below:

```js
// postcss.config.js

module.exports = {
  plugins: [
    require('@tailwindcss/jit'),
    require('autoprefixer'),
  ]
}
```

Where you now only need the following line `mode: 'jit'` in your `tailwind.config.js`

```js
// tailwind.config.js

module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
      //...
    ],
  },
  darkMode: 'class',
  theme: {
    //...
  },
}
```

You can even remove the `@tailwindcss/jit` package completely from your project.

### using it with the @nuxtjs/tailwindcss module

[The TailwindCSS module for NuxtJS](<https://tailwindcss.nuxtjs.org/>) supported JIT mode since v4.0.1, but now you don't even have to set the mode.

Previously we set it by adding this to our `nuxt.config.js` file:

```js
// nuxt.confug.js

tailwindcss: {
  // other @nuxtjs/tailwindcss
  jit: true // or false
},
```

Now we don't have to include it here anymore, but instead add it as `mode: 'JIT'` in the `tailwind.config.js` file:

```js
// tailwind.config.js

module.exports = {
  mode: 'jit',
  // other TailwindCSS options
}
```

## Support for CSS filters, blending modes & isolation utilities

This is a CSS feature I haven't quite used that much, but it's nice to see TailwindCSS become a very complete and sophisticated CSS framework.

To read more about those check out [the official TailwindCSS blogpost about v2.1](<https://blog.tailwindcss.com/tailwindcss-2-1#new-filter-and-backdrop-filter-utilities>)

## Upgrading from 2.0.4 to 2.1

Upgrading is nothing more then `yarn upgrade` or `yarn add tailwindcss@latest`
