function init() {
    var canvas = document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    var game = new Game(canvas);
}
var Game = (function () {
    function Game(canvas) {
        this.canvas = canvas;
        this.stage = new createjs.Stage(canvas);
        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 100;
        circle.y = 100;
        console.log(circle);
        this.stage.addChild(circle);
        this.stage.update();
    }
    return Game;
}());
