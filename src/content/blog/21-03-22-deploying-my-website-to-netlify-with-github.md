---
title: 🚀 Deploying my website to Netlify using Github
pubDate: 03/22/2021 17:52 
author: "Elian Van Cutsem"
tags:
  - Netlify
  - TravisCI
  - Nuxt
imgUrl: http://ww1.prweb.com/prfiles/2019/07/09/16429924/netlify.gif
description: I've used github to manage the sourcecode for my website for a long time, github pages came with it. Now I discovered a better way to deploy and host websites.
layout: '../../layouts/BlogPost.astro'
---

# Deploying my website to Netlify using Github

Finding a good host for the right price can sometimes be a pain in the ass. I recently discovered [Netlify](<https://netlify.com>) and started using it for my own website and blog. Netlify has great integration with [GitHub](<https://github.com>) and it's own (simple) CI/CD system.

Netlify has a free plan that doesn't limit your options on a smaller scale. If you need more than the basics, there's a paid plan for every need.

## JAMStack

JAMStack stands for JavaScript, API's & Markup. JAMStack is designed to be very fast since it uses pre-rendering, maintainable and scalable. Of course, this doesn't mean you have to write your whole website in HTML, CSS & JavaScript, but you'll need to use a bundler like [Webpack](<https://webpack.js.org>) or similar. [NuxtJS](<https://nuxtjs.org>) and [NextJS](<https://nextjs.org>) are common JavaScript frameworks used for static site generation.

For further reading, see [jamstack.org](<https://jamstack.org>)

## Deploy with git

Netlify has an easy integration with GitHub that doesn't require any configuration except logging into GitHub. You're also able to use another version control site like [GitLab](<https://gitlab.com>) or [BitBucket](<https://bitbucket.com>). With a paid plan on Netlify, you can also use self-hosted variants of those sites.

If your project is NPM based, the integration between GitHub and Netlify will be seamless and without much configuration.

Before Netlify, I used`elianvancutsem.github.io with [Github Pages](<https://pages.github.com>). It also has it's advantages and features, but Netlify is much more sophisticated. If you want, you can also attach your own domain name to Github Pages, Netlify or [Vercel](<https://vercel.com>) (although Vercel only offers this on a paid plan). One downside of Github pages is that you've got to deploy a branch. So you'll need a dedicated branch with the compiled version of your site there, whereas Netlify and Vercel build on their systems and deploy from there.

## Further features

Netlify offers a lot of features to configure your website and hosting to your needs. Some of them are paid, like analytics, but I tend to use [Google Analytics](<https://analytics.google.com>) for that.

### Forms

Netlify has a built-in form manager, which can easily be enabled. It will handle your form submitions and put them in a list on your dashboard. It's easily accessible by adding `netlify` in your markup form element like the following:

```html
<form name="contact" netlify>
  <p>
    <label>Name <input type="text" name="name" /></label>
  </p>
  <p>
    <label>message</label>
    <textarea name="message"></textarea>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
```

### Deploy previews

One of the features I use a lot on Netlify is the deploy preview. Every time a pull-request is made on your main branch, Netlify will build a merge of the two branches and deploy a preview for you to approve on something like `https://deploy-preview-57--elianvancutsem.netlify.app/`. This also counts as a check on GitHub, so if the build fails, the pull request will fail that check. This feature really comes in handy in combination with something like [Dependabot](<https://dependabot.com/>).

### Other features

There are also a lot of features I haven't used yet like Identity, Large Media and Split testing. Although I haven't used them yet, I can see where they can come in handy. To read more about those, take a look [here](<https://www.netlify.com/products/>).
