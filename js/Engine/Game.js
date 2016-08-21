var Game = (function () {
    function Game(canvas, width, height) {
        var _this = this;
        this.resizeCanvas = function () {
            var windowRes = new Vector(window.innerWidth, window.innerHeight);
            console.log(windowRes);
            var scale = Math.min(windowRes.x / _this.resolution.x, windowRes.y / _this.resolution.y);
            console.log(scale);
            _this.stage.scaleX = scale;
            _this.stage.scaleY = scale;
            _this.canvas.width *= scale;
            _this.canvas.height *= scale;
            console.log({
                w: _this.canvas.width,
                h: _this.canvas.height
            });
            _this.stage.update();
        };
        this.canvas = canvas;
        this.resolution = new Vector(canvas.width, canvas.height);
        this.stage = new createjs.Stage(canvas);
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas);
        var ball = new GameObject(100, 100, new createjs.SpriteSheet({
            images: ["http://www.gritengine.com/luaimg/circle.png"],
            frames: {
                width: 64,
                height: 64,
                count: 1
            }
        }));
        this.stage.addChild(ball.sprite);
        this.stage.update();
    }
    return Game;
}());
