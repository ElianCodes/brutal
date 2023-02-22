---
title: ♻️ Upgrading my website to Astro v1.0
pubDate: 04/26/2022 21:52
author: "Elian Van Cutsem"
tags:
  - Astro
  - JavaScript
  - TailwindCSS
description: Astro came out with a beta version of the v1.0 release of the framework. I upgraded my website to use that version, since I was still running on v0.24. The following are some of the changes I had to do to get it working.
imgUrl: https://css-tricks.com/wp-content/uploads/2021/05/astro-homepage.png
layout: '../../layouts/BlogPost.astro'
---

# Upgrading my website to Astro v1.0

So, Astro came out with some beta versions of their v1.0 release of the framework. I upgraded my website to use that version, since I was still running on v0.24 (2 or 3 months behind). The following are the changes I had to do to get it working.

## New Markdown API

### `Astro.glob()` vs. `Astro.fetchContent()`

Astro has replaced the 'old' `Astro.fetchContent()` with a newer version called `Astro.glob()`.

This is what the older API looked like:

```astro
---
const blogposts = Astro.fetchContent('*.md')
---
<body>
  <ul>
    {
      blogposts.map(blogpost => {
        return (
          <li>{blogpost.title}</li>
        )
      })
    }
  </ul>
</body>
```

In my eyes the new API looks way better and is more developer friendly since it uses `await`, which also means, you can use `.then()` & `.catch()`.

Here is what it looks like:

```astro
---
const blogposts = await Astro.glob('*.md');
---
<body>
  <ul>
    {
      blogposts.map(blogpost => {
        return (
          <li>{blogpost.frontmatter.title}</li>
        )
      })
    }
  </ul>
</body>
```

An example of what the `.then()` use, could look like:

```astro
---
const blogposts = await Astro.glob('./**/*.md').then(posts => posts.sort((a, b) => new Date(b.frontmatter.createdAt) - new Date(a.frontmatter.createdAt)))
---
```

### Frontmatter and variables

Did you notice in the above example that I used `blogpost.frontmatter.title`?

Yup, that's an example of the new Markdown API.

The new API gives you access to the frontmatter as a whole with variables as an object.

Check out [the official docs about this here](https://docs.astro.build/en/migrate/#new-markdown-api).

## Default script behaviour

The default `<script>` behaviour has changed to default `hoist`, which means that Astro will process the scripts by default. This behaviour can be changed by using `<script is:inline>` to tell the Astro compiler to leave your script unchanged and unprocessed.

More about that [here](https://docs.astro.build/en/migrate/#new-default-script-behavior).

## New configuration API

Some changes also ocurred in the `astro.config.mjs` file.

Here's an example of the new API:

```js
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'ignore',
  site: 'https://www.elian.codes',
  server: {
    port: 3000
  },
  integrations: [sitemap({
    canonicalURL: 'https://www.elian.codes',
  })]
});
```

Note that the `integrations` object is a new thing, which basically contains the renderers and other Astro packages. Here I've used it to load in the sitemap configuration, since the `sitemap: true` is depricated.

Keep in mind that the `@astrojs/sitemap` is a new and seperate package, so should be installed too.

That's basically all I had to do. If you're interested to upgrade your Astro website to v1.0-beta and need some more guidance, here's the [Official upgrade & migration guide](<https://docs.astro.build/en/migrate/>)
