---
title: 🎉 Initial commit
pubDate: 02/03/2021 18:11
author: "Elian Van Cutsem"
tags:
  - Nuxt
  - JavaScript
  - Blog
imgUrl: https://madewithnetwork.ams3.cdn.digitaloceanspaces.com/spatie-space-production/3075/nuxtjs-2.jpg
description: This week I've recreated my website and blog with Nuxt and Bootstrap, in this post I describe how it all came together.
layout: '../../layouts/BlogPost.astro'
---

# Recreating my site in Nuxt and adding a blog

So, next week I'm about to start my journey as a Full-stack software engineer at [vBridge](<https://www.vbridge.eu>). I'm so excited! The internship is part of my school program, a part of the internship is keeping a blog with your findings and thoughts, so I decided to build my own blog with [Nuxt](<https://nuxtjs.org>) instead of a regular WordPress or something else. Nuxt was on my 'want to learn' list for a while, so I was very excited to finally try out the framework. I'm a huge fan of [Vue](<https://vuejs.org>) so it didn't seem very hard to learn and implement Nuxt. I was right.

## Setting up Nuxt

setting up Nuxt was actually really easy. I just searched for the [official Nuxt documentation](<https://nuxtjs.org/docs/2.x/get-started/installation>), turns out to be a very good documented framework (not that I expected something else since the [Vue documentation](<https://v3.vuejs.org/guide>) is the best I've ever seen).

On the homepage of the Nuxt documentation there's a very simple guide that takes you trough the whole setup. It's just a few command since it uses the `create nuxt-app` command to setup the basic template app. From there I kind of figured the rest out by scrolling through the documentation.

### static generation

since I'm hosting my whole website with [Github Pages](<https://pages.github.com/>) I had to configure Nuxt to generate static files. Also this was really easy. I just had to put `target: 'static'` in the `nuxt.config.js` file. It already pre-configured the yarn commands for me. (yes, I'm a yarn user)

### front-end configuration

The Nuxt website was now configured for the most part, but since I already had a Vue website, I had to rebuild it in Nuxt (which is basically the same), So I dragged and dropped my files in the pre-made folders in the example app and installed Bootstrap & bootstrap-vue, and everything worked as it should!

Nuxt has a pre-configured router, so I didn't even had to setup the routing.

## Building a blog

As I said in the introduction, I mainly transferred my old Vue site to Nuxt to be able to include a simple blog feature. I just googled: "how to build a blog in Nuxt". Turns out Nuxt itself had a blog post: [Creating blog with Nuxt content](<https://nuxtjs.org/blog/creating-blog-with-nuxt-content>). So I basically followed that guide to create my own blog

### Nuxt/content

Nuxt content also has it's own dedicated documentation which is <https://content.nuxtjs.org/>.

The setup for a blog is very easy. You install the `@nuxt/content` package and you're almost ready to go. Just have to add some settings in the `nuxt.config.js` file, add some .md files with your blog content per post, a new page with your blog feed and a template for your blog. It worked super fast and couldn't be any easier.

It pre-configures an API where you can fetch your posts by a global variable `$content` more about that is described [here](<https://content.nuxtjs.org/fetching>). In a static environment it compiles all files to a `db.json` file where it fetches the content.

### Nuxt/feed

To fulfill al the requirements for school, I also had to add a RSS feed to my blog. I'm a big fan of the [Feedly](<https://feedly.com/>) platform (which is a RSS-feed reader). So I googled some more on how to pair Nuxt and RSS. Also this was well documented in exactly how I needed it to be. It's just in the [nuxt content integrations section](<https://content.nuxtjs.org/integrations#nuxtjsfeed>) in the documentation. This was somewhat more complicated, but still very easy since it's so well documented. You basically install the `@nuxtjs/feed` module and configure it in the `nuxt.config.js` file. I only needed the RSS XML version, but even more formats are supported (JSON, for instance).

Something that took some more research was displaying the content correct in the RSS feed. I could just input the whole static html as the content, but that looked really off since it also inserted the header and footer in the content. So I decided to take the raw .md contents as the content, only then to discover that most RSS feeders didn't display it right, so I then installed the `marked` NPM package and converted it to HTML, now it looks like I wanted it to.

## Conclusion

Nuxt is a very easy to install and use platform which is well documented. If you already know Vue it's only a little step-up but can improve the speed for a production ready product. The blog stack in nuxt is easy to install and use if you know some markdown and don't need a CMS, which I don't since I host on Github pages.
