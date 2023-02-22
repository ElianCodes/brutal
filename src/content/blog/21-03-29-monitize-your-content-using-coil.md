---
title: ✨ Monetize your content with Coil
pubDate: 03/29/2021 13:20
author: "Elian Van Cutsem"
tags:
  - Coil
  - Monitize
  - PWA
imgUrl: https://consistentme.com/wp-content/uploads/2019/12/Coil-Web-Monetization.png
description: Ads are annoying right, Coil adds a new way to get paid for every second spent on your content.
layout: '../../layouts/BlogPost.astro'
---

# Monetize your content with Coil

Ads are annoying and I would never place advertisements on my own website or blog. [Coil](<https://coil.com>) adds a new way to get paid for every second someone spends on your content.

Last week I published my backlog of blog posts over on [Dev.to](<https://dev.to/elianvancutsem>). Since then I got over 800 views and reads on my posts, which is awesome! While scrolling through some settings and extensions I came across an extension called Coil, which would micro-monetize my content. Doesn't hurt to try I thought to myself...

## What is Coil

Coil offers a subscription of $5 per month, Coil will then spend that $5 over the sites you visit that support web monetization. You can add support for web monetization on your own websites or blog by just adding the support header in the meta tags on your website (which I'll demonstrate below).

## Get paid by Coil

Coil will payout a little bit roughly every second spent on you monetized content. Great, but how do I add support to my website? You can read the full docs on it [here](<https://coil.com/creator>), but it isn't really that hard. To get your pointer is easy, but to explain that here would take too long. Read the guide on that [here](<https://developers.coil.com/#Example>)

It comes down to getting your payment pointer and adding it to your site like the following:

```html
<html>
  <head>
    <meta name="monetization" content="$ilp.uphold.com/gH9RGFW9ijRA">
  </head>
</html>
```

Of course, it's also not that hard to add it in something like [Nuxt](<https://nuxtjs.org>) where you don't have access to a static HTML file:

```js
// nuxt.config.js
 head: {
    title: 'Elian Van Cutsem',
    htmlAttrs: {
      //
    },
    meta: [
      { charset: 'utf-8' },
      { name: "monetization", content: "$ilp.uphold.com/gH9RGFW9ijRA" },
      { hid: 'description', name: 'description', content: 'Elian Van Cutsem' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },
```

Easy money, right!

Oh yes, you shouldn't be scared to keep the pointer secret. It will show up in the browser anyway and will always point to your wallet, so don't worry that someone will steal your pointer.
