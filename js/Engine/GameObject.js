var GameObject = (function () {
    function GameObject(startX, startY, spriteSheet) {
        this.start = function () { };
        this.update = function () {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        };
        this.draw = function () { };
        this.destroy = function () { };
        this.sprite = new createjs.Sprite(spriteSheet);
        this.position = new Vector(startX, startY);
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.start();
    }
    return GameObject;
}());
