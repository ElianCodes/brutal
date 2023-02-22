---
title: 💄 Using KonvaJS as canvas with React
pubDate: 03/11/2021 21:47 
author: "Elian Van Cutsem"
tags:
  - Konva
  - React
  - Canvas
imgUrl: https://images.opencollective.com/konva/2568cd7/background.png
description: I was in need for a HTML canvas that was easily integratable with React or JavaScript, then I found Konva
layout: '../../layouts/BlogPost.astro'
---

# Using KonvaJS as canvas with React

While running my internship at [vBridge](<https://www.vbridge.eu>) I'm working on a front-end based project, building a usable interface for users and needed a HTML canvas for that. Of course I couldn't just use any kind of canvas or a normal HTML canvas. I needed to render different shapes or colors based on the specific situation the user is encountering. The project uses React to begin with. So the search for a usable canvas package with React started.

## Packages that I found

While doing some research I came across some packages that all could have been a valid choice. The packages that stood out the most to me were:

- [Konva](<https://konvajs.org>)
- [GoJS](<https://gojs.net>)
- [React art](<https://github.com/reactjs/react-art>)
- [React Canvas](<https://github.com/Flipboard/react-canvas>)

Of course there's also the standard HTML canvas which you can read more about [here](<https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API>)

There are probably a lot more available, but these are the ones that I found the most documentation of. Why I chose Kova, you can read below.

## Why use Konva

So I went with Konva. Basically it would be easier to explain why I didn't went with the other ones. I chose not to use React Art because it isn't reactive and that is ofcourse one of the main aspects I'll be needing. React canvas would have been a valid choice as well. It allows you to draw DOM-like elements on the canvas, but is not as easy to draw graphics, that's where Konva and GoJS come in. Both are about drawing graphics in a performant way on the canvas. Konva integrates very easy with React since it has a specific React package called [react-konva](<https://konvajs.org/docs/react/index.html>). Also, GoJS is not free-to-use in a production environment, so if I were to use GoJS, I had to explain to superiors why I needed to spend money. Since the differences are small, I chose Konva. There you have it.

## Differences between KonvaJS and react-konva

So what's the difference between the 'normal' Konva and react-konva packages. Well basically you can use Konva components in react-konva like so:

```jsx
import React from 'react'
import Konva, { Stage, Layer, Text, Rect, Circle } from 'react-konva'

const App = () => {
    return (
        <Stage>
            <Layer>
                <Text text="hello from Konva"/>
                <Rect fill="red" height="50" width="50"/>
                <Circle fill="red" radius="60"/>
            </Layer>
        </Stage>
    )
}

export default App
```

Where this would translate in pure KonvaJS without react as follows

```html
<html>
    <body>
        <div id="container">
        </div>
        <script src="https://unpkg.com/konva@7.0.3/konva.min.js"></script>
        <script>
        // first we need to create a stage
        var stage = new Konva.Stage({
        container: 'container',   // id of container <div>
        width: 500,
        height: 500
        });

        // then create layer
        var layer = new Konva.Layer();

        // create our shape
        var circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 50,
        fill: 'red',
        });

        // add the shape to the layer
        layer.add(circle);

        // add the layer to the stage
        stage.add(layer);

        // draw the image
        layer.draw();
        </script>
    </body>
</html>
```

code example from [kanvajs.org](<https://konvajs.org/docs/overview.html>)

Ofcourse the React version is way easier! Konva also offers a lot of other features like:

- Exporting to image
- exporting all elements to SVG
- events

## events in konva

```jsx
import React from 'react'
import Konva, { Stage, Layer, Circle } from 'react-konva'

const App = () => {
    const sayHello = () => {
        console.log("hello")
    }
    return (
        <Stage>
            <Layer>
                <Circle
                    fill="red"
                    radius="60"
                    onMouseOver={sayHello}
                />
            </Layer>
        </Stage>
    )
}

export default App
```

Easy right. This wil trigger the `sayHello` method everytime you hover over it. Ofcourse there are lots of other events and triggers available. Feel free to read about the on [the Konva docs](<https://konvajs.org/docs/react/index.html>).

There are also a lot of Demo's available for Konva and react-konva. See them [here](<https://konvajs.org/docs/sandbox/index.html>)
