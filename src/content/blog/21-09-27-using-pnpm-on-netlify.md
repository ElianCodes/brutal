---
title: ♻️ Using PNPM on Netlify
pubDate: 09/27/2021 13:10
author: "Elian Van Cutsem"
tags:
  - Netlify
  - JavaScript
  - PNPM 
imgUrl: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o8e2at4huuuv08y24jvg.png
description: When I first switched my website over to PNPM instead of Yarn, I noticed that my Netlify build were failing. Here's a guide and solution to everyone having the same issue.
layout: '../../layouts/BlogPost.astro'
---

# Using PNPM on Netlify

When I first switched my website over to [PNPM](<https://pnpm.io/>) instead of [Yarn](<https://yarnpkg.com/>), I noticed that my [Netlify](<https://www.netlify.com/>) build were failing, although I set the build command to `pnpm build`. Here's a solution for everyone having the same issue, since I couldn't find any relevant information out there.

## Switching to PNPM

Switching to PNPM locally is almost instant. it's as easy as removing the older `package-lock.json` or `yarn.lock` file and then installing PNPM. (you can install it using a number of different ways, [more information here](<https://pnpm.io/installation>))

```bash
(Invoke-WebRequest 'https://get.pnpm.io/v6.14.js' -UseBasicParsing).Content | node - add --global pnpm
```

PNPM uses a very familiar syntax, so I won't explain further. You just have to track the `package.json` and newly generated `pnpm-lock.yaml` file to install dependencies on Netlify

## Telling Netlify to build using PNPM

Netlify offers a few different ways to interact with the build-environment. The easiest (and the one I use), is using the Netlify UI on their website. I will explain further how to use PNPM via the UI, but if you use a [`netlify.toml`](<https://docs.netlify.com/configure-builds/file-based-configuration/>) file, the approach should be roughly the same.

Actually, the approach is easy. Netlify doesn't have PNPM installed on their buildenvironment, but they do have NPM & Yarn installed. So we can mis-use them to install PNPM and go on from there. Just add the following as a buildcommand:

```bash
pnpm build || ( npm install pnpm && pnpm build )
```

The script will try to run `pnpm build` at first. If it fails, because PNPM is not installed, it will install PNPM using NPM and then proceed to run `pnpm build`.

Clever right.
