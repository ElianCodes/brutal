---
title: ✨ Using Bun as JavaScript runtime
pubDate: 07/06/2022 11:02
author: "Elian Van Cutsem"
tags:
  - Javascript
  - Bun
  - Runtime
imgUrl: https://bun.sh/share.png
description: Bun is a new runtime for JavaScript & TypeScript, compatible with NodeJS packages and ecosystem.
layout: '../../layouts/BlogPost.astro'
---

# Using Bun as JavaScript runtime

So, this morning I came across a tweet showcasing [Bun](<https://bun.sh/>). Bun is a 'new' runtime for JavaScript built from scratch. It claims to be a lot faster and compatible with NodeJS packages (NPM) and the NodeJS API functions. Let's try that out!

*"Bun's goal is to run most of the worlds JavaScript outside of browsers, bringing performance and complexity enhancements to your future infrastructure, as well as developer productivity through better, simpler tooling."*

## Installing Bun

Installing Bun is a really easy step:

```sh
curl https://bun.sh/install | bash
```

Just like NodeJS, Bun will install dependencies in a folder `node_modules.bun` and create a lockfile called `bun.lockb`, although it will be using the same `package.json` like NodeJS.

## Bun CLI

The Bun CLI comes with some really easy-to-use commands.

Some of them are:

```bash
# Run files
bun run

# Install packages (NPM compatible)
bun install

# Create new apps
bun create

# Upgrade Bun
bun upgrade

# Start Bun devserver
bun dev

# Add dependencies
bun add

# Remove dependencies
bun remove
```

Some of these commands also have shorthands like `bun i` or `bun rm`

More info can be found in [the reference docs](<https://github.com/oven-sh/bun#readme>)

## Using the Bun runtime

When using `bun run`, you can run TypeScript & JavaScript files. The example on their website:

```javascript
// http.js
export default {
  port: 3000,
  fetch(request) {
    return new Response("Welcome to Bun!");
  },
};
```

When running `bun run http.js`, the server will start on `localhost:3000` and respond with "Welcome to Bun!".

## Creating a new app from template

Bun comes out of the box with some templates, these include React, NextJS and a Discord interaction template. It's also possible to use a Github repository as source:

```bash
# Create a Bun React app
bun create react ./react-app

# Create a Bun app from a repository
bun create eliancodes/eliancodes-frontend frontend
```

**Keep in mind that Bun is still in Beta!**

note: At this time, I won't go any deeper in deploying using Bun, maybe something for the future 🤷‍♂️.
