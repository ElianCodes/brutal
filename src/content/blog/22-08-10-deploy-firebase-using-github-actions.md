---
title: 🚀 Deploying to Firebase using Github actions
pubDate: 08/10/2022 11:26
author: "Elian Van Cutsem"
tags:
  - Firebase
  - Github actions
  - DevOps
imgUrl: "https://firebase.google.com/images/social.png"
description: Deploying to Firebase can sometimes be somewhat of a hassle if you're using the CLI. There is a better way using some sort of CI/CD, Github actions is one example explained here.
layout: '../../layouts/BlogPost.astro'
---

# Deploying to Firebase using Github actions

Deploying to Firebase can sometimes be somewhat of a hassle if you're using the CLI. Your local version may differ from the `main` branch on your repo and maybe you just want to deploy that version. You could manually check out `main` and perform your CLI actions to deploy from there. Of course there is a better way!

## Setting up the Github actions

Github actions can be written in yaml in the `.github/workflows/` directory of your repository. This is the quickest and easiest way!

Most of the time, I tend to use two workflows with Firebase, where the first one deploys preview versions from my `develop` branch and a second that deploys the "live" version from the `main` branch. There are also more possibilies where you add a third one that deploys on a pull request from `develop` into `main` which I tend to call `canary` deployments.

### Writing the staging workflows

The workflow itself isn't that hard, it's basically cloning your repo, building the files and deploying them, however, you'll need to add some secrets from Firebase so Github knows where to deploy to!

The following example is written for an [Astro](<https://astro.build>) SSG website:

```yaml
name: Deploy to the Staging channel

on:
  push:
    branches:
      - develop

jobs:
  build-staging-preview:
    runs-on: ubuntu-latest
    # You can also add environmental secrets (.env)
    # environment: production
    steps:
      - uses: actions/checkout@v2
      - run: npm i -g pnpm@latest
      - run: pnpm i
      - run: pnpm build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT` }}"
          expires: 30d
          projectId: FIREBASE_PROJECT_ID
          channelId: staging
```

As you see above, you'll probably need to update the runs, so the action performs your specific build steps.

You'll see something like below:

![Image of buildsteps in Github Actions](<https://i.imgur.com/GlYNxyc.png>)

But there's a big chance your first action failed by now, since we haven't added any secrets yet.

### Adding secrets

You probably noticed we use `firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"` to tell which Service Account the workflow should use.

To get this service account file, you'll need to head to [the Google Cloud Console](<https://console.cloud.google.com>) select your Firebase project and head to the IAM section.

![Screenshot of Google Cloud Console IAM section](<https://i.imgur.com/PmVslOS.png>)

If you don't have a key yet, click on 'ADD KEY' and select create key (JSON). This will download a Service Account Key.

Now head over to `https://github.com/USERNAME/REPOSITORY/settings/secret`. There you'll have the possibility to create a secret (which we called `FIREBASE_SERVICE_ACCOUNT`). Paste the whole YAML file in their.

Now, when you trigger the workflow, it should work! If you head over to your firebase project, there should be a preview channel called `staging`.

![Screenshot of Firebase console preview channel](<https://i.imgur.com/fHIrSdP.png>)

> ⚠️ Also don't forget to add the rest of your `.env` secrets to Github actions! ⚠  ️

### Production deployment

The Production deployment is actually almost the same as the staging workflow (depending on your commands). This time, just replace the `channelId` to `live` & delete the `expiration`. Be sure to change te `on` action as well!

```yaml
name: Deploy to the Live channel

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy-production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm i -g pnpm@latest
      - run: pnpm i
      - run: pnpm build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          projectId: eliancodes-1632771244788
          channelId: live
```

That's it!
