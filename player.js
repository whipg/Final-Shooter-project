var bullets = [];
var LEFT = 0;
var RIGHT = 1;
var UP = 2;
var DOWN = 3;

var Player = function(){
this.sprite = new Sprite("playerplaceholder.png");
this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
this.sprite.setAnimationOffset(0, 0, 0);
this.sprite.setLoop(0, false);

this.position = new Vector2();
this.position.set(200, 200);

this.width = 48
this.height = 48

this.velocity = new Vector2();

this.moveVector = new Vector2();
this.moveVector.set(this.position.x, this.position.y);
};

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);

	if((keyboard.isKeyDown(keyboard.KEY_LEFT)) != (keyboard.isKeyDown(keyboard.KEY_RIGHT)))
	{
		if(keyboard.isKeyDown(keyboard.KEY_RIGHT))
		{
			Player.moveVector.x += 1;
		}
		else
		{
			Player.moveVector.x += -1;
		}
	}
	if((keyboard.isKeyDown(keyboard.KEY_UP)) != (keyboard.isKeyDown(keyboard.KEY_UP)))
	{
		if(keyboard.isKeyDown(keyboard.KEY_DOWN))
		{
			Player.moveVector += -1;
		}
		else
		{
			Player.moveVector += 1;
		}
	}

	Player.position += Player.moveVector;

}
		
Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}