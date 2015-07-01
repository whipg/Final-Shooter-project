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
