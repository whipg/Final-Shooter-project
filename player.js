var bullets = [];
var LEFT = 0;
var RIGHT = 1;

var Player = function(){
this.sprite = new Sprite("playerplaceholder.png");
this.sprite.buildAnimation(1, 1, 48, 48, -1, [0]);
this.sprite.setAnimationOffset(0, 0, 0);
this.sprite.setLoop(0, false);

this.position = new Vector2();
this.position.set(200, 200);

this.width = 48
this.height = 48

};

var player = new Player();

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
	this.sprite.draw(context, this.position.x, this.position.y);
}