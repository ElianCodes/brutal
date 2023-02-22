---
title: 💄darkmode in TailwindCSS
pubDate: 02/09/2021 18:11
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - JavaScript
  - Front-end
imgUrl: https://miro.medium.com/max/1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg
description: How to add dark mode support in TailwindCSS
layout: '../../layouts/BlogPost.astro'
---

# Add dark mode to your site with TailwindCSS

I've fiddled arround with [TailwindCSS](<https://tailwindcss.com/>) for some time now, but never got to the point of adding dark mode. But actually it isn't that hard since v2.0.

## Official dark mode documentation

TailwindCSS docs has it's very own dedicated [documentation on dark mode](<https://tailwindcss.com/docs/dark-mode>). So I used it as a guide to setup my application's dark mode.

## Tailwind config

Tailwind disables dark mode in a basic setup to reduce the size of the css-file. To enable it you just have to add `darkMode: 'media'` or `darkMode: 'class'` in your `tailwind.config.js`. In the minimal config it would look like this:

```javascript
module.exports = {
    purge: [],
    darkMode: 'class', // or 'media'
    theme: {},
    variants: {},
    plugins: []
}
```

## 'media' vs 'class'

Dark mode in tailwind is very easy with `media`. It will take the `prefers-color-scheme` of your OS to determine if you're using dark or light mode. Dark mode `class` will use a manual toggle to determine dark or light mode. With `class` you can add the `class` to your html element. You can simply toggle this with JavaScript.

## How to use dark mode in css

It's as simple as just adding `dark:bg-black` to your html classes.

```html
<body class="bg-white dark:bg-black">
    <h1 class="text-black dark:text-white">
        What color am I?
    </h1>
</body>
```

Tailwind will then automagically determine what classes to use.

Above is ofcourse an easy example, but `dark:` can also be stacked to other variants like `lg:` or `hover:`. So in the example below, the text will be black on smaller screens but white on larger screens.

```html
<h1 class="text-black dark:lg:text-white">
    What color am I?
</h1>
```

## Variants

By default Tailwind dark classes are available on background colors, border colors, text colors and a few more. But you can extend tailwind to your needs by configuring `tailwind.config.js`

```javascript
module.exports = {
    // ...
    variants: {
        extend: {
            textOpacity: ['dark']
        }
    }
}
```

## Conclusion

TailwindCSS dark mode is very easy when combined with `@apply` classes and can be extended to your needs. It's easy to configure and can give an extra functionality to your application.

See an example [here](<https://github.com/eliancodes/tailwind-dark-mode-example>) or [here](<https://admiring-wescoff-a17fa9.netlify.app/>).
