var bullets = [];
var LEFT = 0;
var RIGHT = 1;

var Player = function(){
	image:document.createElement("img"),
	//x: SCREEN_WIDTH/2
//y: SCREEN_HEIGHT/2
this.width = 93
this.height = 80
this.directionX =0
this.directionY =0
angularDirection =0
rotation =0

//isDead: false
};
var player = new Player();
//player.image.src = "playerplaceholder.png"
var PLAYER_SPEED = 100;
function onKeyDown(event)
{
        if(event.keyCode == KEY_UP)
        {
                player.directionY = 1;
        }
        if(event.keyCode == KEY_DOWN)
        {
                player.directionY = -1;
        }
        if(event.keyCode == KEY_LEFT)
        {
                player.angularDirection = -1;
        }
        if(event.keyCode == KEY_RIGHT)
        {
                player.angularDirection = 1;
        }
        if(event.keyCode == KEY_SPACE && shootTimer <= 0)
        {
                shootTimer += 0.3;
                playerShoot();
        }
        if(event.keyCode == KEY_SPACE)
        {
                shoot = true;
        }
}


function onKeyUp(event)
{
        if(event.keyCode == KEY_UP)
        {      
                player.directionY = 0;
        }
        if(event.keyCode == KEY_DOWN)
        {      
                player.directionY = 0;
        }
        if(event.keyCode == KEY_LEFT)
        {
                player.angularDirection = 0;
        }
        if(event.keyCode == KEY_RIGHT)
        {
                player.angularDirection = 0;
        }
        if(event.keyCode == KEY_SPACE)
        {
                shoot = false;
        }
}
	
		
		
Player.prototype.draw = function()
{
context.save();
context.translate(this.x, this.y);
//context.rotate(this.rotation);
//context.drawImage(this.image, -this.width/2, -this.height/2);
context.restore();
}