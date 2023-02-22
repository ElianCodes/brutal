---
title: 🚀 Deploying to Firebase using Google Cloudbuild 
pubDate: 08/11/2022 11:45
author: "Elian Van Cutsem"
tags:
  - JavaScript
  - Firebase
  - Cloudbuild
imgUrl: "https://firebase.google.com/images/social.png"
description: Deploying to Firebase can sometimes be somewhat of a hassle if you're using the CLI. There is a better way using some sort of CI/CD, Cloudbuild is the example explained here.
layout: '../../layouts/BlogPost.astro'
---

# Deploying to Firebase using Google Cloudbuild

Yesterday I wrote a blogpost on deploying to Firebase using Github actions, but of course, there are alternatives. Most logically, if you're invested in the Google Cloud ecosystem (Firebase being part of that), you'll be using Cloudbuild. So here is (almost) the same example explained for Cloudbuild.

[Official Google Cloud Build Firebase documentation](<https://cloud.google.com/build/docs/deploying-builds/deploy-firebase>)

## Setting up Google Cloudbuild

First of all you'll need to enable Google Cloudbuild in [the Google Cloud Console](<https://console.cloud.google.com>).

I'll be building three triggers, one for the live site, two for deploy previews. (see yesterdays blogpost for more info)

Start by adding a `cloudbuild` directory in the root of your repository & add a file called `staging.yaml` in there.

### Adding the GCP Firebase builder

Firstly we'll add the Firebase builder to our GCP project using `gcloud`. If you don't know how to setup gcloud, [Here's a guide](<https://cloud.google.com/sdk/docs/install>)

```bash
# Clone the GCP builder
git clone https://github.com/GoogleCloudPlatform/cloud-builders-community.git

# cd into Firebase builder
cd cloud-builders-community/firebase

# Upload the builder
gcloud builds submit --region=YOUR-REGION
```

### Writing the staging workflows

The following example is written for a [NuxtJS](<https://nuxtjs.org>) static website:

```yaml
steps:
  - name: node:lts
    entrypoint: npm
    args: [ 'install' ]
    id: 'Install dependencies'

  - name: node:lts
    entrypoint: npm
    args: [ 'run', 'generate' ]
    id: 'Build the application'

  - name: gcr.io/YOUR-PROJECT/firebase
    args: [ '--project=YOUR-PROJECT', 'hosting:channel:deploy', 'staging' ]
    id: 'Deploy application to staging'
```

*Change your `YOUR-PROJECT` to your Firebase project id, also you might need to change `node-lts` to your preferred version of NodeJS*

Simply explained:

1. We install our dependencies using `npm`
2. We generate our static website
3. We deploy the website to the `staging` channel

> ⚠️ Keep in mind that you'll probably need to change the first two steps to your own framework

> ⚠️ Don't forget to add the correct folder to deploy in your `firebase.json`:
>
> ```json
> "hosting": {
>    "public": "dist",
>    "ignore": [
>      "**/.*",
>      "**/node_modules/**"
>    ]
> },
>```
>

### Adding a trigger

Other then Github actions, you'll need to define a trigger in the Google Cloud Console. You'll get the following screen:

![New GCP Trigger screen](<https://i.imgur.com/yYRVR1F.png>)

Here you'll need to enter the repository, branch, event and location of the cloudbuild file.

Change the `autodetected cloudbuild file` radio to the location: `cloudbuild/staging.yaml` or the name of the cloudbuild file you want to reference.

### Adding IAM roles

Before we push our cloudbuild files, we'll need to add some roles to the default service account of cloudbuild. On the IAM page, search for the account ending on `@cloudbuild.gserviceaccount.com`. Add these roles:

1. API Keys Admin
2. Firebase Admin

![GCP service account overview](<https://i.imgur.com/oYI1zaM.png>)

### Push the files

If you now push your repository to the origin, you should see that cloudbuild started a job building & deploying your repo!

## Other builds

If you're using the same cloudbuild jobs as I do; Then you'll still need to add two more files, but I'm guessing you can do that on your own! Reach out if you need any further help!

Here are mine:

Canary (triggered on pull requests to main)

```yaml
steps:
  - name: node:lts
    entrypoint: npm
    args: [ 'install' ]
    id: 'Install dependencies'

  - name: node:lts
    entrypoint: npm
    args: [ 'run', 'generate' ]
    id: 'Build the application'

  - name: gcr.io/YOUR-PROJECT/firebase
    args: [ '--project=YOUR-PROJECT', 'hosting:channel:deploy', 'canary' ]
    id: 'Deploy application to Canary'
```

Main (on push to main)

```yaml
steps:
  - name: node:lts
    entrypoint: npm
    args: [ 'install' ]
    id: 'Install dependencies'

  - name: node:lts
    entrypoint: npm
    args: [ 'run', 'generate' ]
    id: 'Build the application'

  - name: gcr.io/YOUR-PROJECT/firebase
    args: [ 'deploy', '--project=YOUR-PROJECT', '--only', 'hosting' ]
    id: 'Deploy application'

```
