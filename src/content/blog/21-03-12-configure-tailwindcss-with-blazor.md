---
title: 💄 Configure TailwindCSS with Blazor
pubDate: 03/12/2021 17:07
author: "Elian Van Cutsem"
tags:
  - WASM
  - Blazor
  - TailwindCSS
imgUrl: https://i.morioh.com/2019/11/28/428f90dff706.jpg
description: I started a WASM Blazor project and wanted to use TailwindCSS, but it has a lot of configuring to do with it.
layout: '../../layouts/BlogPost.astro'
---

# Configure TailwindCSS with Blazor

I had to make a project for school with [Blazor WASM](<https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor>) and I wanted to use [TailwindCSS](<https://tailwindcss.com>) with it. A new Blazor project is quickly setup, but it uses [Bootstrap](<https://getbootstrap.com/>) out of the box, so how do we configure it to use TailwindCSS?

A little heads up. It's not that easy, if you plan on using the basics, you could also use the [CDN](<https://tailwindcss.com/docs/installation#using-tailwind-via-cdn>), but if you plan on using more advanced features in the configuration like using [Sass](<https://sass-lang.com/>) and `@apply` classes or purging, it's worth it to find a solution.

## Starting a new Blazor project

Starting a new blazor project is very easy to do. First, we have to install the dotnet SDK, which can be done easily [here](<https://dotnet.microsoft.com/learn/aspnet/blazor-tutorial/install>). It's a very straight forward process.

After that, we can bootstrap the default Blazor WASM template by running

```bash
dotnet new blazorserver -o yourAmazingApp --no-https
```

that will create a new directory called `yourAmazingApp` in the location you ran the command in.

Now we can start up the project in watchmode by running

```bash
dotnet watch run
```

## Preparing a package.json

So now we have a basic project, but no Tailwind configuration or even a `package.json` file. Since Blazor isn't really meant to do this stuff, we have to make a workaround, but it works fine.

### Theoretical solution

We can create a little local project with Yarn and use that to download our node_modules. Then we use Webpack to compile and export our `Tailwind.scss` file to a `main.css` file in the `wwwroot/css` folder.

### Adding the package.json file

We create a folder called `assets` in our root directory of our `.csproj`. in that folder, we can run `npm init` or `yarn init`. For the rest of this post I'll use Yarn, but feel free to use NPM, it should also work.

so when we initialize a `package.json` file we can add some dependencies. Below are some I used, but if you're not using Sass, you can leave out some.

```json
"devDependencies": {
    "postcss-import": "^14.0.0",
    "webpack-fix-style-only-entries": "^0.5.1",
    "autoprefixer": "^10.2.4",
    "css-loader": "^3.2.0",
    "mini-css-extract-plugin": "^0.8.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss": "^8.2.6",
    "postcss-easy-import": "^3.0.0",
    "postcss-loader": "^4.2.0",
    "sass": "^1.32.8",
    "sass-loader": "^10.1.1",
    "style-loader": "^1.0.0",
    "webpack": "^4.41.0",
    "webpack-cli": "^3.3.9",
    "webpack-watch-files-plugin": "^1.0.3"
  },
  "dependencies": {
    "postcss-cli": "^8.3.1",
    "postcss-nested": "^5.0.3",
    "tailwindcss": "^2.0.3"
  },
```

Now we have our dependencies installed, we can create some configuration files.

### Configuration files

#### postcss.config.js

the `postcss.config.js` file is used to process tailwind to our custom stylesheet. Here it also imports some other things, but feel free to only add `require('tailwindcss')`.

```js
module.exports = {
    plugins: [
        require('postcss-easy-import')({ prefix: '_', extensions: ['.css', '.scss'] }),
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-nested')
    ]
}
```

#### webpack.config.js

In the `webpack.config.js` file we basically tell Webpack to take our raw  `/assets/scss/tailwind.scss` file and compile it to a `main.css` file and add it to the `wwwroot/css/` folder

```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = (env, args) => ({
    devtool: args.mode === 'development' ? 'source-map' : 'none',
    entry: './scss/tailwind.scss',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'wwwroot/css')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
});
```

#### tailwind.config.js

below is the basic configuration of TailwindCSS without many to it. But from here we can customize it in any way we want like normal.

```js
module.exports = {
    purge: [],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
}
```

## Configure Blazor to use TailwindCSS

So now we have our compiled `main.css` file, but it won't trigger when we build or run our dotnet project. For that, we have to create a separate file called `assets.targets` which will tell our dotnet project to trigger the `package.json` build scripts.

```xml
<Project>

    <ItemGroup>
        <StaticAssets Include="$(MSBuildThisFileDirectory)**" Exclude="$(MSBuildThisFileDirectory)node_modules\**" />
        <UpToDateCheckInput Include="@(StaticAssets)" />
    </ItemGroup>

    <PropertyGroup>
        <StaticCSSPath>scss\tailwind.scss</StaticCSSPath>
    </PropertyGroup>

    <!-- If lockfile has changed, perform a new yarn install -->
    <Target Name="yarnInstall"
            Inputs="$(MSBuildThisFileDirectory)yarn.lock"
            Outputs="$(BaseIntermediateOutputPath)yarn.lock">
        <Message Importance="high" Text="Restoring dependencies using yarn. This may take several minutes..." />
        <Exec Command="yarn" WorkingDirectory="$(MSBuildThisFileDirectory)" />
        <Copy SourceFiles="$(MSBuildThisFileDirectory)yarn.lock"
              DestinationFolder="$(BaseIntermediateOutputPath)"
              SkipUnchangedFiles="true"/>
    </Target>

    <!-- If any source file in this dir or below has changed, perform a Webpack build -->
    <Target Name="BuildStaticAssets"
            DependsOnTargets="yarnInstall"
            BeforeTargets="CoreBuild"
            Inputs="@(StaticAssets)"
            Outputs="$(MSBuildThisFileDirectory)..\wwwroot\$(StaticCSSPath)">
        <Exec Command="yarn build:$(Configuration)" WorkingDirectory="$(MSBuildThisFileDirectory)" />
    </Target>

</Project>
```

now add the build scripts in `package.json` and we're pretty much done.

```json
"scripts": {
    "build:Debug": "webpack --mode development",
    "build:Release": "webpack --mode production"
  },
```

from this point on we can use Tailwind in any way we want. First, we have to add it to our project by modifying our `.csproj` file.

`yourAwesomeProject.csproj`

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  
   // default configuration here ... 
    
  <Import Project="assets\assets.targets" />
</Project>
```

## Run your project

voila! Now every time you run `dotnet build` or debug your project. The scripts will run or at least checked. If everything goes correct, you should see the `main.css` file in your `/wwwroot/css` folder!

Now we can include and use it in our markup

`Pages/_Host.cshtml`:

```html
<head>
    <meta charset="utf-8" />
    <title>YourAwesomeProject</title>
    <link href="~/css/main.css" rel="stylesheet" />
</head>
```

Also don't forget to put that file in your `.gitignore file` otherwise you'll push and pull a file that gets generated, which is useless.
