---
title: ✨ Using Valet for local PHP development
pubDate: 02/12/2021 20:48
author: "Elian Van Cutsem"
tags:
  - Laravel
  - Valet
  - PHP
imgUrl: https://res.cloudinary.com/redfern-web/image/upload/v1598516539/redfern-dev/png/valet.png
description: Valet is a highly configurable MacOs tool for webdevelopment running in the background
layout: '../../layouts/BlogPost.astro'
---

# Using Laravel Valet for local PHP development

This week I've been developing PHP and Twig at my internship at [vBridge](<https://vbridge.eu>), since we're using a big pile of sourcecode, Docker doesn't perform as well. To fix this [Bramus](<https://www.bram.us>) told me about a tool called Valet. So I went on the search to configure and install Valet.

## Installing Valet

Installing Valet is actually really easy. They have incredible [documentation](<https://laravel.com/docs/master/valet>) (as usual with Laravel).

You can simply install it by using `composer global require laravel/valet` if you've installed [Homebrew](<https://brew.sh/>), PHP and [Composer](<https://getcomposer.org/>), else you should install those first (but also that is very easy). Once that's done, simply run `valet install` and Valet will install and start.

Now that valet is installed and started you'll be able to ping any `.test` domain and it'll answer from `localhost` or `172.0.0.1`.

Valet also starts when you boot your computer and will run as a background process with only 7mb of RAM!

*Also, Valet is MacOS only*

## Valet Link

So installing is easy, so mapping a domain shouldn't be hard right! just cd into the directory you want to run as a site and run `valet link` and the name of the directory will be used as domain. For insance:

```bash
cd laravelsite
valet link
```

Now when you open your browser and go to `laravelsite.test`. It will magically appear on the screen! awesome right!

You can also name a link by running `valet link <name>`. For instance:

```bash
cd laravelsite
valet link newsite
```

Now it's available at `newsite.test`

It's amazing!

## Valet use

So, imagine that you're developing a website on your local machine with the newest version of PHP, but the server you'll be deploying to uses a much older PHP version. You don't want to put in the work to install a new old version right? Valet got you covered!

Just run `valet use php@version` and valet will use that version. If you don't have the version installed locally, it will install it for you.

But ofcourse, [sphp](<https://github.com/sgotre/sphp-osx>) is a valid choice too.

## Valet Secure

Tired of the stupid browser notification that localhost isn't secured? Me too. Valet also has a nifty solution. Run `valet secure <name>`x and it will install a certificate for you.

It's insane how easy this all is!

## valet-env.php

Ofcourse if you're a somewhat more demanding user. It can be interesting to use and create custom environment variables.

Valet has support for a file called `valet-env.php` and will use it to configure and use environment variables

For instance:

```php
<?php

return [
 'newsite' => [
  'APP_ENV' => 'dev',
 ],
];
```

Now when you'll open `newsite.test` in your browser, it'll have the dev environment!

Read the post about environment variable from Bramus [here](<https://www.bram.us/2019/01/17/laravel-valet-environment-variables/>)

Read the [full documentation here](<https://laravel.com/docs/master/valet>)!
