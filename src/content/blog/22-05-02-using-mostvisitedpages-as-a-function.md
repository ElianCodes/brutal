---
title: 📈 Using mostvisitedpages as a serverless function
pubDate: 05/02/2022 23:28
author: "Elian Van Cutsem"
tags:
  - Analytics
  - Firebase
  - JavaScript
description: I've moved from a regular RESTful API to serverless functions. Here is a little guide and explanation on why & how I did that.
imgUrl: https://uniqueideas.com/wp-content/uploads/2018/11/google-cloud-functions.png
layout: '../../layouts/BlogPost.astro'
---

# Using @elianvancutsem/mostvisitedpages as a serverless function

I've moved from a regular RESTful API to serverless functions. Here is a little guide and explanation on why & how I did that.

So the [`@elianvancutsem/mostvisitedpages`](https://www.npmjs.com/package/@elianvancutsem/mostvisitedpages) is a NPM package I wrote sometime ago to basically return your most visited pages fetched from Google Analytics.

At the time I wrote a complete API in [NestJS](https://nestjs.com/) with just a simple `/analytics` endpoint which would handle the Google Analytics part. (there were of course some other endpoints as well, but I won't go deeper into them right now, maybe in the future...)

## Why?

My main reasons for migrating to serverless functions instead of a full fetched container are

1. no shared resources anymore
2. code splitting / single responsibility
3. better DX
4. way, way faster
5. Lower costs

I also migrated my website itself from Google Cloud Storage to [Firebase](https://firebase.com) hosting, which is basically the same functionality, but Firebase has the advantage of managing everything on a smaller interface.

That includes analytics, storage, functions, databases, authentication and hosting. All of those on one page with a quick overview. This is (speaking for myself here) a better developer experience.

Of course, if you're in need of a bigger project, [Google Cloud](https://cloud.google.com) is still the way to go.

### Astro

Now, one of the other reasons I wanted to migrate to serverless functions, is that my main website uses [Astro](https://astro.build). Astro has the option to fetch API's at build-time instead of every page load. So for data that doesn't change frequently, like your most visited pages, this is ideal. If you then only need to fetch a simple function instead of spinning up a whole container, you save on resources, time and money.

Sounds great no?

## initiating functions

The functions I'm writing here, are all written in JavaScript (or TypeScript for that matter), but be aware that there are more function runtimes on Google Cloud (but not Firebase), like Go, Java or even PHP. (full list [here](https://cloud.google.com/functions/docs/concepts/exec))

You can setup a new functions project by running:

```bash
npm i -g firebase-tools

firebase init --functions
```

This will ask you some questions, like JavaScript or TypeScript, what project and so on.

If you're not yet authenticated in firebase, run `firebase login` before initializing the functions.

## Writing functions

Basically, each exported function from a file (like `index.js`), is deployed as a separate Firebase function.

```ts
import {HttpsFunction, https, Request, Response} from "firebase-functions";

export const yourFunction: HttpsFunction = https.onRequest(
  async (req: Request, res: Response) => {
    // our main code goes here
    res.status(200).send();
  }
)
```

A little trick to manage more functions, without having them all in one file, is to do the following:

```js
// analytics.js
export const analytics = https.onRequest(
  async (req: Request, res: Response) => {
    // analytics endpoint
    res.status(200).send();
  }
)

// technologies.ts
export const technologies = https.onRequest(
  async (req: Request, res: Response) => {
    // technologies endpoint
    res.status(200).send();
  }
)

// index.js
import {technologies} from "./technologies";
import {analytics} from "./analytics";

export {
  technologies,
  analytics,
};
```

These functions will get deployed as two separate Firebase functions.

## Testing functions

Functions can be tested locally by running the `npm run serve` command.

This will spin up some local ports with your functions, logs and an emulator to manage and overview it all.

Really neat!

## Deploying functions

```bash
firebase deploy --only functions
```

keep in mind that the `--only functions` here, is used to only deploy functions in case you have configured other firebase things, like storage, as well.

Till the next!
