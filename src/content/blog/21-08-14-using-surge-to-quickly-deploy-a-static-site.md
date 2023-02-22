---
title: 🚀 Using Surge.sh to quickly deploy a static site
pubDate: 08/14/2021 12:23 
author: "Elian Van Cutsem"
tags:
  - Surge
  - Deployment
  - Hosting
imgUrl: https://thepracticaldev.s3.amazonaws.com/i/fbcv71kd73re1b9bvl0i.png
description: Deploying a static site is made very easy and free by Surge.sh, in this article I explain how it works, what it is and why you should use it.
layout: '../../layouts/BlogPost.astro'
---

# Using Surge.sh to quickly deploy a static site

Deploying a static site can be really easy when using [Netlify](https://www.netlify.com), [Vercel](https://vercel.com) or another service. Most of them require to have a connection to a [Github](https://www.github.com) (or similar) repository, although some of them also come with a CLI version. [Surge.sh](http://surge.sh) is a tool that makes it very easy to deploy a simple site via the command line without any hassle, this can be a useful tool to make a temporary link for a preview for a client or yourself.

## Why use Surge over other services

Personally I like that Surge is just so easy. It's literally nothing more than a simple command. One thing that's also really likeable about Surge is that it doesn't require configuration. For instance, a 404 error code will just default to `404.html`, and any other `yourdomain.surge.sh/testpage` will default to `testpage.html`. There is no GUI or any other way to really manage your sites. Don't forget that Surge only supports static sites, in other words, JAMStack sites (compiled to JavaScript, API's and Markup). So server-side-rendering is not an option.

### Pricing

Surge has a free and paying plan, if you want to learn more about that, you can always take a look on [the official website](https://surge.sh/pricing). It comes down to two options.

The free plan includes basic SSL and unlimited publishing, which might be good enough to simple deploy preview versions for client or to use as tests for yourself. You can even use custom domains (like `yourdomain.surge.sh`).

The paid plan costs $30/mo and includes HTTPS, unlimited domains, redirects, password protection per site and a lot of other features.

## Installing Surge

Installing Surge is as easy as installing it as a global npm package:

```bash
npm install --global surge
```

## Deploying a directory to Surge

So now that you have installed Surge, you can simply navigate into your directory with the site's code and assets and run the `surge` command.

```bash
# Navigate to your (static) site
cd yoursite/

# Deploy to Surge
surge
```

Surge will than (only the first time) ask you to log in or create your account, after which it asks you the subdomain of the site and immediately will start deploying. This only takes a little moment and once it's done, your website will be live in an instant.

Of course you need to keep in mind that Surge does nothing more than deploy a directory directly on the web, so there is no building or compiling involved. If you want (or need) to deploy a site with `node_modules`, you could compile your website locally and just deploy the output build folder, or use an external CI/CD provider like [Travis](https://www.travis-ci.com/) or [Github Actions](https://github.com/features/actions). To use CI/CD, you need to use an online repository of course.

The demo of this article can be found on [http://swapped-coffee.surge.sh]. (It only contains an `index.html` & `404.html` file)
