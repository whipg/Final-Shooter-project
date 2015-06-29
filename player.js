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

this.width = 48;
this.height = 48;

this.moveVector = new Vector2();
};


Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);

	this.moveVector.x = 0;
	this.moveVector.y = 0;

	var left = false;
	var right = false;
	var up = false;
	var down = false;

	if((keyboard.isKeyDown(keyboard.KEY_LEFT)) != (keyboard.isKeyDown(keyboard.KEY_RIGHT)))
	{
		if(keyboard.isKeyDown(keyboard.KEY_RIGHT))
		{
			right = true;
		}
		else if(keyboard.isKeyDown(keyboard.KEY_LEFT))
		{
			left = true;
		}
	}
	if((keyboard.isKeyDown(keyboard.KEY_UP)) != (keyboard.isKeyDown(keyboard.KEY_DOWN)))
	{
		if(keyboard.isKeyDown(keyboard.KEY_DOWN))
		{
			down = true;
		}
		else if(keyboard.isKeyDown(keyboard.KEY_UP))
		{
			up = true;
		}
	}

	var wasleft = this.moveVector.x < 0;
	var wasright = this.moveVector.x > 0;

	if(right)
	this.moveVector.x += 50 * deltaTime;
	else if (wasright)
	this.moveVector.x = 0;
	if(left)
	this.moveVector.x += -50 * deltaTime;
	else if (wasleft)
	this.moveVector.x = 0;
	if(down)
	this.moveVector.y += 50 * deltaTime;
	if(up)
	this.moveVector.y += -50 * deltaTime;



	this.position.x += this.moveVector.x;
	this.position.y += this.moveVector.y;




}

Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}
