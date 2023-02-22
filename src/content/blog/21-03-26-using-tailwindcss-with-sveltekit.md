---
title: 💄 Sveltekit with TailwindCSS
pubDate: 03/26/2021 18:27
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - svelte
  - JIT
imgUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--k-z0ysHD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p3nn57r52krvpdieblta.png
description: Earlier this week, Sveltekit beta got released, ofcourse I wanted to fiddle with it.
layout: '../../layouts/BlogPost.astro'
---

# Using TailwindCSS with Sveltekit

*This post is very outdated, check [the new post](<https://www.elian.codes/blog/21-12-05-use-tailwindcss-with-sveltekit-2021/>) for an updated version*

Earlier this week, Sveltekit beta got released (read all about it [here](<https://svelte.dev/blog/sveltekit-beta>)). Since it's so new, I wanted to try out some stuff, including using it with [TailwindCSS](<https://tailwindcss.com>). That seemed a little bit more complex than I initially thought.

## What is Sveltekit

Sveltekit is very comparable to [Nuxt](<https://nuxtjs.org>) and [Next](<https://nextjs.org>), but with [Svelte](<https://svelte.dev>). It provides server-side rendering, routing and code-splitting. Also, Sveltekit uses [Vite](<https://vitejs.dev>) right out of the box, which makes it incredibly fast.

## Bootstrap Sveltekit

To start a new project is actually very easy with Sveltekit. Just run the following commands in an empty directory:

```bash
npm init svelte@next
```

Then, install your dependencies using `yarn` or `npm install`. For the rest of this post I'll use yarn, but use NPM if you like.

To start up the project using Vite, run the `dev` command

```bash
yarn dev
```

Now your newly bootstrapped Svelte app should be running on `https://localhost:3000`

## Install TailwindCSS

Since Sveltekit is so new, we currently have to use a little workaround to use TailwindCSS, but I imagine that they'll introduce PostCSS support in the 1.0 release of Sveltekit. We'll use the `postcss-cli` package to trigger a build of our PostCSS configuration before we run a build command, which works fine, but you'll need to rebuild Tailwind every time into a static CSS file which can take up some time.

So, let's install TailwindCSS and PostCSS

```bash
yarn add -D tailwindcss postcss autoprefixer postcss-cli
```

Following that, we can create a TailwindCSS configuration file using:

```bash
npx tailwindcss init
```

Now create a `tailwind.css` file in `src/assets/css/` and add the following content:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

This will tell PostCSS what utilities you're using.

## Configure PostCSS

Now that we have installed TailwindCSS, we just need to configure Svelte to actually use it. To do that, create a file called `postcss.config.cjs` in the root of your project and tell it to use `autoprefixer` and `tailwindcss` to process CSS files:

```js
module.exports = {
    plugins: [
      require('autoprefixer'),
      require('tailwindcss')
    ]
}
```

Now we can add a new script to our `package.json`, so it builds TailwindCSS before the main build:

```json
"scripts": {
    "dev": "svelte-kit dev",
    "build": "yarn build:tailwind && svelte-kit build",
    "build:tailwind": "postcss ./src/assets/css/tailwind.css -o static/assets/css/tailwindoutput.css",
    "start": "svelte-kit start",
},
```

Here we configure a script that will run when `yarn build:tailwind` or `yarn build` is triggered. The script will compile tailwind from the local `/src/assets/css/tailwind.css` and add it to the static folder (`/static/assets/css/tailwindoutput.css`) where we'll be able to use it.

Now we can include the file globally by adding the output CSS file as a stylesheet in the `/src/app.html` file.

```html
<html>
 <head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="../assets/css/tailwindoutput.css" type="text/css">
  %svelte.head%
 </head>
 <body>
  <div id="svelte">%svelte.body%</div>
 </body>
</html>
```

Now when you've ran `yarn build:tailwind` once, TailwindCSS should work in your markup!

Don't forget to include the generated TailwindCSS output file to your `.gitignore` if you're using git.

### Add @tailwindcss/jit

To save some more time in the compilation and configuration of TailwindCSS, we can use the `@tailwindcss/jit` package. I dedicated a [whole blogpost about that](<https://www.elian.codes/blog/21-03-18-add-tailwind-jit-to-your-nuxtjs-site/>), so read it if you're interested and would like to learn more about that.

It's actually easy and I recommend that you use it!

Install the package

```bash
yarn add -D @tailwindcss/jit
```

Tell PostCSS to switch packages by changing `require('tailwindcss')` to `require('@tailwindcss/jit')` in `postcss.config.cjs`

```js
module.exports = {
    plugins: [
      require('autoprefixer'),
      require('@tailwindcss/jit')
    ]
}
```

That should do it!
