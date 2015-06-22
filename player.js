var bullets = [];
var LEFT = 0;
var RIGHT = 1;
var UP = 2;
var DOWN = 3;

var Player = function(){
this.sprite = new Sprite("playerplaceholder.png");
this.sprite.buildAnimation(1, 1, 48, 48, -1, [0]);
this.sprite.setAnimationOffset(0, 0, 0);
this.sprite.setLoop(0, false);

this.position = new Vector2();
this.position.set(200, 200);

this.width = 48
this.height = 48

this.velocity = new Vector2();

};

var player = new Player();

var PLAYER_SPEED = 100;

Player.prototype.update = function()
{
	this.sprite.update(deltaTime);

	var left = false;
	var right = false;
	var up = false;
	var down = false;

    if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) {
		this.position.Add(1, 0);
	}
	else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) {
		right = true;
		this.direction = RIGHT;
	}
	else if(keyboard.isKeyDown(keyboard.KEY_UP) == true) {
		up = true;
		this.direction = UP;
	}
	else if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true) {
		down = true;
		this.direction = DOWN;
	}

	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var wasup = this.velocity.y > 0;
	var wasdown = this.velocity.y < 0;
	var ddx = 0;
	var ddy = 0;

	/*if (left)
		ddx = ddx - ACCEL;
	else if (wasleft)
		ddx = ddx + FRICTION;

	if(right)
		ddx = ddx + ACCEL;
	else if (wasright)
		ddx = ddx - FRICTION;

	this.position.y = Math.floor(this.position.y +(deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x +(deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);

	if((wasleft && (this.velocity.x > 0)) ||
	   (wasright && (this.velocity.x < 0)))
	{
		this.velocity.x = 0;
	}*/


}
		
		
Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}