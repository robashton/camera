class Camera {
    constructor(context, settings) {
        settings = settings || {};
        this.distance = 1000.0;
        this.lookAt = [0, 0];
        this.context = context;
        this.fieldOfView = settings.fieldOfView || Math.PI / 4.0;
        this.viewport = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
            scale: [1.0, 1.0]
        };

        this.addListeners();
        this.updateViewport();
    }

    begin() {
        this.context.save();
        this.applyScale();
        this.applyTranslation();
    }

    end() {
        this.context.restore();
    }

    applyScale() {
        this.context.scale(this.viewport.scale[0], this.viewport.scale[1]);
    }

    applyTranslation() {
        this.context.translate(-this.viewport.left, -this.viewport.top);
    }

    updateViewport() {
        this.aspectRatio = this.context.canvas.width / this.context.canvas.height;
        this.viewport.width = this.distance * Math.tan(this.fieldOfView);
        this.viewport.height = this.viewport.width / this.aspectRatio;
        this.viewport.left = this.lookAt[0] - (this.viewport.width / 2.0);
        this.viewport.top = this.lookAt[1] - (this.viewport.height / 2.0);
        this.viewport.right = this.viewport.left + this.viewport.width;
        this.viewport.bottom = this.viewport.top + this.viewport.height;
        this.viewport.scale[0] = this.context.canvas.width / this.viewport.width;
        this.viewport.scale[1] = this.context.canvas.height / this.viewport.height;
    }

    zoomTo(z) {
        this.distance = z;
        this.updateViewport();
    }

    moveTo(x, y) {
        this.lookAt[0] = x;
        this.lookAt[1] = y;
        this.updateViewport();
    }

    screenToWorld(x, y, obj) {
        obj = obj || {};
        obj.x = (x / this.viewport.scale[0]) + this.viewport.left;
        obj.y = (y / this.viewport.scale[1]) + this.viewport.top;
        return obj;
    }

    worldToScreen(x, y, obj) {
        obj = obj || {};
        obj.x = (x - this.viewport.left) * (this.viewport.scale[0]);
        obj.y = (y - this.viewport.top) * (this.viewport.scale[1]);
        return obj;
    }

    addListeners() {
        // Zoom and scroll around world
        window.onwheel = e => {
            if (e.ctrlKey) {
                // Your zoom/scale factor
                let zoomLevel = this.distance - (e.deltaY * 20);
                if (zoomLevel <= 1) {
                    zoomLevel = 1;
                }

                this.zoomTo(zoomLevel);
            } else {
                // Your track-pad X and Y positions
                const x = this.lookAt[0] + (e.deltaX * 2);
                const y = this.lookAt[1] + (e.deltaY * 2);

                this.moveTo(x, y);
            }
        };

        // Center camera on "R"
        window.addEventListener('keydown', e => {
            if (e.key === 'r') {
                this.zoomTo(1000);
                this.moveTo(0, 0);
            }
        });
    }
};

export default Camera;