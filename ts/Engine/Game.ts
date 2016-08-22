/**Class representing the Game */
class Game{
    /** The canvas object the game is rendered on */
    private canvas: HTMLCanvasElement;

    /** The createjs stage object that is easier to work with */
    private stage: createjs.Stage;

    /** The game's resolution */
    public resolution:Vector;

    constructor(canvas:HTMLCanvasElement){
        //set up game canvas
        this.canvas = canvas;
        this.stage = new createjs.Stage(canvas);
        this.resolution = new Vector(canvas.width, canvas.height);
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas);

        //test sprite, remove once usre cod ehsa been integrated
        let ball = new GameObject(this.stage, 100, 100, new createjs.SpriteSheet({
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

    /** Resizes the canvas to the screen*/
    private resizeCanvas = () => {
        let windowRes = new Vector(window.innerWidth, window.innerHeight);
        //figure out which dimension to fit to
        let scale = Math.min(
            windowRes.x/this.canvas.width,
            windowRes.y/this.canvas.height
        );

        //fit canvas to window
        this.canvas.width *= scale;
        this.canvas.height *= scale;
        //Fit stage to canvas
        this.stage.scaleX = this.canvas.width/this.resolution.x;
        this.stage.scaleY = this.canvas.height/this.resolution.y;

        //update the stage
        this.stage.update();
    }
}
