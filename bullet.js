var Bullet = function(x, y)
{
	this.image = document.createElement("img");
	this.position = new Vector2();
	this.position.Set(x, y);

	this.velocity = new Vector2();

	var BULLET_SPEED = 450;

	this.image.src ="bullet.png";
};


Bullet.prototype.update = function(dt)
{
this.image.update(dt);
this.position.x = Math.floor(this.position.x + (dt * this.velocity.x));
}
Bullet.prototype.draw = function()
{
var screenX = this.position.x - worldOffsetX;
this.image.draw(context, screenX, this.position.y);
}
