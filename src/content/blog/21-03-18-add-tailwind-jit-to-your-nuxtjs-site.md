---
title: ⚡ Add TailwindCSS JIT to your Nuxtjs site
pubDate: 03/18/2021 18:27
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - Nuxt
  - JIT
imgUrl: https://miro.medium.com/max/1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg
description: TailwindCSS just came out with a new feature called @tailwindcss/jit. here's how you can add it to your Nuxt site.
layout: '../../layouts/BlogPost.astro'
---

# Add TailwindCSS JIT to your Nuxtjs site

[TailwindCSS](<https://tailwindcss.com>) just released a feature called Just-In-Time. [The TailwindCSS blog](<https://tailwindcss.com/blog/>) published an article about it [here](<https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css>). It's available (for now, since it will be added in TailwindCSS v3.0) on [NPM](<https://www.npmjs.com/package/@tailwindcss/jit>). I dedicated [another blogpost](<https://www.elian.codes/blog/21-03-16-what-is-tailwindcss-jit-and-how-to-use-it/>) to this, so I wont go deeper into that topic here. But what is interesting here, is that it changes the whole way how you use TailwindCSS with [Nuxtjs](<https://nuxtjs.org>)

## Upgrading nuxtjs/tailwindcss

adding TailwindCSS became really easy since `nuxtjs/tailwindcss` v4.0.0. Before ([like explained on the Tailwind Install Docs](<https://tailwindcss.com/docs/guides/nuxtjs>)), you needed to install a great deal of packages to be able to use TailwindCSS with Nuxt. Also they were outdated versions of packages. Now it's just the `@nuxtjs/tailwindcss` module and [PostCSS](<https://postcss.org/>). So first install those.

```bash
yarn add -D @nuxtjs/tailwindcss postcss@latest
```

Then add the module to your `buildModules` in `nuxt.config.js`

```js
// nuxt.config.js
export default {
  buildModules: [
    '@nuxtjs/tailwindcss'
  ]
}
```

The modules requires some additional configurations if you're not using the default location for the `~/assets/css/tailwind.css` or the `./tailwind.config.js` files. You can read more about options [on the nuxtjs/tailwindcss module website](<https://tailwindcss.nuxtjs.org/options>).

Now TailwindCSS should work if you created the files!

## Adding @tailwindcss/jit

Now adding jit to TailwindCSS is just as easy as configuring it in your `nuxt.config.js` file.

```js
// nuxt.config.js
export default {
    tailwindcss: {
        jit: true
    }
}
```

that's litterally it...

You can add a lot of options here, if you'd like, you can even include your whole configuration (which you normally put in `tailwind.config.js`) in here. You can read more about all available options on [the nuxtjs/tailwindcss module website](<https://tailwindcss.nuxtjs.org/>)

## Using with Sass preprocessor

If you've read more than 2 articles on this blog, you'll know that I'm a fan of using TailwindCSS `@apply` classes with [Sass](<https://sass-lang.com>). It's easier to maintain, clearly readable and just cooler!

But to take advantage of this together with Nuxtjs, it requires some additional configuration. But don't worry, I'll guide you trough it!

If you're using `@nuxtjs/tailwindcss` v^4.0.0 or followed my guide above, you probably have installed `postcss@latest`. If you haven't, do so, because you'll need it.

Then we just need to install some additional packages to tell PostCSS what we're expecting of it.

```bash
yarn add -D postcss-easy-import sass
```

Now we have all packages ready to go, we'll just need to configure our `nuxt.config.js` file so it uses them.

```js
// nuxt.config.js
export default {
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
    jit: true
  },
  build: {
    postcss: {
      plugins: {
        'postcss-easy-import': { prefix: '_', extensions: ['.css', '.scss'] },
        'postcss-nested': {},
      },
    }
  },
}
```

You can also disable the `viewer` option in the config for faster build times!

That should be it! I hope you received some value out of it!
