---
title: ♻️ Using Firebase JSON config for redirects
pubDate: 08/17/2022 22:39
author: "Elian Van Cutsem"
tags:
  - Javascript
  - Firebase
  - Redirects
imgUrl: "https://firebase.google.com/images/social.png"
description: I started out my blog about a year ago, at the time, I didn't really think about a good URL system, which came back biting me in the ass.
layout: '../../layouts/BlogPost.astro'
---

# Using Firebase JSON config for redirects

So, I started my blog a while ago, since then, I've learned a lot about webdevelopment, architecture and design. I started out my blog without any good URL planning, so after about a year, I ended up with this mess of URL's which wasn't really clear. Of course, the 'end user' didn't notice this, since I bundle all my posts on the [blog](<https://www.elian.codes/blog>) index page, but as a developer (and blogger), I couldn't find my way in there anymore.

## The solution

I started searching for a way to manage the URL's without losing any convenience and SEO that exists. All current URL's were indexed by the Google crawling bots, so I couldn't risk to lose that (since they're still generating lots of organic traffic).

A couple of months ago I switched my website over from Google Cloud Buckets to Google Cloud Run and then to Firebase (where it's currently living). Each of them have other ways to define 301 (or redirects). So keep that in mind while trying this out.

The next thing to consider is your framework. SSR frameworks, generally support redirect directly in the code, but a SSG (like [Astro](<https://astro.build>) of course can't).

### Finding a system

I found the best way to order & categorize my blogposts, is by date, so I started using the `YY-mm-dd-blogpost-kebab-case` URL system.

That's the first step, the second step is to actually write the 301 rules that handle the redirects. This can depend on both the framework you're using & the hosting provider. Luckily, Firebase has a very convenient way of defining the rules in the `firebase.json` file.

```json
{
  "hosting": {
    "site": "yourProjectId",
    "public": "dist",
    "ignore": ['...'],
    "redirects": [
      {
        "source": "/blog/1-09-21-setting-up-nuxt-with-pug-and-stylus",
        "destination": "/blog/21-09-01-setting-up-nuxt-with-pug-and-stylus",
        "type": 301
      },
    ]
  },
}  
```

### Switching the old URL's

Here a screenshot of all the URL's switched:

![image of all URL's switched](<https://i.imgur.com/cXDHoYZ.png>)

As you see, there were a lot of URL's to be rewritten, but right now, I'm happy with the result. Don't be fooled, this is a lot of work ( and a lot of manual work)! After this, don't forget to keep an eye on crawlers & indexers, to see if they are encountering any problems, if so, be quick to solve them!
