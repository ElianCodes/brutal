---
title: 💄 Adding Google Fonts to your NuxtJS site
pubDate: 05/07/2021 18:32
author: "Elian Van Cutsem"
tags:
  - Nuxt
  - Google Fonts
  - JavaScript
imgUrl: https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/opengraph_color.png
description: I found out that my fonts weren't loading properly, so I searched for an alternative.
layout: '../../layouts/BlogPost.astro'
---

# Adding Google Fonts to your NuxtJS site

Some time ago I found out that some of my fonts weren't loading in some browsers. I was using Google Fonts imported in my stylesheet using `@import`. I couldn't immediately pinpoint the issue, so I searched for an alternative way to add the fonts I needed to my Nuxt site.

## @nuxtjs/google-fonts

In my search on Google Fonts in Nuxt, I almost immediatly found out about the Nuxt module called [@nuxtjs/google-fonts](<https://www.npmjs.com/package/@nuxtjs/google-fonts>). It works like a charm and is very versatile. Here's a little guide on how you can use it.

## Installing the module

Installing a module in [Nuxt](<https://nuxtjs.org>) is the easiest thing you'll come across. It's nothing more than a simple NPM package install. Here's how you can install the google-fonts module:

```bash
yarn add -D @nuxtjs/google-fonts
```

After the install, we'll add the module to our `nuxt.config.js` file:

```js
// nuxt.config.js

{
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
}
```

That should work!

## Adding fonts

Adding fonts to your NuxtJS configuration is very easy. You just have to add them in the `nuxt.config.js` file. There's a lot of configurable parts included with the module, but to keep things easy, I'll only go into the basics here.

Every option or font is added via the `googleFonts` property in `nuxt.config.js`

To add a font to your config. Just add the name to the module in `nuxt.config.js`:

```js
// nuxt.config.js

googleFonts: {
  families: {
    // a simple name
    Roboto: true,

    // a name with spaces
    'Josefin+Sans': true,

    // specific font weights
    Lato: [100, 300],
  }
}
```

If you need a little more advanced fonts, like italic or bold, there's a specific property:

```js
// nuxt.config.js

googleFonts: {
  families: {
    // basic
    Lato: [100, 300],

    // advanced
    Raleway: {
      // weights
      wght: [100, 400],
      // italic
      ital: [100]
    },
  }
}
```

## Using fonts in CSS

After installing and configuring the module and adding the fonts. The fonts are just usable in your CSS.

Keep in mind that the font you specify in the CSS-file should ofcourse be installed first via the `nuxt.config.js` file.

```css
p {
  font-family: Rubik, sans-serif;
  font-weight: 400;
}
```

### Using with TailwindCSS

Since I'm using TailwindCSS on [my website](<https://www.elian.codes>), I also had to find out how to use the fonts in my custom Tailwind configuration. Turns out I just had to add it by using simple old skool CSS, since there's no way (yet) to add it in an `@apply` rule.

```css
p.title {
    font-family: Rubik, sans-serif;
    @apply text-lg text-center text-black font-semibold;
}
```

More info is available on the [Official Documentation of the module](<https://google-fonts.nuxtjs.org/>).
