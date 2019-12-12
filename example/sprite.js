class Sprite {
    constructor(x, y, width, height, colour) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: Math.random() * 2.0 - 1.0,
            y: Math.random() * 2.0 - 1.0
        };
        this.width = width;
        this.height = height;
        this.colour = colour;
    }

    tick() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    draw(context) {
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Sprite;