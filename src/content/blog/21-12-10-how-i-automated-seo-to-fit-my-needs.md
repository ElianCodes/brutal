---
title: 🔍 How I automated SEO to fit my needs
pubDate: 12/10/2021 18:27
author: "Elian Van Cutsem"
tags:
  - SEO
  - Astro
  - Webdevelopment
description: It's been some time since I started writing posts and articles about programming and related. Since the start, I've always invested time in SEO, over time, I have integrated a system that now works for me. This is an explanation how I did that.
imgUrl: https://www.swifttech.com.np/blog/wp-content/uploads/2022/12/What-is-SEO.png
layout: '../../layouts/BlogPost.astro'
---

# How I automated SEO to fit my needs

It's been some time since I started writing posts and articles about programming and related topics. Since the start, I've always invested a lot of time in SEO, over time, I've integrated a system that now works for me. This is an explanation how I did that.

When I first started writing, I used the [NuxtJS](<https://nuxtjs.org>) framework with [Nuxt Content](<https://content.nuxtjs.org/>), Nuxt has a very good [SEO guide and toolset](<https://nuxtjs.org/docs/features/meta-tags-seo/>). These enabled me to write my own system when I switched to [Astro](<https://www.astro.build>)

The following is more of a theoretical explanation rather than real code samples. It will include them, but they can differ depending on frameworks or languages you are using in your projects.

## Meta tags

Meta tags are the start of everything for a crawler. That's why I implemented a "frontmatter" to the markdown pages I use to write my blogposts. The frontmatter contains a couple of things:

```markdown
---
title: 🔍 How I automated SEO to fit my needs
createdAt: 12/10/2021 18:27
author: "Elian Van Cutsem"
tags:
  - SEO
  - Astro
  - Webdevelopment
description: How I automated SEO to fit my needs
imgUrl: http://marketingupdate.nl/wp-content/uploads/2020/05/SEO-Pillar-Post-Art-.png
longDescription: It's been some time since I started writing posts and articles about programming and related. Since the start, I always invested time in SEO, I integrated a system that now works for me. This is an explanation how I did that.
layout: '../../layouts/BlogPost.astro'
permalink: '12-10-21-how-i-automated-seo-to-fit-my-needs'
---
```

**Yes, this is the exact frontmatter of this very page!**

Let's take a look at what the frontend means and how the properties get used for SEO:

- title: is used as the `<title>` element in the HTML output and RSS feed
- createdAt: used to fix the order on the blog overview and order in the RSS feed
- author: used in the RSS feed, but also handy if I wanted to quote or invite other writers to use my blog
- tags: a list of relevant tags, put in the meta of the HTML output and added to the RSS feed
- description: same as the `title` property, but without the emoji
- imgUrl: used as a social image when my article is shared or previewed in an RSS reader
- longDescription: a relevant short description of the article, mostly the first paragraph
- layout: defines the (astro) layout the blogpost should use, so I can change it when needed
- permalink: used to fix and create a useful (sometimes shorter) link to the article

When these are converted to HTML at build-time, the `<head>` element will look something like this:

```html
<!-- Primary Meta Tags -->
<title>🔍 How I automated SEO to fit my needs</title>
<meta name="title" content="🔍 How I automated SEO to fit my needs" />
<meta name="description" content="It's been some time since I started writing posts and articles about programming and related. Since the start, I always invested time in SEO, I integrated a system that now works for me. This is an explanation how I did that." />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.elian.codes/blog/12-10-21-how-i-automated-seo-to-fit-my-needs" />
<meta property="og:title" content="🔍 How I automated SEO to fit my needs" />
<meta property="og:description" content="It's been some time since I started writing posts and articles about programming and related. Since the start, I always invested time in SEO, I integrated a system that now works for me. This is an explanation how I did that." />

<!-- Twitter -->
<meta property="twitter:url" content="https://www.elian.codes/blog/12-10-21-how-i-automated-seo-to-fit-my-needs" />
<meta property="twitter:title" content="🔍 How I automated SEO to fit my needs" />
<meta property="twitter:description" content="It's been some time since I started writing posts and articles about programming and related. Since the start, I always invested time in SEO, I integrated a system that now works for me. This is an explanation how I did that." />
```

## RSS

An RSS feed might seem like an outdated technology for some, but let me tell you that it isn't. It's still commonly used to track different blogs and is way easier than having 20 bookmarks in your browser!

There are several RSS-generators available for almost every framework, so you should be able to get this working without to much of a hassle.

An RSS generator and feed can be broken down into fetching your posts or pages and transfering the raw content into RSS-readable content by the generator.

Here an example of an RSS feed:

```xml
<rss version="2.0">
  <channel>
    <title>
      <![CDATA[ Elian Van Cutsem ]]>
    </title>
    <description>
      <![CDATA[ Programming and Frontend related articles ]]>
    </description>
    <link>https://www.elian.codes/blog.xml</link>
    <language>en-us</language>
    <item>
      <title>
        <![CDATA[ 💄 Use TailwindCSS with Sveltekit (2021) ]]>
      </title>
      <link>https://www.elian.codes/blog/12-05-21-use-tailwindcss-with-sveltekit-2021/</link>
      <description>
        <![CDATA[ Earlier this week, Sveltekit beta got released, ofcourse I wanted to fiddle with it. ]]>
      </description>
      <pubDate>Sun, 05 Dec 2021 22:45:00 GMT</pubDate>
    </item>
    <item>
      <title>
        <![CDATA[ 🔧 Set your NodeJS version in Netlify ]]>
      </title>
      <link>https://www.elian.codes/blog/12-03-21-set-your-node-version-in-netlify/</link>
      <description>
        <![CDATA[ A couple of times I needed to fix the NodeJS version on a Netlify site, I found myself googling it a couple of times, so this little how-to is basically a note-to-self. ]]>
      </description>
      <pubDate>Fri, 03 Dec 2021 08:25:00 GMT</pubDate>
    </item>
  </channel>
</rss>
```

RSS is mostly generated as XML, but can also be JSON or ATOM

## Images & Icons

### Icons

A recognizable favicon is an important step when building or designing a website. These days, most browsers automatically search for `/favicon.ico` to set as a favicon, but different formats are also possible (png's, svg's, ...). To set these, I mostly tend to use the following template:

```html
<!-- icon Metadata -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">

<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
<meta name="theme-color" content="#6ee7b7">
```

There are a lot of helpful icon generators online that will output your given icon in the right formats.

### Images

Images are eye candy, choosing an image that fits your post and will appear everywhere when your post is shared is hard, but really important! People are always more tempted to click on your links when they appear (cfr: Twitter) as images! To do this, just set some simple `meta` tags in your `<head>` element of the page.

```html
<!-- Open Graph / Facebook -->
<meta property="og:url" content="https://www.elian.codes/blog/12-10-21-how-i-automated-seo-to-fit-my-needs" />
<meta property="og:image" content="https://www.elian.codes/assets/img/social.jpg" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:image" content="https://www.elian.codes/assets/img/social.jpg" />
```

Currently I'm building/writing my own social image generator in Go to adjust the title and color dynamically based on the HTML-page title and such! Once that's finished and published, I'll share a post on how it works!

This will result in something like this:

![example social image](https://i.imgur.com/OyszxOE.png)

## Google Search Console & sitemap

Of course, analytics and insights into your site performance are very useful. To track those, I mostly use the Google ecosystem of SEO-tools.

### Sitemap

One of the easiest things to implement is a sitemap. A sitemap allows Google and other search engines/crawlers to see what pages your website has. When the sitemap gets updated, Google (or another search engine) will try to index and crawl the new pages (except when disallowed by `robots.txt`).

(Oh yeah, your RSS feed can serve extra as a sitemap too (but never should replace one)!)

### Search Console

Google Search Console is a very handy tool which can give you a better understanding on how your website performs. Not only does it work very well together with Google Analytics, but also gives more insights into who searched what terms when a page of your website was shown in their search results.

In Google Search Console, you also have access to a tool called "Links", where they show you what pages on the internet contains links to yours. This is very helpful to track who's interested in your content or refering to it.

![My websites performance last three months](https://i.imgur.com/xAbiLrC.png)

Not that long ago, they also launched a new tool called "Search Console Insights", which is a tool designed for content creators to follow up on new content. In the UI of Insights, you'll see how many traffic you got and where they came from, which is great for a quick follow up on your article during a toilet visit.

### `robots.txt`

A `robots.txt` file is a simple representation of what pages a search engine or crawler is allowed to index.

Its a very small and simple representation where you disallow certain directories or pages from a specific or all search engines. It also can include your hostname and sitemap so every crawler knows what to look for and where to find it.

Here's the `robots.txt` of [elian.codes](<https://www.elian.codes/>)

```
User-agent: *
Disallow: 
Host: https://www.elian.codes/
Sitemap: https://www.elian.codes/sitemap.xml
```

## Crossposting

Since I started writing posts, I wasn't sure that the posts I wrote would get any traction. I did some research and noted that [Dev.to](<https://www.dev.to>) has a functionality where it can fetch your posts from RSS and cross-post them on their website. In the details of the post it describes the original (canonical) link, so people still see your website and your website still gets chosen above theirs by crawlers, but people already on Dev.to are more likely to find your post. A win-win situation!

Since I first started writing posts on this website, I always invested in SEO and I feel that it does it's job well!

In the last three months, 92% of my website traffic came from organic search
