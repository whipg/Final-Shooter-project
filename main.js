var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
 
function getDeltaTime()
{
        endFrameMillis = startFrameMillis;
        startFrameMillis = Date.now();
 
                // Find the delta time (dt) - the change in time since the last drawFrame
                // We need to modify the delta time to something we can use.
                // We want 1 to represent 1 second, so if the delta is in milliseconds
                // we divide it by 1000 (or multiply by 0.001). This will make our
                // animations appear at the right speed, though we may need to use
                // some large values to get objects movement and rotation correct
        var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
       
                // validate that the delta is within range
        if(deltaTime > 1)
                deltaTime = 1;
               
        return deltaTime;
}

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var player = new Player();
var keyboard = new Keyboard();
var enemy = new Enemy();
var position = new Vector2();
var hit= false;

function run()
{
    context.fillStyle = "#ccc";
    context.fillRect(0, 0, canvas.width, canvas.height);
    //context.drawImage(background, 0, 0);

    var deltaTime = getDeltaTime();

<<<<<<< HEAD
	
=======
>>>>>>> origin/master
	for(var i=0; i<bullets.length; i++)
	{
		bullets[i].update(deltaTime);
		if( bullets[i].position.x - worldOffsetX < 0 || bullets[i].position.x - worldOffsetX > SCREEN_WIDTH)		
	{
		hit = true;
	}
<<<<<<< HEAD
	
=======

>>>>>>> origin/master
    if(keyboard.isKeyDown(keyboard.KEY_SHOOT) == true)
    {
    context.fillStyle = "#F02936";
    context.font = "14px Arial"
    context.fillText("Click!",SCREEN_WIDTH - 170, 35);
    }

    player.update(deltaTime);
    player.draw();
	context.drawImage(player.image, SCREEN_WIDTH/2 - player.width/2, SCREEN_HEIGHT/2 - player.height/2);
}
 
//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is
// called 60 times per second. We have some options to fall back on
// in case the browser doesn't support our preferred method.
(function() {
 var onEachFrame;
 if (window.requestAnimationFrame) {
 onEachFrame = function(cb) {
 var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
 _cb();
 };
 } else if (window.mozRequestAnimationFrame) {
 onEachFrame = function(cb) {
 var _cb = function() { cb();
window.mozRequestAnimationFrame(_cb); }
 _cb();
 };
 } else {
 onEachFrame = function(cb) {
 setInterval(cb, 1000 / 60);
 }
 }
 
 window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);