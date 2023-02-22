---
title: 💄 Tailwind CSS in Astro
pubDate: 04/23/2022 20:48
author: "Elian Van Cutsem"
tags:
  - Astro
  - JavaScript
  - TailwindCSS
description: Since Astro 24, the documentation of Tailwind CSS in Astro has disappeared. Not because it's not supported, but because it now holds true to the Tailwind CSS documentation itself. If you still need a guide on how to use them both, look no further!
imgUrl: https://css-tricks.com/wp-content/uploads/2021/05/astro-homepage.png
layout: '../../layouts/BlogPost.astro'
---

# Tailwind CSS in Astro

Since Astro 24, the documentation of Tailwind CSS in Astro has disappeared. Not because it's not supported, but because it now holds true to the Tailwind CSS documentation itself. If you still need a guide on how to use them both, look no further!

## Setup Astro

Installing and setting up Astro is really easy. You can read the documentation on it [right here](<https://docs.astro.build/en/getting-started/#install-astro-locally>)!

In the following examples I'll be using NPM, but feel free to use Yarn or PNPM, all of those have a dedicated Astro create command

```shell
npm create astro@latest
```

The Astro create script will ask a few questions, like where to install and what template to use. Feel free to use whatever suits you most, I tend to mostly choose the *minimal* template since I don't like boilerplate.

After running the above command, Astro will be ready to use. (*Don't forget to `cd` into the folder where you initialised your project*). After you're done installing the dependencies, run `npm run dev` to see it come to life on port `3000` (look [here to change the port](<https://docs.astro.build/en/reference/configuration-reference/#server-options>))!

## Install TailwindCSS

Now that we're done setting up Astro, we can advance on installing and using Tailwind CSS with it.

### Installing packages

To use Tailwind CSS, we'll need to install both Tailwind CSS & autoprefixer as developer dependencies:

```shell
npm install -D tailwindcss autoprefixer
```

That's all we need to do since Astro uses Vite under the hood, we don't need to install PostCSS, since PostCSS comes with Vite by default.

### Configuration Files

After installing Tailwind, we'll need to add the Tailwind configuration file by running `npx tailwindcss init` or by adding the `tailwind.config.js` file manually in the root of the project and adding following content:

```js
module.exports = {
  content: ["./src/**/*.{astro}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Keep in mind I added `astro` as the extension there. If you're going to use other extensions like `vue` or `tsx`, don't forget to add them as well.

Next, let's add the PostCSS configuration file `postcss.config.js` in the root of your project:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

## Adding a stylesheet

Now that all installations and configurations are out of the way, let's create your stylesheet and import it in your project.

You can call the CSS-file whatever you want, I'll call mine `global.css` and add it in `/src/styles` directory.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

when you import this file in your Astro page or layout, all default browser styles will be erased, so it should be instantly be clear to see if it worked.

```astro
---
import '../styles/global.css'
---
<body class="bg-green-300 text-white">
</body>
```

This is all to get basic Tailwind CSS working in Astro!
