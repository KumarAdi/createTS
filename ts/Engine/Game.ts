/**Class representing the Game */
class Game{
    /** The canvas object the game is rendered on */
    private canvas: HTMLCanvasElement;

    /** The createjs stage object that is easier to work with */
    private stage: createjs.Stage;

    /** The game's resolution */
    public resolution:Vector;

    constructor(canvas:HTMLCanvasElement, width, height){
        this.canvas = canvas;
        this.stage = new createjs.Stage(canvas);
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas);

        let ball = new GameObject(100, 100, new createjs.SpriteSheet({
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

    /** Resizes the canvas tot the screen*/
    private resizeCanvas = () => {
        let windowRes = new Vector(window.innerWidth, window.innerHeight);
        this.resolution = new Vector(this.canvas.width, this.canvas.height);
        let scale = Math.min(
            windowRes.x/this.resolution.x,
            windowRes.y/this.resolution.y
        );
        console.log(scale);
        this.stage.scaleX = scale;
        this.stage.scaleY = scale;
        this.canvas.width *= scale;
        this.canvas.height *= scale;
        console.log({
            w: this.canvas.width,
            h: this.canvas.height
        });
        this.stage.update();
    }
}
