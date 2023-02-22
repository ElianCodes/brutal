---
title: 💄 What's new in TailwindCSS v3
pubDate: 10/03/2021 11:23
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - JavaScript
  - Release
imgUrl: https://miro.medium.com/max/1400/0*A70w-WrmSaBVxwAm.png
description: TailwindCSS v3-alpha-1 was released yesterday! It's not a full release of v3 yet, but might already give us an insight on what is to come with TailwindCSS v3.
layout: '../../layouts/BlogPost.astro'
---

# What's new in TailwindCSS v3

[TailwindCSSv3.0.0-alpha-1](<https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.0.0-alpha.1>) was released yesterday! It's not a full release of v3 yet, but might already give us an insight on what is to come with TailwindCSS v3.

I went through the release notes and summed up some things that I found importand below.

## New

In TailwindCSS v3, JIT will be the default compiler mode. If you want to learn more about the Just-In-Time compiler, [check this blogpost](<https://www.elian.codes/blog/21-03-16-what-is-tailwindcss-jit-and-how-to-use-it/>).

All colors are enabled by default. Before you had to import them via the `tailwind.config.js`.

new utilities:

- `aspect-ratio`
- `scroll-snap`
- `scroll-behavior`
- `text-indent`
- `column`
- `touch-action`
- `will-change`
- `border-x` & `border-y`

new variants:

- `file:` -> for the native file upload button styling
- `open:` -> for styling native `<details>` & `<dialog>` elements

### Using JIT in CDN mode

Before, when using the TailwindCSS CDN, you had to give up on a lot of configuration functionality. Well, that isn't the case anymore since TailwindCSS v3. But TailwindLabs noted: **TailwindCSS CDN JIT is intended for development only, do not use in production!**. So there is probably still something in the works there.

Using the TailwindCSS CDN JIT isn't that hard:

```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <!-- add base TailwindCSS -->
+     <script src="https://cdn-tailwindcss.vercel.app/"></script>

      <!-- add Plugins -->
      <script src="https://cdn-tailwindcss.vercel.app/?plugins=forms,typography,aspect-ratio,line-clamp"></script>

      <!-- customize config -->
      <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              tomato: 'tomato',
            },
          },
        },
      }
    </script>

    <!-- add custom styling -->
    <style type="text/tailwindcss">
      body {
        @apply bg-pink-500;
      }
    </style>
    </head>
    <body>
      <!-- -->
    </body>
  </html>
```

## Breaking

- PostCSS 7 won't be supported any longer
- `purge` option in `tailwind.config.js` has changed to `content`
- `overflow-clip` utility was changed to `text-clip`

## Notes

If you decide on trying TailwindCSS v3 early, be sure to update the @tailwindcss dependencies to like `@tailwindcss/typography` and `@tailwindcss/forms`

You can install or upgrade both `tailwindcss` and its dependencies by adding `@next` as a release:

```bash
npm i -D tailwindcss@next
npm i -D @tailwindcss/typography@next
```

All official releasenotes can be found [on the TailwindCSS GitHub repo](<https://github.com/tailwindlabs/tailwindcss/releases>).
Check out the official [TailwindCSS Documentation](<https://tailwindcss.com/docs>)
