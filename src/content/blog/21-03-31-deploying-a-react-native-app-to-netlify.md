---
title: 🚀 Deploying a React Native app to netlify
pubDate: 03/31/2021 18:07 
author: "Elian Van Cutsem"
tags:
  - Netlify
  - ReactNative
  - Expo
imgUrl: http://ww1.prweb.com/prfiles/2019/07/09/16429924/netlify.gif
description: Deploying a mobile application does seem complicated, but Expo makes it very easy!
layout: '../../layouts/BlogPost.astro'
---

# Deploying a React Native app to netlify

For a school project I'm working on, I needed a web version of my application which can be used to pair with the mobile application. Since I didn't want to build two seperate applications, I researched a way that I could have only one codebase that would run on IOS, Android and web platforms. The front-end will fetch an API, so if I wanted, I could use two seperate applications for mobile & web-platforms, but it's so much easier managing all code at once.

My exact setup will be te following:

- [React Native](<https://react-native.com>) front-end
- Back-end will be RESTful, so doesn't really matter what you use
- [Github](<https://github.com>) for version-control
- [Travis CI](<https://www.travis-ci.com/>) to build, test and deploy
- [Netlify](<https://netlify.com>) to host the application

## Starting a React Native application using Expo

Starting a new React Native app using [Expo](<https://expo.dev/>) isn't that hard and is even guided through on [the official documentation](<https://reactnative.dev/docs/environment-setup>).

Firstly, install the `expo-cli` so we can run expo commands:

```bash
yarn -g add expo-cli
```

To then bootstrap a new application we can just simply use

```bash
expo init yourProject
```

Now you have a basic template to get you started, just build your app like you would normally do. Except you have an extra layer upon React Native (which we'll need to publish for the web).

## Building a CI/CD system

If you don't want automatic deploys to you hosting service and don't need to test your code, you can skip this step. `expo-cli` can also be run locally, then you can deploy the `web-build` folder manually using something like `netlify-cli`.

Since the project uses `expo-cli` to build the project, we can't really use the built-in Netlify CI (although there are workarounds like configuring a seperate build/deploy script in your `package.json`). In this example I use Travis CI. I really like the UI and the accessibility of the website, but use [Jenkins](<https://jenkins.io>), [Github Actions](<https://github.com/features/actions>) or any CI/CD system you like. As long as it works for you.

### The configuration

The configuration for Travis isn't really too hard to understand, still I'll explain what happens here.

Basically, we tell Travis to set up 3 build containers. The first two will install [Node.js](<https://nodejs.org>), NPM and the `expo-cli`. Then we'll tell it to install the NPM/Yarn packages and keep the `node_modules` folder in the cache. If those are done, a new job will start that actually builds and deploys the application to the web. We run yarn just to be sure, but since it has the `node_modules` in cache, it'll finish right away and tell you it's up to date. Next, the `expo build:web` command is triggered, which will build our application for web platforms and puts the output in the `web-build` folder which is then published to Netlify. The deploying command also expects two secrets which should be configured as environment variables. `$NETLIFY_ID` is the specific ID of the website you're publishing to on Netlify and `$NETLIFY_AUTH` is the deploy key you generate from the Netlify website which tells Netlify you are authorized to publish to the website mentioned in the `$NETLIFY_ID`. In this example I also tell Travis to only trigger the deploy job on the main branch, but modify that to your liking.

```yaml
# .travis.yml
language: node_js
node_js:
  - node
  - lts/*
cache:
  directories:
    - ~/.npm
    - node_modules
before_script:
  - npm install -g npm@latest
  - npm install -g yarn
  - npm install -g expo-cli
script:
  - yarn
jobs:
  include:
    - stage: deploy website
      script:
        - yarn
        - expo build:web
      deploy:
        provider: netlify
        site: $NETLIFY_ID
        auth: $NETLIFY_AUTH
        dir: "web-build"
        prod: true
        edge: true
        on:
          branch: main
```

## Deploying to Netlify

In this example I used [Netlify](<https://netlify.com>) to deploy the application, but any static hosting service (like [Github pages](<https://pages.github.com>) or [Vercel](<https://vercel.com>)) can be used since Expo will generate a static build of your site. I won't go further here on how you can set up Netlify, since I wrote [a blogpost about that](<https://www.elian.codes/blog/21-03-22-deploying-my-website-to-netlify-with-github/>) before.
