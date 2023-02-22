---
title: 💫 Adding a custom preloader to your nuxt site
pubDate: 03/12/2021 00:11
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - Nuxt
  - Front-end
imgUrl: https://madewithnetwork.ams3.cdn.digitaloceanspaces.com/spatie-space-production/3075/nuxtjs-2.jpg
description: I added a custom preloader to my Nuxt site. It's not that difficult, here's how I did it.
layout: '../../layouts/BlogPost.astro'
---

# Adding a custom preloader to your nuxt site

A custom preloader on your website doesn't necessarily have to be boring. It's probably the first thing a user sees when they enter your website for the first time, so why not make it an extension of your website with a matching design.

I recently redid the design of my website with TailwindCSS and came to the idea of adding a custom preloader. Nuxt is really easy expandable and customisable, so I searced for an easy way to do it and there was.

## Creating the custom component

So you it seems that nuxt simply allows you to set your own custom component as a preloader and it will automatically take care of the props.

Just build your template as you like it. Mine was as follows: (ofcourse it uses TailwindCSS, so don't mind the crazy classes)

```html
<template>
  <div class="absolute z-50 w-full h-full overflow-hidden flex justify-center items-center" v-if="loading">
      <div class="h-14 w-14 animate-pulse bg-green-300 rounded-full flex justify-center items-center">
        <svg class="w-12 h-12 text-green-500 animate-spin-slow" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
    </div>
  </div>
</template>
```

then we just have to add the script with the props that Nuxt provides us with:

```html
<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>
```

There's really not that much about it. you can configure it as a modal, or just as a component somewhere on your page. It's up to you to invent crazy things!

## Telling Nuxt to use you component as preloader

Configuring Nuxt to use your component is actually very easy. You just set it in your `nuxt.config.js` file like the following:

```js
module.exports {
    loading: '~/components/loader/Loader.vue'
}
```

As simple as that. Now nuxt should toggle your component everytime  it has something to load.

## Nuxt default preloaders

So now I had a cool custom component which looked awesome and matching to my site. Still I was not really happy with it. The main reason being that you literally have to see it everytime something loads. Everytime I clicked on a blogpost or switched pages it popped up. So it quickly annoyed me more than I found it valueable, so I ditched the idea of a preloader in the center of the page and went with the actually preset nuxt preloader and customised it to my needs.

So as we saw in our own component, we just have to tell nuxt to use a preloader. The default Nuxt preloader can be set as following:

```js
module.exports {
    loading: true
}
```

Mine is set as the following:

```js
module.exports {
    loading: {
        color: '#6ee7b7',
        height: '4px',
        failedColor: 'b91c1c'
    }
}
```

Not more than that, but ofcourse you can change more properties like: `rtl`, `css`, `continuous`, `duration` and more.

Nuxt also has a very good documentation of this which can be found [here](<https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading>)
