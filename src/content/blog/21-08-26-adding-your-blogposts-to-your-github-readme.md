---
title: 📝 Add your blogposts to your Github README
pubDate: 08/26/2021 11:48
author: "Elian Van Cutsem"
tags:
  - Workflows 
  - Github
  - JavaScript
imgUrl: https://docs.github.com/assets/images/help/repository/profile-with-readme.png
description: Github profile README's are a very cool and personal way to tell something about yourself. One of the downsides to this is that it depends on a static format. Well, this is not necessarily true. Through the power of code and Github Actions, we can use JavaScript and generate a static file.
layout: '../../layouts/BlogPost.astro'
---

# Add your blogposts to your Github README

Github profile README's are a very cool and personal way to tell something about yourself  or your code. One of the downsides to this is that it depends on a static format. Well, this is not necessarily true. Through the power of code and Github Actions, we can use JavaScript (or another language) and generate a static `README.md` file. Here's a little guide on how I added my latest blogposts to [my Github profile](https://github.com/eliancodes).

## What's a Github README

Usually a README is created in a repository to explain what is does or to write some documentation about the project. Github introduced this some time ago to also work on Github Personal Profiles. At the moment the README doesn't work yet on business and organisation accounts. You can check out [the Github profile README page on their own documentation site here](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme).

A Github profile README is a cool way to tell something about yourself. It can contain some links to your social accounts or a simple "about me" section. Basically, since it's written in [Markdown](https://www.markdownguide.org/), it can be anything you want it to be. Markdown has some cool features, it can also contain HTML tags, so you could use it to show of some of your cool HTML-table skills like its 1997.

Now, it's cool to build a static Markdown `README.md`, but it's even cooler to write some code that generates your README with Github Actions or similar.

### What is Github Actions

[Github Actions](https://github.com/features/actions) is a CI-CD to build, test and deploy your code right from your repository on Github. Building a workflow on Github Actions is really easy. It's nothing more than just a simple `.yml` file in the `.github/workflows` folder in your repository. If you need more information about what Github Actions is, you can check [their own website](https://github.com/features/actions).

## How can we generate a README with code

In the following section I'll use JavaScript to demonstrate how to generate a README file, but it basically could be any language as long as your workflow in Github Actions supports it.

### Theoretical solution

Actually it's not that hard. We can create a template file called `README.raw.md`or something similar and read it in our code. Then we can use a script to manipulate the content inside the template and write it back as a static `README.md` file.

### Build your template

Here I'll use a simple example, feel free to go crazy and make the sickest things!

You'll need some kind of way to show that something is a variable, so lets use a simple syntax:

```markdown
# My Github README

Hello there! I'm {{name}} and I'm {{age}} years old
```

a markdown processor would display it right as it's written, but by using code, we can replace the variables.

### Write the code

First of all, create a file `index.js` in the root of your repository and add something like this:

```jsx
const { promises: fs } = require("fs");
const path = require("path");

// Read the template and store it as a variable
async function main() {
    const template = (
        await fs.readFile(path.join(process.cwd(), "./README.raw.md"))
    ).toString("utf-8");
}
main();

// Creating a simple object to use
const elian = {
    name: "Elian",
    age: 21
}

// Inject the content
const staticReadme = readmeTemplate
    .replace("{{name}}", elian.name)
    .replace("{{age}}", elian.age)

// Let's write the file
await fs.writeFile("README.md", staticReadme);
```

Now, when you run `index.js` it will output a static file `readme.md` with the replaced variables.

### Create a workflow

create a new workflow file under `.github/workflows/readme.yml`

```yaml
name: Dynamic README
jobs:
  inject:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Inject Variables
        uses: actions/setup-node@v1
        with:
          node-version: 14.6.0

      - run: yarn
        
        # Lets run the index.js
      - run: node index.js

        # Push the static file
      - name: Add to git repo
        run: |
          git config pull.rebase false
          git pull
          git add .
          git config --global user.name "Your Name"
          git config --global user.email "Your E-Mail"
          git commit -m "[Automated] README updated with variables"
      - name: Push
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Add blogpost list using Github Actions and no code

### Fetch your blogposts using RSS

While researching a way to display my own blogposts on my README, I came across a cool bot called "Blog Post Workflow", [link to marketplace here](https://github.com/marketplace/actions/blog-post-workflow). This bot will basically fetch the RSS feed of any blog you want it to and place the latest blogposts and links in your `README.md` file. To do this it also uses a Github Actions workflow, so you can integrate it with your own workflows.

### Prepare your README

It's really easy to use, firstly you just put an HTML comment in your README file as follows:

```markdown
## My cool blog posts

<!-- BLOG-POST-LIST:START -->

<!-- BLOG-POST-LIST:END -->
```

The bot will basically use the comments as a guide on where to place the list of your blogposts.

### Set up the workflow

Now that you've told the bot where to add the blogposts, let's create the workflow

Create a new file `.github/workflows/.blogposts.yml` and add the following contents:

```yaml
# Name can be anything you want
name: Latest blog post workflow
on:
  schedule: # Run workflow automatically
    - cron: '0 * * * *' # Runs every hour, on the hour
  workflow_dispatch: # Run workflow manually with a trigger
jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: gautamkrishnar/blog-post-workflow@master
        with:
          # you can change this to your own RSS feed
          feed_list: "https://www.elian.codes/blog.xml"
```

When this workflow is committed and pushed to your repository, it will search for an update every hour and make changes to the `README.md` file accordingly.

```markdown
  ## My cool blog posts

  <!-- BLOG-POST-LIST:START -->
+ - [🥳 Describe your commits using Gitmoji](https://www.elian.codes/blog/20-08-21-describe-your-commits-using-gitmoji/)
+ - [🚀 Using Surge.sh to quickly deploy a static site](https://www.elian.codes/blog/using-surge-to-quickly-deploy-a-static-site/)
+ - [✨ Moving on from Netlify to Google Cloud](https://www.elian.codes/blog/moving-on-from-netlify-to-google-cloud/)
+ - [💄 Adding Google Fonts to your NuxtJS site](https://www.elian.codes/blog/adding-google-fonts-to-your-nuxtjs-site/)
+ - [💄 Writing your own style components with TailwindCSS and Sass](https://www.elian.codes/blog/writing-your-own-components-with-tailwind-sass/)
  <!-- BLOG-POST-LIST:END -->
```

### Some extra configuration options

Out of the box, the bot will fetch the latest 5 posts and sort them on time created, but if you want it to do other stuff, you can. Here's a little list on options:

- `feed_list`: give it more than one RSS feed to fetch
- `max_post_count`: how many posts to fetch
- `readme_path`: where is the file located?
- `disable_sort`: disables default sorting

For more options, check [the marketplace page](https://github.com/marketplace/actions/blog-post-workflow).
