var Vector = (function () {
    function Vector(x, y) {
        var _this = this;
        this.add = function (other) {
            _this.x += other.x;
            _this.y += other.y;
        };
        this.multiply = function (coefficient) {
            _this.x *= coefficient;
            _this.y *= coefficient;
        };
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
