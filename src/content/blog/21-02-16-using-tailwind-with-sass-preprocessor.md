---
title: 💄 Tailwind with sass
pubDate: 02/16/2021 19:13 
author: "Elian Van Cutsem"
tags:
  - Sass
  - TailwindCSS
  - Front-end
imgUrl: https://www.devwares.com/blog/images/tailwindcss-vs-sass.png
description: Found myself struggling with tailwind config with sass preprocessor, so I figured I'd share a solution
layout: '../../layouts/BlogPost.astro'
---

# Using Sass as a tailwindCSS preprocessor

Today I fiddled around with Tailwind @apply classes. I previously posted about a darkmode in combination with @apply classes and damn it goes well together. But I discovered a problem and got stuck on it for a while. It seems that when you're using tailwind without PostCSS 8, it doesn't compile the nested classes. So I searched for a fix.

It seems that the [TailwindCSS documentation](<https://tailwindcss.com/docs/using-with-preprocessors>) has a page dedicated to this and it solves the problem in an ideal situation. But the codebase I used didn't use Postcss, so I had to find a workaround.

## Ideal solution

the ideal solution is actually very clean and simple, just require the `postcss-import` and `postcss-nesting` packages in the `postcss.config.js` file. like so:

```javascript
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'), // or require('postcss-nesting')
    require('autoprefixer'),
  ]
}
```

Very simple, very nice. But how to fix it when you're not using PostCSS (yet) ?

## Describing the setup

In the project I was working in, we're using a webpack / babel setup with minifyCSS to compile the CSS into the production environment. To change the whole system was probably going to take a while and to be honest I didn't write that code and didn't feel certain that everything was going to work.
I searched around for a bit on the [documentation of PostCSS](<https://github.com/postcss/postcss#usage>) and tought of a fix on how it possibly could work.

## How to fix

I tought of a way to just compile the `tailwind.scss` file into a compiled `tailwind.css` file with of course the compiled nested classes. To do this I basically installed the `postcss-cli` NPM package. and configured the build scripts in `package.json` to compile Tailwind

```json
// package.json
"scripts": {
    "build:tailwind": "postcss ./assets/css/tailwind.scss -o public_html/assets/css/tailwindoutput.css",
    "watch:tailwind": "postcss ./assets/css/tailwind.scss -o public_html/assets/css/tailwindoutput.css --watch"
  },
```

out of the box this does work for the basics, but still the nested classes were not working, so I now could follow [the documentation](<https://github.com/postcss/postcss#usage>) and add the plugins to the `postcss.config.js`

```javascript
//postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

Now everything finally worked fine and I could use nested classes!

```scss
/* tailwind.scss */
@tailwind base;
@tailwind components;
@tailwind utilities;

.header {
    @apply text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50;
    nav {
        @apply hover:text-green-800;
    }
}

```
