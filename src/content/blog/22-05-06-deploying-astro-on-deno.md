---
title: 🚀 Deploying Astro on Deno
pubDate: 05/06/2022 11:38
author: "Elian Van Cutsem"
tags:
  - Astro
  - Deno
  - TypeScript
description: Astro came out some time ago with a SSR Deno adapter. I never tried it out before, So I thought I should give it a try!
imgUrl: https://ik.imagekit.io/serenity/ByteofDev/Blog_Heading_Images/State_of_the_Web_Deno
layout: '../../layouts/BlogPost.astro'
---

# Deploying Astro on Deno

Astro came out some time ago with a SSR Deno adapter. I never tried it out before, So I thought I should give it a try!

*make sure you've installed npm and deno before starting!*

**Note:** *Also keep in mind that this is still highly experimental!*

## Installing Astro and adapter

Installing Astro isn't hard, just run the following command:

```shell
npm create astro@latest
```

The Astro CLI will ask some questions, like what template to use, where to install and so on. I tend to mostly use the "just the basics" template, but choose whatever fits your use-case best!

When the installation is done, let's move on to adding the Deno adapter. Install it with `npm i -D @astrojs/deno`. Of course, you can use `pnpm` or `yarn` too.

Change your `astro.config.mjs` configuration file to the following:

```js
import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";

export default defineConfig({
  adapter: deno()
});
```

The adapter can contain some options, but I won't really get further into them in this post. You can check the [API reference here](https://github.com/withastro/astro/tree/main/packages/integrations/deno#api)

## Local development

If everything above went correct, you should be able to run `npm run dev` to start the development server! By default, it should start on `http://localhost:3000`.

The dev server supports everything you think of when using a development server (Hot Module Reloading, ect.)

## Deployment (preview)

So now that you've installed the Deno adapter and bootstrapped Astro, let's move on to the deployment step.

To build for deployment, run `npm run build` as you would normally do in a Node environment.

Notice that the output folder (`dist/`) contains a `server/` & `client/` directory. The `client` directory will contain all static assets, like CSS, images and other assets, while the `server/` will contain the server-side code. (duh...)

Now, to actually view and run the Astro site through Deno, there are still some steps to take. First of all, define the port you want to run the website on in the `astro.config.mjs` file:

```js
import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";

export default defineConfig({
  adapter: deno({
    port: 8080
  })
});
```

This will tell the Deno runtime to start the server on port 8080 without specifying in the run command.

To serve the website with an `npm` command, we still need to change the script in the `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "deno run --allow-net --allow-read ./dist/server/entry.mjs"
  }
}
```

The `--allow-net` tells Deno that it may allow network access to the server, `--allow-read` makes it possible for Deno to read the static assets from the `client/` folder. You could use `deno run -A` too, but that would bypass all security rules that Deno uses.

Now we are ready to preview the actual build, run `npm run preview`! You should see your website served through Deno on `http://localhost:8080`

[More about Astro SSR & adapters here](https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project)

[You can check the official repo and docs here](https://github.com/withastro/astro/tree/main/packages/integrations/deno)
