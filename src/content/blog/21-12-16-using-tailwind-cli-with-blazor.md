---
title: 💄 Using Tailwind CLI with Blazor
pubDate: 12/16/2021 23:16
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - Blazor
  - WASM
description: Last year I wrote an article about using TailwindCSS with Blazor. It was a struggle, since Blazor had to be tricked to install and compile TailwindCSS NodeJS. Now that TailwindCSS launched a new tool, Tailwind CLI, it's time to try it another way!
imgUrl: https://dev-to-uploads.s3.amazonaws.com/i/409qgloh9brwc9eg1ym5.png
layout: '../../layouts/BlogPost.astro'
---

# Using Tailwind CLI with Blazor

Last year [I wrote an article](<https://www.elian.codes/blog/21-03-12-configure-tailwindcss-with-blazor/>) about using [TailwindCSS](<https://tailwindcss.com>) with [Blazor](<https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor>). It was a struggle, since Blazor had to be tricked to install and compile TailwindCSS via PostCSS using [NodeJS](<https://www.nodejs.org>). Yesterday, TailwindCSS launched a new tool called [Tailwind CLI](<https://tailwindcss.com/blog/standalone-cli>). So it's time to revisit trying a combination of TailwindCSS with Blazor!

## Bootstrapping a new Blazor project

### Installing dotnet

First of all, you should install a `dotnet` version on your local system. Since I use windows, I use `choco` to install my dotnet SDK.  
You can also install it from [their website](https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/install).

```bash
choco install dotnetcore-sdk -y
```

Note: I used version dotnet-core 5 for this 'project'

### Making the project

Starting a new project is easy, just put the follow command in your terminal:

```bash
dotnet new blazorserver -o YourAppName
```

now when you enter the `YourAppName` directory, you should be able to start the project in dev mode with `dotnet watch run`.

You should be sent to `localhost:5001` which is the default for dotnet apps. Here you'll see an example welcome page built with bootstrap.

![Example welcome page](https://i.imgur.com/2WmOIaq.png)

## Switching from Bootstrap to Tailwind

### Get rid of Bootstrap

While Bootstrap still is a widely used and good CSS framework, we'll be using TailwindCSS (duh!), so let's delete all files in the `css` directory.

Also delete the `<link>` elements refering to them in `Pages/_host.cshtml`

### Tailwind all the way

Now let's try out Tailwind. First of all we need an executable. The executables can be found on [their GitHub repo here](<https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.0.6>). Be sure to grab the exact one for your OS.

Once the file is downloaded, move it to the current project directory.

![tailwind executable in project directory](https://i.imgur.com/R08wfEI.png)

Now we can make a new config file by running the following command in the project root

```bash
./tailwind init
```

We can now see that a file called `tailwind.config.js` is made in the project root! Yay!

Now let's make a `tailwind.css` file in the `wwwroot/css` directory with the standard Tailwind imports

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Let's compile tailwind into usable CSS

The only thing we need to do now, is build our Tailwind config into browser ready CSS and link it from our HTML.

The TailwindCLI has a command for building and watching the css file. At the moment, we still need to give the entire path to the input and output path, but you can build a seperate script to take care of this ofcourse!

```bash
./tailwindcss -i ./wwwroot/css/tailwind.css -o ./wwwroot/css/output.css
```

If you're working on the CSS, you can add the `--watch` flag to the command above, the CSS wil then recompile on edits.

Note: add your `output.css` file to the `.gitignore` if you're using git, so the file won't get uploaded.

Now let's add the file to `Pages/_host.cshtml` by adding

```html
<link rel="stylesheet" href="css/output.css" />
```

You can now use TailwindCSS as usual!
