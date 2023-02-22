---
title: 🔧 Set your NodeJS version in Netlify
pubDate: 12/03/2021 08:25
author: "Elian Van Cutsem"
tags:
  - NodeJS
  - JavaScript
  - Netlify
imgUrl: https://download.logo.wine/logo/Netlify/Netlify-Logo.wine.png
description: A couple of times I needed to fix the NodeJS version on a Netlify site, I found myself googling it a couple of times, so this little how-to is basically a note-to-self.
layout: '../../layouts/BlogPost.astro'
---

# Set your NodeJS version in Netlify

A couple of times I needed to fix the [NodeJS](<https://nodejs.org>) version on a [Netlify](<https://www.netlify.com>) site, I found myself googling it a couple of times, so this little how-to is basically a note-to-self.

The solution to setting a fixed NodeJS version is actually quite easy:

1. go to your desired website
1. go to Site Settings
1. under *Build & deploy*
1. scroll down to *Environment*
1. add a new environment variable named `NODE_VERSION`
1. set it to your desired version (major or minor)

![setting the Node version environment variable in Netlify](https://i.imgur.com/dHA6d8B.png)

When you set it to `16`, it will automatically use the latest `16.xx.xx`.

More information over on the [Netlify documentation](<https://docs.netlify.com/configure-builds/manage-dependencies/>)
