---
title: 🎤 Less JavaScript, Faster website - Astro
pubDate: 04/20/2022 20:00
author: "Elian Van Cutsem"
tags:
  - Astro
  - Javascript
  - TailwindCSS
imgUrl: https://i.imgur.com/zHKeWzx.jpg 
description: 20th April, I gave a lightning talk at the Full Stack Ghent meetup. This blog post contains my slides as well as some extra accompanying speaker notes.
layout: '../../layouts/BlogPost.astro'
---

# Less JavaScript, Faster website - Astro

20th April, I gave a lightning talk at the [Full Stack Ghent meetup](<https://www.meetup.com/fullstackghent/events/284612742/>). This blog post contains my slides as well as some extra accompanying speaker notes.

My slides can be found over at [slidr.io as well](<https://slidr.io/ElianVanCutsem/astro-less-javascript-faster-website>).

Keep in mind that this was a lightning talk between 4 and 10 minutes long.

Cross posted from <https://www.vbridge.eu/blog/202204-less-javascript-faster-website/>

![Me at the meetup](<https://i.imgur.com/zHKeWzx.jpg>)

👆 Me at the meetup!

## The Slides

![title slide](<https://i.imgur.com/XV7kLnx.png>)
![short introduction](<https://i.imgur.com/6E3bXs6.png>)

So, What is [Astro](<https://astro.build>)?

Astro is a fairly new Static Site Generator started by the folks over at Snowpack. [see Github repo here](<https://github.com/withastro/astro>)

In certain ways it’s very comparable to frameworks like [NextJS](<https://nextjs.org/>) and [NuxtJS](<https://nuxtjs.org>), but other than most JAMStack frameworks, Astro takes another approach at [shipping JavaScript, in other words, as little as possible](<https://astro.build/#more-html-less-javascript>).

When astro first released, it used SnowPack under the hood as a build system, but since Astro version 0.21 it switched to Vite which featured great speed and developer experience improvements. [Blogpost here](https://astro.build/blog/astro-021-release/)

All those combined make Astro insanely fast in production and a very SEO friendly framework out of the box.

![Astro Syntax](<https://i.imgur.com/6DPxxNK.png>)

Astro components can feel a lot like HTML on steroids with a bit of JSX in between.

The cool part is that everything in the frontmatter (which is the area between the dashes at the top) will be server side generated at build-time and rendered as static HTML by default.

As you can see from the codesample above, Astro also natively supports [fetch and top-level await](https://docs.astro.build/en/guides/data-fetching/#fetch-in-astro).

Below the dashes, we write our markup in a JSX-like syntax, Astro supports component imports, variables, props and most of the things you think of with JSX.

The crazy thing here is that Astro will fetch and await the technologies API at build time and output them in the final HTML as a static unordered list with all technologies given by the API.

[More documentation about Astro Component Syntax here](https://docs.astro.build/en/core-concepts/astro-components/)

This of course is great for content that doesn’t change often, for example a blog post, but imagine that the technologies API returned a different output every time and we want to reflect that on our page.

![What when you need clientside](<https://i.imgur.com/CbLNlvM.png>)
![JavaScript rendering answer](<https://i.imgur.com/WXE4CZ5.png>)
![Client rendering](<https://i.imgur.com/r73UVKQ.png>)

So, Let’s take the earlier technologies list “example” and render it dynamically.

We extract the technologies list from the codesample and make it its own Astro component.

It would look like this where the technologies get fetched from an API and then put into a list, which is exactly the same code as earlier but in a separate component or file.

![Partial Hydration](<https://i.imgur.com/q3gd39o.png>)

Next, we import the component into our page and simply tell the astro compiler that we would like to render the content client-side with the [`client:load`](https://docs.astro.build/en/reference/directives-reference/#client-directives) attribute.

The compiler now knows that the component and the list should be rendered by the browser instead of generated at build-time. This is called [Partial Hydration](https://docs.astro.build/en/core-concepts/partial-hydration/).

In production, Astro will add that fetch as JavaScript and won’t render it as static HTML and will fetch the technologies API on every page-load.

Important to note here is that the rest of the components will be rendered statically.

[See the Astro Partial Hydration documentation for more](https://docs.astro.build/en/core-concepts/partial-hydration/)!

![Bring Your Own Framework](<https://i.imgur.com/YxHAF3o.png>)

Another crazy thing about Astro, is that you can combine different front-end frameworks on one page using different components.

This is called an island architecture and isn’t exactly a new approach since it has been done before with things like micro-frontends.

Here you can see that the menu is written in Vue, the content in Svelte and the footer in Preact, but all bundled with an Astro layout. (this is an example from an older version of this very website actually).

In my opinion this isn’t exactly a good developer strategy, but still useful if you have limited time and different developers experienced in different frameworks, or simply want to copy a stack overflow answer from another framework 😉.

The cool thing about this is that (when rendered server-side) this all will output static HTML, so still, no actual JavaScript is shipped in production regardless of the framework that's used to generate the content.

![Layouts](<https://i.imgur.com/pcVK9zR.png>)

Here is what importing components from different frameworks looks like.

you can see that I’ve imported an Astro, a Vue and two React components.

Since Astro version 0.25 you’ll need to install the separate frameworks or [renderers](https://docs.astro.build/en/core-concepts/framework-components/) you want to use like Vue or Svelte as NPM packages and define them in the Astro Configuration file.

The code sample we’re seeing here is also an example of a layout where the contents of the page using this layout will be rendered in the `<slot />` element in the body.

[More about Astro layouts here](https://docs.astro.build/en/core-concepts/layouts/).

![Styling](<https://i.imgur.com/TUvf811.png>)

Astro has full support for CSS preprocessors like Sass or Stylus with a simple NPM install of that preprocessor. [More info here](<https://docs.astro.build/en/guides/styling/#css-preprocessors>)!

It also has integrated support for TailwindCSS and since Astro uses Vite, [PostCSS comes as part of that](<https://docs.astro.build/en/guides/styling/#postcss>).

It also [supports CSS modules](<https://docs.astro.build/en/guides/styling/#frameworks-and-libraries>)!

![Importing Styles](<https://i.imgur.com/TsO1cuq.png>)

Here we see an example of how different stylesheets can be used.

![Markdown](<https://i.imgur.com/b8BsF68.png>)

Another cool thing is that Astro automatically treats every markdown file in the `pages` directory as a full page.

It supports Full Layouts, so that you can style the markdown content.
Other than that, the frontmatter can be used to set variables or import other markdown components.

Note that it automatically comes with a draft feature that prevents the route from being accessed in your final build.

[Astro documentation about Markdown](https://docs.astro.build/en/guides/markdown-content/)
