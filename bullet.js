var bullet = {
	this.x = Player.position.x
	this.y = Player.position.y
	this.width: 5
	this.height: 5
	this.velocityX: 0
	this.velocityY: 0
};

bullet.image.src = "bullet.png";

function playerShoot()
{

	if( bullet.isDead == false )
	return;

	var velX = 0;
	var velY = 1;

	var s = Math.sin(player.rotation);
	var c = Math.cos(player.rotation);

	var xVel = (velX * c) - (velY * s);
	var yVel = (velX * s) + (velY * c);


	bullet.velocityX = xVel * BULLET_SPEED;
	bullet.velocityY = yVel * BULLET_SPEED;

	bullet.x = player.x;
	bullet.y = player.y;

	bullet.isDead = false;
}
