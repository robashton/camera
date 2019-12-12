import Camera from '../camera.js';
import ObjectPool from './object-pool.js';
import Wall from './wall.js';
import { findRequestAnimationFrame } from './utils.js';

class Game {
  static renderFrame = findRequestAnimationFrame();

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
    this.camera = new Camera(this.context);
    this.objects = [];

    // Create a wall
    const wall = new Wall(-300, -300, 600, 600);
    this.objects.push(wall);
    this.objects.push(new ObjectPool(wall, 10));
  }

  // Update each item in the game
  updateScene() {
    this.objects.forEach(item => {
      if (item.tick) {
        item.tick();
      }
    });
  }

  // Draw each item in the game
  drawScene() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.camera.begin();
    this.objects.forEach(item => {
      if (item.draw) {
        item.draw(this.context);
      }
    });
    this.camera.end();
  }

  // Main game loop
  tick() {
    this.updateScene();
    this.drawScene();
    Game.renderFrame(() => {
      this.tick();
    });
  }


  start() {
    // Start the game ticking
    Game.renderFrame(() => {
      this.tick();
    });
  }
};

export default Game;
