var bullets = [];
var LEFT = 0;
var RIGHT = 1;

var Player = function() {
this.image = document.createElement("img");
this.position = new Vector2();
//this.position.set(9*35, 0*35);
this.velocityX = 0;
this.velocityY = 0;
this.angularVelocity = 0;
this.velocity = new Vector2();
this.width = 159;
this.height = 163;
//this.direction = LEFT;
//this.rotation = 0;
this.image.src = "playerplaceholder.png";
};
var player = new Player();

var PLAYER_SPEED = 2;
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