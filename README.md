# Camera

This is a very small library for doing viewport/camera management in a HTML5 Canvas based game in a pixel and aspect-ratio independent manner.

That is, you can use the canvas context however you like, with any sized canvas and the output will be the same (consider the case of stretching the canvas to fit various screen resolutions and devices).

# Table of contents

-   [Camera](#camera)
    -   [Usage](#usage)
    -   [Moving the camera](#moving-the-camera)
    -   [Controlling camera zoom](#controlling-camera-zoom)
    -   [Interacting with the scene](#interacting-with-the-scene)
    -   [Overlaying the scene](#overlaying-the-scene)
    -   [Rendering](#rendering)
    -   [Properties](#properties)
    -   [Methods](#methods)

## Usage

```js
const canvas = document.createElement("canvas")
const context = this.canvas.getContext("2d")
const camera = new Camera(context)
```

Very exciting, there are a few methods to manipulate the camera with once it is created

<hr>

## Moving the camera

Move the centre of the viewport to the location specified by x and y

```js
camera.moveTo(x, y)
```

<hr>

## Controlling camera zoom

Zoom out/in to the specified distance from the 2D plane

```js
camera.zoomTo(z)
```

<hr>

## Interacting with the scene

Transform a coordinate pair from screen coordinates (relative to the canvas)
into world coordinates (useful for intersection between mouse and entities)

_Optional: `obj`_ can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code)

```js
const coords = camera.screenToWorld(x, y, [obj])
console.log(coords.x, coords.y)
```

<hr>

## Overlaying the scene

Transform a coordinate pair from world coordinates into screen coordinates (relative to the canvas) - useful for placing DOM elements over the scene.

_Optional: `obj`_ can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code).

```js
const coords = camera.worldToScreen(x, y, [obj])
console.log(coords.x, coords.y)
```

<hr>

## Rendering

Each render pass, rendering to the context should be applied with.

```js
camera.begin()
// Draw stuff
camera.end()
```

Appropriate transformations will be applied to the context, and world coordinates can be used directly with all canvas context calls.

<hr>

## Properties

| Property    | Description                                                      | Default Value                                |
| ----------- | ---------------------------------------------------------------- | -------------------------------------------- |
| aspectRatio | Canvas Aspect Ratio                                              | context.canvas.width / context.canvas.height |
| context     | drawing context on the canvas                                    | canvas.getContext('2d')                      |
| distance    | Used for the zoom                                                | 1000                                         |
| fieldOfView | The extent of the observable canvas                              | 0.7853981633974483                           |
| lookAt      | Refers to the camera position in the x and y axis                | [0, 0]                                       |
| viewport    | Holds: camera's - width, height, left, top, right, bottom, scale | specified in the next table                  |

#### viewport

| Property | Definition                                     |
| -------- | ---------------------------------------------- |
| width    | distance \* Math.tan(fieldOfView)              |
| height   | width / aspectRatio                            |
| left     | lookAtX - (width / 2.0)                        |
| top      | lookAtY - (height / 2.0)                       |
| right    | left + width                                   |
| bottom   | top + height                                   |
| scale    | [canvas.width / width, canvas.height / height] |

<hr>

## Methods

| Method                                                                                                | Description                                                                   |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| <span class="blue">begin<span class="black">()</span></span>                                          | Applies Scale and Translation [Rendering](#rendering)                         |
| <span class="blue">end<span class="black">()</span></span>                                            | 2d Context restore() method [Rendering](#rendering)                           |
| <span class="blue">applyScale<span class="black">()</span></span>                                     | 2d Context scale(Camera.viewport.scale[0], Camera.viewport.scale[0]) method   |
| <span class="blue">applyTranslation<span class="black">()</span></span>                               | 2d Context translate(-Camera.viewport.left, -Camera.viewport.top) method      |
| <span class="blue">updateViewport<span class="black">()</span></span>                                 | Camera.viewport data update                                                   |
| <span class="blue">zoomTo<span class="black"><span>(<span class="red">z</span>)</span>                | [Moving the camera](#moving-the-camera)                                       |
| <span class="blue">moveTo<span class="black"><span>(<span class="red">x, y</span>)</span>             | [Controlling camera zoom](#controlling-camera-zoom)                           |
| <span class="blue">screenToWorld<span class="black"><span>(<span class="red">x, y, obj</span>)</span> | [Interacting with the scene](#interacting-with-the-scene)                     |
| <span class="blue">worldToScreen<span class="black"><span>(<span class="red">x, y, obj</span>)</span> | [Overlaying the scene](#overlaying-the-scene)                                 |
| <span class="blue">addListeners<span class="black">()</span></span>                                   | Event Listeners for Zoom and scroll around world and Center camera on "R" key |

## Settings

Example of default settings:

```js
settings = {
	distange: 1000,
	initialPosition: [0, 0],
	fieldOfView: Math.PI / 4.0,
	scaleX: 1.0,
	scaleY: 1.0
}
```
