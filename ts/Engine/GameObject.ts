/** Class representing a genric game object */
class GameObject extends Entity{
    /** The object's graphical representation */
    public sprite: createjs.Sprite

    /** The object's position, stored as a vector */
    public position: Vector;

    /** The object's velocity, sotred as  a vector */
    public velocity: Vector;

    /** The object's acceleration, sotred as  a vector */
    public acceleration: Vector;

    constructor(startX:number, startY:number, spriteSheet?:createjs.SpriteSheet){
        super();

        //Creates sprite from spritesheet if it's truthy, uses ball if it isn't
        this.sprite = new createjs.Sprite(spriteSheet || new createjs.SpriteSheet({
            images: ["http://www.gritengine.com/luaimg/circle.png"],
            frames: {
                width: 64,
                height: 64,
                count: 1
            }
        }));

        //initialize parameters
        this.position = new Vector(startX, startY);
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);

        this.start();
    }

    /**function called every frame */
    public update() {
        //physics calculations
        this.velocity.add(this.acceleration);
        this.position.add (this.velocity);
    };

    /**
    *Draws object's sprite to screen
    *@param stage The stage this objject should be drawn to
    */
    public draw(stage) {
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        stage.addChild(this.sprite);
    };
}
