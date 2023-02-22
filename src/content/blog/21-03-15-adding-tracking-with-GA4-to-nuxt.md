---
title: 📈 Adding tracking to your Nuxt site with GA4
pubDate: 03/15/2021 19:32
author: "Elian Van Cutsem"
tags:
  - Nuxt
  - Tracking
  - Analytics
imgUrl: https://google-analytics.nuxtjs.org/preview.png
description: Tracking your users' action on your site can be very helpful, but it isn't always as straightforward
layout: '../../layouts/BlogPost.astro'
---

# Adding tracking to your Nuxt site with GA4

I've been wanting to see how my site did in analytics for a while now but never got to actually installing and preparing it. Now that I finally attached a new domain ([elian.codes](<https://www.elian.codes/>)) and fixed my DNS for [elianvancutsem.com](<https://elianvancutsem.com>). I put in the works to add google analytics to my site. (blog post coming up about how I did that soon...)

Here is a little guide on how I did it and integrated it with [Nuxt](https://nuxtjs.org)

## Using nuxtjs/google-analytics

The [nuxtjs/google-analytics](<https://google-analytics.nuxtjs.org/>) module is a [Nuxt Community](<https://github.com/nuxt-community>) maintained module for Nuxt. It depends on the [vue-analytics](<https://github.com/MatteoGabriele/vue-analytics>) package and optimizes it for Nuxt. It's very easy to install and configure, but it doesn't support GA4 (yet).

Install the module with:

```bash
yarn add --dev @nuxtjs/google-analytics
```

and configure the `nuxt.config.js` by adding the module to the `buildModules`

```js
{
  buildModules: [
    '@nuxtjs/google-analytics'
  ],
}
```

Note that if you're using Nuxt `< 2.9` you need to add it to the `modules` instead of `buildModules`.

Then simply add a new section `googleAnalytics` to your `nuxt.config.js`

```js
export default {
  googleAnalytics: {
    id: 'UA-XXX-X'
  }
}
```

If your source code is private you can add it right in the config, but it's good practice to add it as an environment variable. more about that [here](<#using-an-environment-variable>).

### other options and configurations

There are a lot of options available to customize your config to your need and you can read more about that on [the documentation](<https://google-analytics.nuxtjs.org/options/>).

## Using vue-gtag

If you need or want to use the newer GA4, you'll have to wait a bit longer until nuxtjs/google-analytics supports it, or use a little workaround.

You can install [vue-gtag](<https://www.npmjs.com/package/vue-gtag>) as a package and configure Nuxt to use it as a plugin.

You can install vue-gtag via cli using:

```bash
yarn add vue-gtag
```

then make a new file in the `plugins` directory called `gtag.js`.

then add the following to the `gtag.js` file:

```js
import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-XXXXXXXXXX' }
})
```

Next, configure Nuxt to use the plugin by adding this to your `nuxt.config.js` file:

```js
{
  plugins: ['~/plugins/gtag.js']
}
```

That should be it!

## Using an environment variable

It's good practice to don't expose your Google GTag. So you can add it as an environment. To do this you can just add `process.env.GOOGLE_ANALITICS_ID` instead of the tag in your config.

In the case of nuxtjs/google-analytics:

```js
googleAnalytics: {
  id: process.env.GOOGLE_ANALITICS_ID
}
```

and in the case of vue-gtag:

```js
Vue.use(VueGtag, {
  config: { id: process.env.GOOGLE_ANALITICS_ID }
})
```

Now you can add the environment variable in your CI/CD or build config.

Hope you got something useful out of this!
