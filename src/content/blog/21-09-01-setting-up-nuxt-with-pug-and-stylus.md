---
title: ✨ Setting up Nuxt with Pug and Stylus
pubDate: 09/01/2021 21:48
author: "Elian Van Cutsem"
tags:
  - Nuxt
  - Pug
  - Stylus
imgUrl: https://miro.medium.com/max/1400/1*sR9hl1Wbxt0mYFu2l1Efbw.png
description: Nuxt is really cool all by itself but can even be cooler when combined with another templating engine. In this example I'll use Pug and Stylus to fiddle around.
layout: '../../layouts/BlogPost.astro'
---

# Setting up Nuxt with Pug and Stylus

[Nuxt](https://nuxtjs.org/) is really cool all by itself but can even be cooler when combined with another templating engine. In this example I'll use [Pug](https://pugjs.org/api/getting-started.html) and [Stylus](https://stylus-lang.com/) to fiddle around.

## Installing Nuxt

Ofcourse, the basic requirement of this whole setup is Nuxt. I've been using Nuxt for a couple months and it really has become part of my go-to tech-stack. I love all the possibilities that Nuxt has to offer. You can install so many extra modules and make them do your work, which is really useful. I've already written some blogposts about some Nuxt modules, so I won't go to deep on them in this article, but I will show the basics of installing and using Nuxt by itself.

If you're looking to understand the basics of [Stylus](https://stylus-lang.com/), [Pug](https://pugjs.org/api/getting-started.html), [Vue](https://vuejs.org/) or [Nuxt](https://nuxtjs.org/) itself, this probably won't be something for you, but you're always welcome to read 😉

First of all, let's [install the basic Nuxt boilerplate](https://nuxtjs.org/docs/2.x/get-started/installation)

```bash
npx create-nuxt-app your-awesome-website
```

[It will ask you some stuff](https://github.com/nuxt/create-nuxt-app/blob/master/README.md) like what modules you want, what UI framework you need ect. Choose freely, but it's easier to go with just the basics here.

Now that Nuxt is installed, you should be able to run `yarn dev` or `npm run dev` to start the dev-server. From this point on I'll use [Yarn](https://yarnpkg.com/) since it's my personal preference, but feel free to use whatever you like most.

## Adding Pug to the config

### Installing Pug onto Nuxt

To start using Pug as a templating engine in Nuxt, we firstly have to install the language processor itself, to do this, we'll use two packages, one as the language and one as the loader so that Nuxt knows how to handle and compile the templates.

```bash
yarn add -D pug pug-plain-loader
```

There's also another package called `vue-pug-loader` which focusses more on maintaining the Pug syntax with Vue variables '[more about that on the NPM package README](https://www.npmjs.com/package/vue-pug-loader)). You can choose whatever you like.

### Using a Pug layout

If you have been using pug for a while, you'll know that Pug in itself is a templating engine and doesn't really need Nuxt to prove it's worth. Well, you're right. In Pug you can use the `include` or `extends` element to extend a layout or include another template. (more info about this is on [their own documentation](https://pugjs.org/language/includes.html)) This does also work in Nuxt if you like working that way, but I'm more of a Nuxt layout user, so I wrote the part below for the people looking to use a combination of both Vue and Nuxt.

### Using a combination of Pug and Vue for components and Layouts

Nuxt has a default folder called `layouts/` in which it let's you define and create your own layouts using the `<nuxt />` element to show where page content should go. This works exactly the same in Pug:

```html
<template lang="pug">
div
    header
        //- your header could be here
    main
        nuxt
            //- Nuxt will place the page content here
    footer
        //- here comes your footer content
</template>

<script>
export default {
  name: 'default-layout',
}
</script>
```

### Using dynamic assets in Pug

One of the things I struggled with in my first experience with using a combination of Pug, Vue and Nuxt was using dynamic assets.

Static assets are as simple as HTML where you include the relative path in the `src` attribute in your `<img/>` element. That's ofcourse if you place them in the `static` folder in your Nuxt configuration.

Here's how to use a dynamic asset:

```html
<template lang="pug">
ul
    li(v-for="icon in icons" :key="icon")
        img(:src="require(`~/assets/img/icons/${icon}`)")
</template>

<script>
export default {
  name: 'using-dynamic-assets',
    data() {
        return {
            icons: [
                'first.svg',
                'second.png'
            ]
        }
    }
}
</script>
```

### Using Vue variables in Pug

Like you've seen in the example above, it's possible to use things like `v-if`, `v-for` and other Vue specific functions. It's also possible to use variables or props in our pug templates, just like you normally would:

```html
<template lang="pug">
div
    article.main-content
        h2 {{ title }}
        p {{ description }}
</template>

<script>
export default {
    name: 'using-vue-variables',
    props [
        'title', 'description'
    ]
}
</script>
```

### Using components with props

to actually make the component above work, we would still need something like this:

```html
<template lang="pug">
div
    UsingVueVariables(
        v-for="block in blocks"
        :key="block.title"
        :title="block.title"
        :description="block.description"
    )
</template>

<script>
import UsingVueVariables from '~/components/using-vue-variables.vue'
export default {
  name: 'using-components-with-props',
    components: {
        UsingVueVariables
    },
    data() {
        return {
            blocks: [
                {title: 'hello', description: 'world'},
                {title: 'from', description: 'ElianCodes'}
            ]
        }
    }
}
</script>
```

Works like magic!

## Adding Stylus

### Installing Stylus onto Nuxt

Since the codebase from the project I was porting to Nuxt was already using Stylus, I didn't want to change it to Sass or similar, so I took it as a challenge to get it working with Nuxt. Seemed harder then it actually is.

```bash
yarn add -D stylus stylus-loader
```

Note: bear in mind that Nuxt `>= v2.9` still uses Webpack 4 and not 5, so you'll probably need to downgrade your `stylus-loader` package to a Webpack 4 compatible version (`v4.3.3`)

### Stylus in a styled component

A lot of people tend to use single-file components in Vue, I don't blame them since it's the easiest way to start off a new project. Here's how to create a new styled component using [Stylus](https://stylus-lang.com/) as stylesheet:

```html
<template>
    <main>
        <h1> A simple styled component</h1>
        <p>Using Vue, Nuxt and Stylus</p>
    </main>
</template>

<script>
export default {
  name: 'using-stylus',
}
</script>

<style lang="styl" scoped>
h1
    color green
p
    color blue
</style>
```

### Stylus as a global stylesheet

Sometimes, a styles component library can be quite a handful, somtimes I prefer to just have a global stylesheet which imports all other Stylesheets, luckily for us, Nuxt let's you do this with quite an ease:

```js
export default {
    css: [
        { src: '~/assets/styls/styles.styl', lang:'styl' }
    ]
}
```

Now Nuxt knows that it has to include the file in the buildfolder and will include those styles on every page!

## Using external files as templates

One of the coolest and easiest things to do when you're rebuilding a website that already used Pug in the passed or when you want to keep a specific structure, is to use external Pug files as templates into your Vue components.
This is made really easy by adding it as an external template (same can be done for stylesheets BTW):

```html
<template lang="pug" src="~/components/folder/component.pug" />

<script>
export default {
  name: 'external-pug-template'
}
</script>

<style lang="styl" src='~/assets/styl/stylesheet.styl'>
```
