---
title: ✨ Using slots to build layouts in Astro
pubDate: 09/25/2021 17:48
author: "Elian Van Cutsem"
tags:
  - Astro
  - JavaScript
  - Framework
imgUrl: https://css-tricks.com/wp-content/uploads/2021/05/astro-homepage.png
description: Coming from frameworks like NuxtJS and NextJS, I always liked the layout feature. It's a quick way to reuse shared components without re-importing them in every page. When I started with Astro, I had no idea that this was also possible.
layout: '../../layouts/BlogPost.astro'
---

# Using slots to build layout in Astro

Coming from frameworks like NuxtJS and NextJS, I always liked the layout feature. You basically write a new component, add some original content to it and add a layout which contains all the mutual components like headers, footers and such.

When I first started learning Astro, I didn't directly see a way to realise this. Astro feels a lot more like writing super-powered HTML, which is nice, but I hated to re-import my header component in every page.

After some time experimenting somewhat more with Astro, I actually understood that this was possible, it's just a different way of approach then NuxtJS which I'm so used to.

## Building Layouts in NuxtJS

Building layouts in Nuxt is really easy (or I'm just very used to it). There's a `layouts` folder in which you create a new file

```html
<template>
  <div>
    <TheHeader />
    <Nuxt /> <!-- The page content will then go here -->
    <TheFooter />
  </div>
</template>
```

If the Nuxt layout component was named `Default.vue` you can just add `layout: 'default` in a page to use the layout. The `<Nuxt />` element will then be replaced by the `<template>` contents of your page Vue template.

```html
<template>
  <main>
    <h1>Look ma, a layout</h1>
    <p>works great right?</p>
  </main>
</template>

<script>
export default {
  layout: 'default',
}
</script>
```

It's an easy way to define and use templates and layouts and I actually got quite familiar with it, which is (I think) why I never used it before in Astro.

## The Astro way

In Astro, it's actually quite simple to also do this, you just gotta forget what you know about other frameworks.

### Define a layout

Let's define a new Astro template in the `/src/layouts` folder and call it `Default.astro`. In this template, we make use of the Astro `<slot />` component to tell Astro where to render in the content of our page. Every page will then ofcourse have different content, with a shared `<YourHeadComponent />`, `<YourHeaderComponent />` and `<YourFooterComponent />`.

```astro
---
import YourHeadComponent from '../components/layout/Head.astro
import YourHeaderComponent from '../components/layout/Header.astro
import YourFooterComponent from '../components/layout/Footer.astro
---
<html lang="en">
  <head>
    <YourHeadComponent />
  </head>
  <body>
    <YourHeaderComponent />
    <slot /> <!-- The page will render it's content here -->
    <YourFooterComponent />
  </body>
</html>
```

### Make a page use a layout

To then also use the layout we defined above, we just have to create a new page in the `/src/pages` folder and import our `<DefaultLayout>` component we just defined.

```astro
---
import DefaultLayout from '../layouts/Default.astro
---
<DefaultLayout>
  <main>
    <h1>Look ma, a layout</h1>
    <p>works great right?</p>
  </main>
</DefaultLayout>
```

This makes Astro even more powerful and versatile.
