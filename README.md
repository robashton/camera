This is a very small library for doing viewport/camera management in a HTML5 Canvas based game in a pixel and aspect-ratio independent manner.

Usage:
```javascript
var canvas = document.getElementById('target');
var context = canvas.getContext('2d');
var camera = new Camera(context);
```
Very exciting, there are a few methods to manipulate the camera with once it is created

*Moving the camera*
```javascript
// Move the centre of the viewport to the location specified by x and y
camera.moveTo(x,y); 
```

*Controlling camera zoom*
```javascript
// Zoom out/in to the specified distance from the 2D plane
camera.zoomTo(z);
```

*Interacting with the scene*
```javascript
// Transform a coordinate pair from screen coordinates (relative to the canvas) 
// into world coordinates (useful for intersection between mouse and entities)
// Optional, can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code)
var coords = camera.screenToWorld(x, y, [obj]);
console.log(coords.x, coords.y);
```

*Overlaying the scene*
```javascript
// Transform a coordinate pair from world coordinates 
// into screen coordinates (relative to the canvas) - useful for placing DOM elements over the scene
// Optional, can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code)
var coords = camera.worldToScreen(x, y, [obj]);
console.log(coords.x, coords.y);
```

*Rendering*
Each render pass, rendering to the context should be applied with
```javascript
camera.begin();

// Draw stuff

camera.end();
```

Appropriate transformations will be applied to the context, and world coordinates can be used directly with context calls