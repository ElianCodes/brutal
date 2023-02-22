---
title: 📈 Add custom tracking events to your nuxt site with GA4
pubDate: 04/05/2021 22:01
author: "Elian Van Cutsem"
tags:
  - Nuxt
  - Tracking
  - Analytics
imgUrl: https://google-analytics.nuxtjs.org/preview.png
description: Tracking with GA4 can be very useful, here's a little guide on tracking things you find important with custom GA4 events in Nuxt
layout: '../../layouts/BlogPost.astro'
---

# Add custom tracking events to your nuxt site with GA4

Sometime ago I wrote [an article about pairing Nuxt with GA4](<https://www.elian.codes/blog/21-03-15-adding-tracking-with-ga4-to-nuxt/>) and wanted to try it out after just playing around with it for a bit. The older [Universal Analytics (UA)](<https://support.google.com/analytics/answer/10269537?hl=en>) worked fine for me, but after using it rather intensive, I xanted to dive a little deeper into understanding how a user interacts with my website and how I can improve the user experience.

## Adding GA4 support to Nuxt

Adding GA4 isn't that hard in Nuxt, if you need a more in-depth guide on that, check out [this article](<https://www.elian.codes/blog/21-03-15-adding-tracking-with-ga4-to-nuxt/>). Here follows a little guide without many in-depth descriptions:

Firstly we install [Vue-gtag](<https://www.npmjs.com/package/vue-gtag>), the documentation of that package can be found [here](<https://matteo-gabriele.gitbook.io/vue-gtag/>).

```bash
yarn add vue-gtag
```

Now we have to configure the package as a plugin in Nuxt the following way:

```js
// analytics.js

import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-XXXXXXXXXX' }
})
```

Fill the `G-XXXXXXXXXX` with your specific gTag you can create in the Google Analytics dashboard.

Now actually tell Nuxt to use the plugin:

```js
// nuxt.config.js

plugins: [
    '~/plugins/analytics.js'
  ],
```

That's it for the basic GA4 tracking. You can set more options in `analytics.js` if you want and can read more about that on [the official documentation for vue-gtag](<https://matteo-gabriele.gitbook.io/vue-gtag/>) or on [the gtag.js documentation](<https://developers.google.com/analytics/devguides/collection/gtagjs>).

## Adding both UA and GA4 support to Nuxt

So if you're using the setup as above, you can also add a UA support tag to take full advantage of the Google Analytics features. Nuxt has it's own module called `@nuxtjs/google-analytics` module that (right now) only supports UA tracking.

Install the module:

```bash
yarn add -D @nuxtjs/google-analytics
```

Add it as a buildModule

```js
// nuxt.config.js

buildModules: [
  '@nuxtjs/google-analytics',
  // Probably more modules
]
```

Now you only have to add your own UA tag to complete the setup:

```js
// nuxt.config.js

googleAnalytics: {
  id: 'UA-XXXXXX-X' // or use process.env.GOOGLE_ANALYTICS_ID
},
```

Now the next time you build your project it will include both the UA and GA4 tracking scripts. The only thing you can add to improve your tracking is adding custom events. More about that below.

## Add custom events to GA4

To understand better what actions a user undertakes while roaming around on your website, it can be interesting to define some custom events. On my website I included a custom event for the themeToggle. If a user switches theme, I get a custom event in the Google Analytics Dashboard, so I can see how important this feature actually is. If it nevers gets triggered I know that I can remove the feature without losing users.

Here I'll explain my setup to send a trigger when toggling the darkmode:

In the Vue component you'll have access to the `this.$gtag` object. So to actually send an event, we can access the following code snippet:

```js
this.$gtag.event('action', {
    'event_category': 'category',
    'event_label': 'label',
    'value': 'value'
})
```

We can use this snippet in every component since we added `vue-gtag` as a component.

So to send a custom event trigger we can use the `v-on:click` or any other directive to call a method. Here's an example:

```vue
<template>
  <a v-on:click="activateLightMode" class="" v-if="activeTheme === 'dark'">
    <svg >
        <path />
    </svg>
  </a>
</template>

<script>
export default {
  // ...
  methods: {
    activateLightMode () {
      // Place the logic for dark- or lightmode here
    }
  }
}
</script>
```

Now we need to only add a custom event to it:

```vue
<template>
  <a v-on:click="activateLightMode" class="" v-if="activeTheme === 'dark'">
    <svg >
        <path />
    </svg>
  </a>
</template>

<script>
export default {
  // ...
  methods: {
    activateLightMode () {
      this.$gtag.event('toggleDark', {
        'event_category': 'toggleTheme',
        'event_label': 'dark',
      })
      // Place the logic for dark- or lightmode here
    }
  }
}
</script>
```

Now you should see the event pop-up in your GA dashboard!

Happy Tracking
