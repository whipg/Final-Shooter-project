var Enemy = function(x,y)
{
	this.sprite = new Sprite("enemyplaceholder.png");
	
	this.position = new Vector2();
	this.position.set(x,y);
	
	this.velocity = new Vector2();
}

Enemy.prototype.update = function(dt)
{
	
}

Enemy.prototype.draw = function()
{
	//this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	this.sprite.draw(context, this.position.x, this.position.y);
}