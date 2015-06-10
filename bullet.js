var bullet = {
	image: document.createElement("img"),
	x: player.x,
	y: player.y,
	width: 5,
	height: 5,
	velocityX: 0,
	velocityY: 0,
	isDead: true
};
bullet.image.src ="bullet.png";

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
