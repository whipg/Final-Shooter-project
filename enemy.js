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
	this.sprite.update(deltaTime);

	if(this.pause > 0)
	{
		this.pause -= deltaTime;
	}
	else
	{
		var ddx = 0;

		var ddx = 0; // acceleration
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if enemy overlaps right
		var ny = (this.position.y)%TILE; // true if enemy overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	if(this.moveRight)
	{
		if(celldiag && !cellright) {
			ddx = ddx + ENEMY_ACCEL; // enemy wants to go right
		}
		else {
			this.velocity.x = 0;
			this.moveRight = false;
			this.pause = 0.5;
		}
	}

	if(!this.moveRight)
	{
		if(celldown && !cell) {
			ddx = ddx - ENEMY_ACCEL; // enemy wants to go left
		}
		else {
			this.velocity.x = 0;
			this.moveRight = true;
			this.pause = 0.5;
		}
	}
	
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx),
		-ENEMY_MAXDX, ENEMY_MAXDX);
	}
}

Enemy.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
}