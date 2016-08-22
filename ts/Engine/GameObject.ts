/** Class representing a genric game object */
class GameObject{
    /** The stage, used for draw calls */
    private stage:createjs.Stage;

    /** The object's graphical representation */
    public sprite: createjs.Sprite

    /** The object's position, stored as a vector */
    public position: Vector;

    /** The object's velocity, sotred as  a vector */
    public velocity: Vector;

    /** The object's acceleration, sotred as  a vector */
    public acceleration: Vector;

    constructor(stage:createjs.Stage, startX:number, startY:number, spriteSheet:createjs.SpriteSheet){
        //initialize parameters
        this.sprite = new createjs.Sprite(spriteSheet);
        this.position = new Vector(startX, startY);
        this.stage = stage;

        this.start();
    }

    /** function called once, when the object is created */
    public start = function (){};

    /**function called every frame */
    public update = function (){
        //physics calculations
        this.velocity.add(this.acceleration);
        this.position.add (this.velocity);
    };

    /** draw's object's sprite to screen */
    private draw = function (){
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.stage.addChild(this.sprite);
    };

    /** function called when object is destroyed*/
    public destroy = function (){};
}
