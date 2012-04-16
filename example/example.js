$(document).ready(function() {
  var canvas = document.getElementById('target');
  var context = canvas.getContext('2d');
  var camera = new Camera(context);
  var renderFrame = findRequestAnimationFrame();
  var objects = [];

  var updateScene = function() {
    objects.forEach(function(item) {
      if(item.tick) item.tick();
    });
  };

  var drawScene = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    camera.begin();
    objects.forEach(function(item) {
      if(item.draw) item.draw(context);
    });
    camera.end();
  };

  var tick = function() {
    updateScene();
    drawScene();
    renderFrame(tick);
  };

  var wall = new Wall(-300, -300, 600, 600);  
  objects.push(wall);
  objects.push(new ObjectPool(wall, 10));
  renderFrame(tick);
});