---
title: 👽 Use API magic to show your most visited pages
pubDate: 10/04/2021 17:40
author: "Elian Van Cutsem"
tags:
  - API
  - JavaScript
  - Packaging
imgUrl: https://i.pcmag.com/imagery/reviews/04u4r8E0NHva7mQ3Bnozbh6-9.1569482850.fit_scale.size_760x427.jpg
description: A while ago I had an idea for a feature which would show the most frequent visited pages upon a 'page not found' error. After I let it sit for a while, I realized that this might be possible by using the Google Analytics API. Here's a guide.
layout: '../../layouts/BlogPost.astro'
---

# Use API magic to show your most visited pages

A while ago I had an idea for a feature which would show the most frequent visited pages upon a 404 (page not found) error. After I let it sit for a while, I realized that this might be possible by using the [Google Analytics Data API](<https://developers.google.com/analytics>) (which I only discovered in research for this feature).

## Prerequisites

To follow along, you'll need at least some knowledge about building a backend server (could be in any language or framework, but I used [TypeScript](<https://www.typescriptlang.org/>) in combination with [NestJS](<https://nestjs.com/>)) and some general API knowledge.

You'll also need to integrate [Google Analytics](<https://analytics.google.com>) into your website, but you probably guessed that already. (I also won't show that part here)

The code that I used to get the feature working, you can find in [this repository](<https://github.com/eliancodes/ElianCodes-backend>). Feel free to fork or re-use in your own projects!

## Using @elianvancutsem/mostvisitedpages

To fit my personal needs, I built [a package on NPM](<https://www.npmjs.com/package/@elianvancutsem/mostvisitedpages>) to do everything I explain here. This package is ofcourse based on the Google Analytics Data API, but simplifies the API by a lot. If you're looking to customize the Google Analytics Data API a lot, go with that, but if you're like me and just want some simple metrics, take a look at [@elianvancutsem/mostvisitedpages on NPM](<https://www.npmjs.com/package/@elianvancutsem/mostvisitedpages>)

## How to talk with Google Analytics API

[Google Analytics Data API](<https://developers.google.com/analytics/devguides/reporting/data/v1>) has great documentation on how to reference and work with the API, so if this article doesn't fill your needs, be sure to checkout the official documentation and [reference](<https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport>).

If you're like me and want to figur things out yourself, I mainly built the feature using the [Client quickstart guide](<https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries>) and searching on from there.

### Enabling the API

First of all, you'll need to enable the API on google's side. If you're using [Google Cloud](<https://cloud.google.com>), this can be done by going to [the quickstart](<https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries>) and clicking on 'enable the Google Analytics API' button. You'll then get a dialog asking you to download a JSON file with the credentials looking like the following:

```json
{
  "type": "service_account",
  "project_id": "project-xxxxxxxxxx",
  "private_key_id": "xxxxx",
  "private_key": "xxx",
  "client_email": "xxxxxxxx-xxxxxxxxx@project-xxxxxxxx.iam.gserviceaccount.com",
  "client_id": "xxxxxxxxxxxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/xxxxxxxxx-xxxxxxxxxx%project-xxxxxxxxx.iam.gserviceaccount.com"
}
```

As you probably guessed, this file contains all the nessecary info to connect to the API as a service account. When you check the IAM policies in [Google Cloud Console](<https://console.cloud.google.com>), you'll also see this service account registered there.

#### Adding Credentials to GA

Now we need to grant this service account access to your Google Analytics property. You can do this by going to [Google Analytics] and adding the `client_email` to the property with `reading and analyzing` access.

### Install the library

```bash
yarn add @google-analytics/data
```

### Do a testrun

(if you're using the simplified `@elianvancutsem/mostvisitedpages` version, there is a full example in the `README.md` of the package)

```ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export class testRun {
  propertyId: string = process.env.GA_PROPERTY
  analytics: BetaAnalyticsDataClient

  constructor(){
    this.analytics = new BetaAnalyticsDataClient({ credentials: {
      client_email: process.env.GA_EMAIL,
      private_key: process.env.GA_KEY
    }})
  }

  async runReport(): Promise<any[]> {
    const response: AnalyticsPage[] = [];
    const [report] = await this.analyticsDataClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{ startDate: '90daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'fullPageUrl' }, { name: 'pageTitle' }],
      metrics: [{ name: 'engagedSessions' }],
      limit: 4
    });
    report.rows.forEach(row => {
      const record: AnalyticsPage = {
        type: this.defineTypeForPage(row.dimensionValues[0].value),
        title: this.morphTitleForOldHeading(row.dimensionValues[1].value),
        link: row.dimensionValues[0].value,
        views: Number.parseInt(row.metricValues[0].value)
      }
      response.push(record)
    });
    return response
  }
}
```

you could always take a look at [this GitHub file](<https://github.com/eliancodes/ElianCodes-backend/blob/main/backend/src/analytics/analytics.service.ts>) for inspiration.

### Add your correct metrics for your report

You can find a list of [all possible metrics here](<https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics>)
