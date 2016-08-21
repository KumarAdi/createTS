var Game = (function () {
    function Game(canvas) {
        this.canvas = canvas;
        this.stage = new createjs.Stage(canvas);
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
