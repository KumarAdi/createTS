/**Class representing the Game */
class Game {
    /** The canvas object the game is rendered on */
    private canvas: HTMLCanvasElement;

    /** The createjs stage object that is easier to work with */
    private stage: createjs.Stage;

    /** The game's resolution */
    public resolution: Vector;

    /** The current level being played */
    public curLevel: Level;

    /** The framerate the game is running at, can be cahnged at runtime */
    public framerate: number;

    constructor(canvas: HTMLCanvasElement, startLevel, framerate = 60) {
        //set up game canvas
        this.canvas = canvas;
        this.stage = new createjs.Stage(canvas);
        this.resolution = new Vector(canvas.width, canvas.height);
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas);

        //Initialize variables
        this.curLevel = startLevel;
        this.framerate = framerate;

        //Start up game loop
        this.gameLoop();
    }

    /** Resizes the canvas to the screen*/
    private resizeCanvas = () => {
        let windowRes = new Vector(window.innerWidth, window.innerHeight);
        //figure out which dimension to fit to
        let scale = Math.min(
            windowRes.x / this.canvas.width,
            windowRes.y / this.canvas.height
            );

        //fit canvas to window
        this.canvas.width *= scale;
        this.canvas.height *= scale;
        //Fit stage to canvas
        this.stage.scaleX = this.canvas.width / this.resolution.x;
        this.stage.scaleY = this.canvas.height / this.resolution.y;

        //update the stage
        this.stage.update();
    }

    /*
    *These are arrow functions because "this" goes wonky if these functions
    *aren't variables. because settimeout makes "this" = window, not game
    */
    /** Runs the logic and render cycles */
    private gameLoop = () => {
        this.update();
        this.draw();
        setTimeout(this.gameLoop, 1000 / this.framerate)
    }

    /** Runs the current Level's logic */
    private update = () => {
        this.curLevel.update();
    }

    /** Draws the current level to the screen */
    private draw = () => {
        //remove all children and redraw them, keeping a reference is too hard
        this.stage.removeAllChildren();
        this.curLevel.draw(this.stage);
        this.stage.update();
    }
}
