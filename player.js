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

this.width = 48
this.height = 48

this.velocity = new Vector2();

this.width = 93
this.height = 80
this.direction = LEFT;
};

var player = new Player();

var PLAYER_SPEED = 300;

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);

	var left = false;
	var right = false;
	var up = false;
	var down = false;

    if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) {
		this.direction = LEFT;
		left = true;
	}
	else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) {
		right = true;
		this.direction = RIGHT;
		right = true;
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

	if (left)
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
	}


}
	
/*Player.prototype.update = function(deltaTime)
	{
		this.sprite.update(deltaTime);
		// we’ll insert code here later
		 var left = false;
		 var right = false;
		 var jump = false;

		// check keypress events
		 if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
		 {
		 	left = true;
		 }

		 if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
		 {
		 	right = true;
		 }

		 if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true) 
		 {
		 	jump = true;
		 }

		 var wasleft = this.velocity.x < 0;
		 var wasright = this.velocity.x > 0;
		 var falling = this.falling;
		 var ddx = 0; // acceleration
		 var ddy = 0;

		 if (left)
		 	ddx = ddx - ACCEL; // player wants to go left
		 else if (wasleft)
		 	ddx = ddx + FRICTION; // player was going left, but not any more
		 if (right)
		 	ddx = ddx + ACCEL; // player wants to go right
		 else if (wasright)
		 	ddx = ddx - FRICTION; // player was going right, but not any more
		 if (jump && !this.jumping && !falling)
		 {
			 ddy = ddy - JUMP; // apply an instantaneous (large) vertical impulse
			 this.jumping = true;
		 }

		 // calculate the new position and velocity:
		 this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
		 this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
		 this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
		 this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);

		 if ((wasleft && (this.velocity.x > 0)) ||
			 (wasright && (this.velocity.x < 0)))
		 {
			 // clamp at zero to prevent friction from making us jiggle side to side
			 this.velocity.x = 0;
		 }
	}*/
		// collision detection
		// Our collision detection logic is greatly simplified by the fact that the
		// player is a rectangle and is exactly the same size as a single tile.
		 // So we know that the player can only ever occupy 1, 2 or 4 cells.

		// This means we can short-circuit and avoid building a general purpose
		// collision detection engine by simply looking at the 1 to 4 cells that
		// the player occupies:
		/*var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if player overlaps right
		var ny = (this.position.y)%TILE; // true if player overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);*/

	// If the player has vertical velocity, then check to see if they have hit a platform
	 // below or above, in which case, stop their vertical velocity, and clamp their
	 // y position:
	/*if (this.velocity.y > 0) 
	{
		if ((celldown && !cell) || (celldiag && !cellright && nx)) 
		{
			 // clamp the y position to avoid falling into platform below
			 this.position.y = tileToPixel(ty);
			 this.velocity.y = 0; 	// stop downward velocity
			 this.falling = false;  // no longer falling
			 this.jumping = false;  // (or jumping)
			 ny = 0; 				// no longer overlaps the cells below
		}
		}
		else if (this.velocity.y < 0) 
		{
		if ((cell && !celldown) || (cellright && !celldiag && nx)) 
		{
			 // clamp the y position to avoid jumping into platform above
			 this.position.y = tileToPixel(ty + 1);
			 this.velocity.y = 0; // stop upward velocity

			 // player is no longer really in that cell, we clamped them to the cell below
			 cell = celldown;
			 cellright = celldiag; // (ditto)
			 ny = 0; // player no longer overlaps the cells below
		}
	}
		if (this.velocity.x > 0) 
		{
		 	if ((cellright && !cell) || (celldiag && !celldown && ny)) 
		 		{
					 // clamp the x position to avoid moving into the platform we just hit
					 this.position.x = tileToPixel(tx);
					 this.velocity.x = 0; // stop horizontal velocity
				}
		}
		else if (this.velocity.x < 0) 
		{
		 	if ((cell && !cellright) || (celldown && !celldiag && ny)) 
		 	{
				// clamp the x position to avoid moving into the platform we just hit
				this.position.x = tileToPixel(tx + 1);
				this.velocity.x = 0; // stop horizontal velocity
			}
		}*/
		
		
Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}