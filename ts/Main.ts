/** starts the game once html has loaded */
function init(){
    let canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    let game = new Game(canvas);
}
