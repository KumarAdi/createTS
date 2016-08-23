/** starts the game once html has loaded */
var game:Game;

function init(){
    let canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    let firstLevel = new Level()
    game = new Game(canvas, firstLevel);
    let ball = new GameObject(0,0);
    firstLevel.add(ball);
}
