var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** starts the game once html has loaded */
var game;
function init() {
    var canvas = document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    var firstLevel = new Level();
    game = new Game(canvas, firstLevel);
    var ball = new GameObject(0, 0);
    firstLevel.add(ball);
}
// Generic Object class to represent game entities
var Entity = (function () {
    function Entity() {
    }
    /** function called once, when the object is created */
    Entity.prototype.start = function () { };
    ;
    /**function called every frame */
    Entity.prototype.update = function () { };
    ;
    /**
    *Draws object's sprite to screen
    *@param stage The stage this objject should be drawn to
    */
    Entity.prototype.draw = function (stage) { };
    ;
    /** function called when object is destroyed*/
    Entity.prototype.destroy = function () { };
    ;
    return Entity;
}());
/**Class representing the Game */
var Game = (function () {
    function Game(canvas, startLevel, framerate) {
        var _this = this;
        if (framerate === void 0) { framerate = 60; }
        /** Resizes the canvas to the screen*/
        this.resizeCanvas = function () {
            var windowRes = new Vector(window.innerWidth, window.innerHeight);
            //figure out which dimension to fit to
            var scale = Math.min(windowRes.x / _this.canvas.width, windowRes.y / _this.canvas.height);
            //fit canvas to window
            _this.canvas.width *= scale;
            _this.canvas.height *= scale;
            //Fit stage to canvas
            _this.stage.scaleX = _this.canvas.width / _this.resolution.x;
            _this.stage.scaleY = _this.canvas.height / _this.resolution.y;
            //update the stage
            _this.stage.update();
        };
        /*
        *These are arrow functions because "this" goes wonky if these functions
        *aren't variables. because settimeout makes "this" = window, not game
        */
        /** Runs the logic and render cycles */
        this.gameLoop = function () {
            _this.update();
            _this.draw();
            setTimeout(_this.gameLoop, 1000 / _this.framerate);
        };
        /** Runs the current Level's logic */
        this.update = function () {
            _this.curLevel.update();
        };
        /** Draws the current level to the screen */
        this.draw = function () {
            //remove all children and redraw them, keeping a reference is too hard
            _this.stage.removeAllChildren();
            _this.curLevel.draw(_this.stage);
            _this.stage.update();
        };
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
    return Game;
}());
/** Class representing a genric game object */
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(startX, startY, spriteSheet) {
        _super.call(this);
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
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.start();
    }
    /**function called every frame */
    GameObject.prototype.update = function () {
        //physics calculations
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    };
    ;
    /**
    *Draws object's sprite to screen
    *@param stage The stage this objject should be drawn to
    */
    GameObject.prototype.draw = function (stage) {
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        stage.addChild(this.sprite);
    };
    ;
    return GameObject;
}(Entity));
/** Class that holds a group of Gameobjects */
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        _super.call(this);
        this.members = [];
    }
    /** Update all members */
    Group.prototype.update = function () {
        for (var _i = 0, _a = this.members; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.update();
        }
    };
    /** draw all members */
    Group.prototype.draw = function (stage) {
        for (var _i = 0, _a = this.members; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.draw(stage);
        }
    };
    /**
    * Add a member to the group
    * @param newMember Entity (including another group) to be added to this group
    */
    Group.prototype.add = function (newMember) {
        this.members.push(newMember);
        newMember.start();
    };
    return Group;
}(Entity));
/** class that represents a game level. Levels are the entry point for game logic */
var Level = (function (_super) {
    __extends(Level, _super);
    function Level() {
        _super.call(this);
    }
    return Level;
}(Group));
/** Class to help with vector math */
var Vector = (function () {
    function Vector(x, y) {
        var _this = this;
        /**
        * Adds another vector to this once
        * @param other The vector that is added to this one
        */
        this.add = function (other) {
            _this.x += other.x;
            _this.y += other.y;
        };
        /**
        * Multiplies this vector by a scalar coefficient
        *@param coefficient The number that theis Vector is multiplied by
        */
        this.multiply = function (coefficient) {
            _this.x *= coefficient;
            _this.y *= coefficient;
        };
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
