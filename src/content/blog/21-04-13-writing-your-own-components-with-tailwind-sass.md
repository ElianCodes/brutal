---
title: 💄 Writing your own style components with TailwindCSS and Sass
pubDate: 04/13/2021 17:28
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - Sass
  - Nuxt
imgUrl: https://www.devwares.com/blog/images/tailwindcss-vs-sass.png
description: having TailwindCSS classes everywhere in my markup annoys me. That's why I tought of a better way of styling with TailwindCSS
layout: '../../layouts/BlogPost.astro'
---

# Writing your own style components with TailwindCSS and Sass

Out of the box, [TailwindCSS](<https://tailwindcss.com>) can be very cluttered. It's intended to place all of your classes and styling in your markup. I understand that this can be very easy in some cases, but in a big project with several developers and a styleguide, it can become quite unmaintainable. Luckilly TailwindCSS has a very good way to write reusable components. Using the `@apply` classes can be one way, but combining [Sass pre-processor](<https://sass-lang.com>) and Tailwind `@apply` makes TailwindCSS work like a dream!

## Set up TailwindCSS

So TailwindCSS (without the use of a CDN) works really easy. You install the NPM package, PostCSS and autoprefixer, make a file called `tailwind.css` and you're pretty much done. Using it with Sass is a little more complicated, but still easy enough.

Firstly install TailwindCSS as normal

```bash
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

You can run `npx tailwindcss init` to set up a basic `tailwind.config.js` file with following content:

```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Since we're using PostCSS to process our TailwindCSS Sass file, we also have to set up a `postcss.config.js` file with following content:

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

## Adding TailwindCSS as Sass

now we have a basic project with TailwindCSS, still we would like to use it with sass, so let's make a file called `tailwind.scss` in your styles directory and put the following lines in there so PostCSS knows it's Tailwind:

```scss
// tailwind.scss
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Now let's set up PostCSS to process the Sass file to an outputted CSS file

## Adding PostCSS Sass support

First of all, PostCSS isn't limited. You can install a lot of plugins that might solve your specific problem with your css files; so give it a search when you want to create your own CSS workflow.

To add Sass support to your project might differ a lot from another project. Some projects use [webpack](<https://webpack.js.org/>) where you can use `sass-loader` to process your Sass files, others might use [Vite](<https://vitejs.dev/>) where you simply have to install the Sass NPM package. So google a bit around and you'll find a way to preprocess the Sass.

To use nesting in Sass / TailwindCSS (which you really want, believe me...) we just have to install a specific PostCSS package called `postcss-nested`.

Just run `yarn add -D postcss-nested` and add the plugin to your `postcss.config.js` file:

```js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

## Write your components

Now we have a Sass file that can be processed, we can also import other files. For instance, what if we decide to use one button style everywhere, we can just add it to the `tailwind.scss` file:

```scss
// tailwind.scss
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

button {
  @apply rounded-full bg-gray-900 text-center py-2 px-4 text-white
}
```

Very easy right, we can also take this a step further by importing custom component files by using the `postcss-easy-import` plugin for PostCSS.

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-easy-import': { prefix: '_', extensions: ['.css', '.scss'] },
  }
}
```

now PostCSS will know that we want to import another css or scss file without us telling it what extensions and prefixes to import.

Let's make a file called `/components/_button.scss` in the styles folder:

```scss
// tailwind.scss

/* Tailwind base */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* Custom Components */
@import "./components/button";
```

```scss
// ./components/_button.scss

button {
  @apply rounded-full bg-gray-900 text-center py-2 px-4 text-white
}
```

Really clean right!

Go crazy with it. Make different component files for pages, components and everything else you can think of. The developer who has to read your code will thank you!
