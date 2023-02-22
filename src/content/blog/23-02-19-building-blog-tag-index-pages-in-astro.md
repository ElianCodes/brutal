---
title: ✨ Building Blog tag index pages in Astro
author: Elian Van Cutsem
pubDate: 2023-02-19 18:37
tags:
  - Astro
  - JavaScript
  - Blog
description: I wanted to add blog tag collection pages to my website. This way, people could filter on tags I used in my blog posts. Here is a guide on how I implemented it.
imgUrl: https://i.imgur.com/Dpkd1vd.png
layout: "../../layouts/BlogPost.astro"
---

# Building blog tag index pages in Astro

When I was rebuilding my website with the 2023 redesign. I wanted to add blog tag collection pages as well. This way, people could 'filter' on tags I used in my blog posts. I wanted to do this in a way that was easy to maintain and didn't require me to write a lot of code. So I got hacking on it and found a very neat solution to do this. Here's a little guide on how I implemented it.

## The goal

The idea is to generate dynamic pages based on the tags put on the frontmatter of my blogposts. So that the user can search or filter on a tag and get a list of all related blogposts to that tag.

The blogpost frontmatter validation:

```js
import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		author: z.string(),
		tags: z.array(z.string()),
		description: z.string(),
		pubDate: z.string().transform((str) => new Date(str)),
		imgUrl: z.string(),
		draft: z.boolean().optional().default(false),
	}),
});
```

As you can see in the codeblock above, the tags are an array of strings. Which means one blogpost can contain multiple tags and one tag can have multiple blogposts.

## Building the dynamic page

Of course, tags are dynamic, so the first thing is to build a page with the `getStaticPaths()` method in Astro. In my case, that dynamic page is `/blog/tags/:tag`. The `getStaticPaths()` in Astro should always return a an object that looks like this:

```js
return {
  params: { /* ... */ },
  props: { /* ... */ },
};
```

In my case, that means that the `params` object should return the tag string itself and the prop should return an array with all blogposts related to that tag.

Let's start with getting all tags and build the static pages:

```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const allPosts = await getCollection('blog');

  const tags: string[] = [];

  // using .toLowerCase() here to get rid of case sensitivity
  allPosts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tags.push(tag.toLowerCase());
    });
  });

  // using a new array from a set, we can get rid of duplicate tags 
  return Array.from(new Set(tags)).map((tag) => {
    return {
      params: { tag },
      // only keep the blogposts that contain the tag itself
	  props: {
	    blogposts: allPosts.filter((post) => post.data.tags.map(tag => tag.toLowerCase()).includes(tag)),
	  }
    };
  });
}
---
```

Now, when we build the project, all of the tags get specific pages generated for them. with one prop called `blogposts`. I'm using the Astro v2.0 Content Collection API, but you can use `Astro.glob()` as well.

## Adding the page layout and markup

Now that are pages get generated, we want to display something when the user enters that page. We can define what the dynamic page should look like below the frontmatter.

Also don't forget to add your `Astro.props` object for the page itself.

```astro
---
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

import Layout from '../../../layouts/YourLayout.astro';

export async function getStaticPaths() {
  const allPosts = await getCollection('blog');

  const tags: string[] = [];

  allPosts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tags.push(tag.toLowerCase());
    });
  });

  return Array.from(new Set(tags)).map((tag) => {
    return {
      params: { tag },
      props: {
        blogposts: allPosts.filter((post) => post.data.tags.map(tag => tag.toLowerCase()).includes(tag)),
      },
    };
  });
}

interface Props {
  tag: string;
  blogposts: CollectionEntry<'blog'>[];
}

const { blogposts } = Astro.props;
---
<Layout>
  <main>
	<ul>
	  { blogposts.map(post => (
	    <li>
	      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
	    </li>
	  ))}
	</ul>
  </main>
</Layout>
```

This should now display your layout with a list of all blogposts related to the tag!

Keep in mind you should still customize this page to fit your needs, otherwise it's kinda ugly.

If you're interested on how I implemented this on [my own website](<https://www.elian.codes>), you can always take a peek into [the source code](<https://github.com/eliancodes/eliancodes-frontend>).
