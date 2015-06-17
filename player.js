var bullets = [];
var LEFT = 0;
var RIGHT = 1;

var Player = function(){
this.sprite = new Sprite("playerplaceholder.png");
this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
this.sprite.setAnimationOffset(0, 0, 0);
this.sprite.setLoop(0, false);

this.position = new Vector2();
this.position.set(200, 200);

this.width = 93
this.height = 80

};

var player = new Player();

var PLAYER_SPEED = 100;

	
Player.prototype.update = function()
{
	this.sprite.update(deltaTime);

    if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
    {
        player.directionY = 1;
    }
    if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)
    {
        player.directionY = -1;
    }
    if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
    {
        player.angularDirection = -1;
    }
    if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
    {
        player.angularDirection = 1;
    }


    if(keyboard.isKeyUp(keyboard.KEY_UP) == true)
    {
        player.directionY = 0;
    }
    if(keyboard.isKeyUp(keyboard.KEY_DOWN) == true)
    {
        player.directionY = 0;
    }
    if(keyboard.isKeyUp(keyboard.KEY_LEFT) == true)
    {
        player.angularDirection = 0;
    }
    if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
    {
        player.angularDirection = 1;
    }

}
		
		
Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}