var bullets = [];
var LEFT = 0;
var RIGHT = 1;

var Player = function() {
this.image = document.createElement("img");
this.position = new Vector2();
//this.position.set(9*35, 0*35);
this.velocityX = 0;
this.velocityY = 0;
this.angularVelocity = 0;
this.velocity = new Vector2();
this.width = 159;
this.height = 163;
//this.direction = LEFT;
//this.rotation = 0;
this.image.src = "playerplaceholder.png";
};
var player = new Player();

var PLAYER_SPEED = 300;
Player.prototype.update = function(deltaTime)

{
		//this.sprite.update(deltaTime);
		// we’ll insert code here later
		 var left = false;
		 var right = false;
		 var jump = false;
		 var down = false;
		 var up = false;
		 var shoot = false;

		// check keypress events
		 if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
		 {
			 this.x -= PLAYER_SPEED * deltaTime;
		 	left = true;
			this.direction = LEFT;
			//if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
				//this.sprite.setAnimation(ANIM_WALK_LEFT);
		 }
	

		  else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
		 {
			 this.x += PLAYER_SPEED * deltaTime;
		 	right = true;
			this.direction = RIGHT;
			//if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
				//this.sprite.setAnimation(ANIM_WALK_RIGHT);
		 }
		 
		 var wasleft = this.velocity.x < 0;
		 var wasright = this.velocity.x > 0;
		 var falling = this.falling;
		 var ddx = 0; // acceleration
		 //var ddy = GRAVITY;

		 if (left)
		 	ddx = ddx - ACCEL; // player wants to go left
		 else if (wasleft)
		 	ddx = ddx + FRICTION; // player was going left, but not any more
		 if (right)
		 	ddx = ddx + ACCEL; // player wants to go right
		 else if (wasright)
		 	ddx = ddx - FRICTION; // player was going right, but not any more
		// if (jump && !this.jumping && !falling)
		 {
			// ddy = ddy - JUMP; // apply an instantaneous (large) vertical impulse
			 //this.jumping = true;
		 }
	}
		
		
Player.prototype.draw = function()
{
context.save();
context.translate(this.x, this.y);
//context.rotate(this.rotation);
//context.drawImage(this.image, -this.width/2, -this.height/2);
context.restore();
}