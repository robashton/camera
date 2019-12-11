import Sprite from './sprite.js';

class ObjectPool {
    constructor(wall, numObjects) {
        this.objects = [];
        this.wall = wall;
        this.numObjects = numObjects;
        this.createObjects();
    }

    createObjects() {
        for (var i = 0; i < this.numObjects; i++) {
            var width = Math.random() * 50.0 + 10.0;
            var height = Math.random() * 50.0 + 10.0;
            var x = this.wall.x + (Math.random() * (this.wall.width - width));
            var y = this.wall.y + (Math.random() * (this.wall.height - height));
            this.objects.push(new Sprite(x, y, width, height, '#000'));
        }
    }

    tick() {
        this.objects.forEach(item => {
            item.tick();
        });
        this.collide();
    }

    draw(context) {
        this.objects.forEach(item => {
            item.draw(context);
        });
    }

    collide() {
        for (var i = 0; i < this.objects.length; i++) {
            this.collideWalls(this.objects[i]);
            for (var j = i; j < this.objects.length; j++) {
                var obj1 = this.objects[i];
                var obj2 = this.objects[j];
                this.collideObjects(obj1, obj2);
            }
        }
    }

    collideObjects(one, two) {
        if ((one.x + one.width < two.x) ||
            (two.x + two.width < one.x) ||
            (one.y + one.height < two.y) ||
            (two.y + two.height < one.y)) { return; }

        const tx = one.velocity.x;
        const ty = one.velocity.y;
        one.velocity.x = two.velocity.x;
        one.velocity.y = two.velocity.y;
        two.velocity.x = tx;
        two.velocity.y = ty;
    }

    collideWalls(obj) {
        // Check x
        if (obj.x < this.wall.x || obj.x + obj.width > this.wall.x + this.wall.width) {
            obj.velocity.x = -obj.velocity.x;
        }

        // Check y
        if (obj.y < this.wall.y || obj.y + obj.height > this.wall.y + this.wall.height) {
            obj.velocity.y = -obj.velocity.y;
        }
    }
};

export default ObjectPool;