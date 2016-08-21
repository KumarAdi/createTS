/** Class to help with vector math */
class Vector{
    /** The vector's x component */
    public x: number;

    /** The vector's y component */
    public y: number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    /**
    * Adds another vector to this once
    * @param other The vector that is added to this one
    */
    public add = (other:Vector) => {
        this.x += other.x;
        this.y += other.y;
    }

    /**
    * Multiplies this vector by a scalar coefficient
    *@param coefficient The number that theis Vecotr is multiplied by
    */
    public multiply = (coefficient: number) => {
        this.x *= coefficient;
        this.y *= coefficient;
    }
}
