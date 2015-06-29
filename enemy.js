var Enemy = function(x,y)
{
	this.sprite = new Sprite("playerplaceholder.png");
	this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
	this.sprite.setAnimationOffset(0, 0, 0);
	this.sprite.setLoop(0, false);

	this.position = new Vector2();

	this.velocityX = 0;
	this.velocityY = 0;

	this.angularVelocity = 0;

	this.velocity = new Vector2();

	this.width = 169;
	this.height = 173;

}

var enemy = new Enemy();
Enemy.prototype.update = function(dt)
{
	this.sprite.update();
}

Enemy.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
}
