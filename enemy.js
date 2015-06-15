var Enemy = function(x,y)
{
	this.image = document.createElement("img");
	this.position = new Vector2();
	
	this.velocityX = 0;
	this.velocityY = 0;
	
	this.angularVelocity = 0;
	
	this.velocity = new Vector2();
	
	this.width = 169;
	this.height = 173;
	
	this.image.src = "enemyplaceholder.png";
}

var enemy = new Enemy();
Enemy.prototype.update = function(dt)
{
	
}

Enemy.prototype.draw = function()
{
	context.save();
		context.translate(this.x, this.y);
		//context.rotate(this.rotation);
		//context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}