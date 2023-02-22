---
title: ✨ Pairing React-native with TailwindCSS
pubDate: 02/20/2021 17:37
author: "Elian Van Cutsem"
tags:
  - TailwindCSS
  - React Native
  - NPM
imgUrl: https://www.troispointzero.fr/content/uploads/2020/03/tailwind-pre.png
description: I wanted to make a react native app with tailwindcss, but couldn't find a template... So I made my own.
layout: '../../layouts/BlogPost.astro'
---

# Pairing React Native with TailwindCSS

For my web & mobile development course @[Odisee](<https://odisee.be/en>) I had to make a mobile app with technologies of my choice. Ofcourse, I made the choice to use [React Native](<https://reactnative.dev/>) since it's very popular, has good documentation and is a good skill to have (and also available with Typescript). I also wanted to be able to use [TailwindCSS](<https://tailwindcss.com>), since I'm pretty proficient at it right now, and is very easy to get started with. For the back-end of the application, I made the choice to use [Deno](<https://deno.land>), but that isn't important right now.

So I went on the search for a easy template to start with (for faster development and results, not because I'm lazy 😉), but I couldn't find any. It seems that React Native doesn't integrate easy with Tailwind, but there exists a NPM package to solve this called [Tailwind-rn](<https://github.com/vadimdemedes/tailwind-rn>). So I tried it out and it seemed very easy to work with.

## Using tailwind-rn

Tailwind-rn is a NPM Package written by @[vadimdemedes](<https://github.com/vadimdemedes>) on Github and published on [NPM](<https://www.npmjs.com/package/tailwind-rn>). It basically enables you to use tailwind classes inside the style attribute in React Native like so:

```jsx
import tailwind from 'tailwind-rn';

const App = () => (
	<SafeAreaView style={tailwind('h-full')}>
		<View style={tailwind('pt-12 items-center')}>
			<View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
				<Text style={tailwind('text-blue-800 font-semibold')}>
					Hello Tailwind
				</Text>
			</View>
		</View>
	</SafeAreaView>
);
```

This of course is very nice and what I wanted. But ofcourse it would be cleaner and easier if you could use a custom `tailwind.config.js` file to configure tailwind in the React Native application. It seems also that is possible with Tailwind-rn, but I haven't played around with it yet, but I'll sure do so soon.

## Building my own template

So, I tought that it could be useful to create a React Native template out of this. Since I looked for it, others must be too.

A React Native template is actually very easy to install and use. Just run 

```bash
npx react-native init yourApp --template react-native-template-typescript
```

and it will automatically download the template from NPM (altough installing a template can also be done via `file://`, `https://` or `git://`) and install it on your local machine.

To build my own template, I just downloaded the original template and modified it to use the tailwind-rn package. Configured the `package.json` and `template.config.js` files and published it to NPM.

## Publishing the package

I never published a package to NPM, so there was a bit of a learning curve. But it wasn't that hard once I had setup everything right.

The final packages are available [here](<https://www.npmjs.com/package/react-native-template-tailwind>) and the typescript variant is available [here](<https://www.npmjs.com/package/react-native-template-ts-tailwind>).

To install my templates you can choose between two variant where one uses typescript and the other doesn't.

For jsx version:

```bash
npx react-native init yourApp --template react-native-template-tailwind
```

For tsx version:

```bash
npx react-native init yourApp --template react-native-template-ts-tailwind
```

Maybe I'll make a template that uses the "more advanced" version of TailwindCSS with a custom `tailwind.config.js` one day.

I hope some people get some value out of the package!
