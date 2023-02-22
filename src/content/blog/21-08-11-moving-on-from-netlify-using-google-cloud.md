---
title: ✨ Moving on from Netlify to Google Cloud
pubDate: 08/11/2021 16:00
author: "Elian Van Cutsem"
tags:
  - Netlify
  - Google Cloud
  - Static Hosting
imgUrl: https://1000merken.com/wp-content/uploads/2021/03/Google-Cloud-Logo-700x394.png
description: Hosting your website online is one of the basic and required steps to build an online audience. Choosing the right platform to host it, can be a difficult process. In this blogpost I clearify my choice.
layout: '../../layouts/BlogPost.astro'
---

# Moving on from Netlify to Google Cloud

Hosting your website online is one of the basic and required steps to build an online audience. Choosing your hosting platform or service is one of the most important steps, although it might seem so simple to host your website on [Netlify](<https://www.netlify.com>), [Vercel](<https://vercel.com>) or any other hosting service, I chose [Google Cloud](<https://cloud.google.com>). Further is an explanation why.

## Why Netlify was my first option

Netlify is a great and easy-to-use platform for beginners and advanced users. If your website is mainly static or [JAMStack](<https://jamstack.org>), it's a great option. Since my website only uses [Nuxt](<https://nuxtjs.org>), [Nuxt content](<https://content.nuxtjs.org/>) (for blogposts) and [TailwindCSS](<https://tailwindcss.com>), my website is actually static. Netlify offers great integration with [Github](<https://www.github.com>) which is really handy when learning basic CI/CD.

When I started this personal website, it was literally nothing more than just a basic HTML5 `index.html` page without anything crazy to it that I placed on a rented server attached to my domain name. Later when I started my Computer Science degree I learned about Javascript and frameworks, I wrote a basic "interactive" website and compiled it, to then place the static HTML, CSS and JS files on the same servers. In my 2nd year of Computer Science, I started learning about CI/CD and was fascinated by how easy it all seemed. You just had to push your uncompiled source code onto a gitserver and then the CI/CD would take care of the rest. Right then and there I transformed my website to use node_modules and set up a basic CI/CD pipeline using the node `package.json` and let [Travis CI](<https://www.travis-ci.com/>) rework it down to a compiled website, after which it pushed the compiled source code to another branch on Github and [Github Pages](<https://www.github.com/pages>) served those files.

That worked great until I wanted to add more functions to my website. I started reading blogs and wanted to publish my own articles. [WordPress](<https://www.wordpress.org>) seemed great, but wasn't compatible with Github pages or any other "easy" hosting platform since it requires a full database and uses PHP (and SSR). So I thought of building my own website and blog system from scratch. Then I postponed for a year and then finally started working on this very website when I heard I needed a blog to finish my degree.

Netlify seemed so easy and perfect for my needs. Believe me, it was, as long as I didn't need a back-end.

(more below)

### What's JAMStack?

JAMStack is an abbreviation for JavaScript, API's and Markup, which basically means that your website's codebase can be compiled down to just HTML, CSS and JavaScript with a backend API.

## Why Google Cloud?

[Google Cloud](<https://cloud.google.com>) offers great usability for everything you need, they also offer a great deal of free tiers on some of their components or $300 in credits to play with. I decided to transfer to Google Cloud when I started some other project which also required back-ends. [Heroku](<https://www.heroku.com>) could have been a great option as well and is commonly used in combination with Netlify. When doing the math, I quickly realised that Google Cloud actually comes out way cheaper for the basic things I required, but is somewhat less easy to use when you're new to serverless hosting / cloud infrastructure.

I started using Google Cloud for some small projects for school which required backends and a low-cost. I mainly chose Google Cloud over the other big players like [AWS](<https://www.aws.com>) and [Azure](<https://www.azure.com>) since I personally find it way more user-friendly and seems cheaper in my opinion. (The main projects I did only used [AppEngine](<https://cloud.google.com/appengine>) in Google Cloud, which has a free tier available)

## How I transferred to Google Cloud

Transferring from Netlify to Google Cloud was actually very easy. To begin with, I set up a CI/CD system using [Cloud Build](<https://cloud.google.com/cloud-build>). Cloud Build integrates perfectly with Github and pulls the latest codebase from the main branch (or any other branch you program it to...), then I set up a build trigger, which means that Cloud Build will start building and compiling my website when a new push is made to the main branch. The compiled files are then placed in a bucket (which is a [Cloud Storage](<https://cloud.google.com/storage>) option that just stores files). The only thing left to do was to make the bucket publicly viewable and point the domain name to the right IP. Easy Right!

## What's next?

If you made it this far, you're probably wondering why I switched, since I didn't give a clear reason. Well, the answer is rather easy.

I'm planning to do some more stuff with this website. At the moment the container / files have to rebuild whenever I upload a new post, which is rather inconvenient since the "real" codebase actually doesn't change. I'm thinking of new ways to serve content, a back-end might be one of the options I'm considering. Another reason is that all my future projects and website probably will be hosted on Google Cloud, so it's easier to get an overview of all websites and projects in one place. Maybe I'm even considering building an API for this website so that likes on posts or a login could be an option, you never know what I'm going to think of next and I just want to be prepared and have all options available.

Thanks For Reading!
