This is a very small library for doing viewport/camera management in a HTML5 Canvas based game in a pixel and aspect-ratio independent manner.

That is, you can use the canvas context however you like, with any sized canvas and the output will be the same (consider the case of stretching the canvas to fit various screen resolutions and devices)

**Usage**

    var canvas = document.getElementById('target');
    var context = canvas.getContext('2d');
    var camera = new Camera(context);

Very exciting, there are a few methods to manipulate the camera with once it is created

**Moving the camera**

Move the centre of the viewport to the location specified by x and y

    camera.moveTo(x,y); 

**Controlling camera zoom**

Zoom out/in to the specified distance from the 2D plane

    camera.zoomTo(z);


**Interacting with the scene**

Transform a coordinate pair from screen coordinates (relative to the canvas) 
into world coordinates (useful for intersection between mouse and entities)

*Optional: 'obj'*  can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code)

    var coords = camera.screenToWorld(x, y, [obj]);
    console.log(coords.x, coords.y);

**Overlaying the scene**

Transform a coordinate pair from world coordinates into screen coordinates (relative to the canvas) - useful for placing DOM elements over the scene

*Optional: 'obj'* can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code)

    var coords = camera.worldToScreen(x, y, [obj]);
    console.log(coords.x, coords.y);

**Rendering**

Each render pass, rendering to the context should be applied with
 
    camera.begin();
    
    // Draw stuff
    
    camera.end();


Appropriate transformations will be applied to the context, and world coordinates can be used directly with all canvas context calls