var bullets = [];
var LEFT = 0;
var RIGHT = 1;
var UP = 2;
var DOWN = 3;

var ANIM_WALK_LEFT = 0;
var ANIM_WALK_RIGHT = 1;
var ANIM_WALK_UP = 2;
var ANIM_WALK_DOWN = 3;
var ANIM_IDLE = 4;


var Player = function() {
  this.sprite = new Sprite("player.png");
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [4,5,6,7]);
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [8,9,10,11]);
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [12,13,14,15]);
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [0,1,2,3]);
  this.sprite.buildAnimation(4, 4, 32, 48, -1, [0]);
  this.sprite.setAnimationOffset(0, 0, 0);
  this.sprite.setLoop(0, false);

  this.position = new Vector2();
  this.position.set(200, 200);

  this.width = 48;
  this.height = 48;

  this.moveVector = new Vector2();
};



Player.prototype.update = function(deltaTime) {
  this.sprite.update(deltaTime);



  this.moveVector.x = 0;
  this.moveVector.y = 0;

  if (keyboard.isKeyDown(keyboard.KEY_RIGHT))
  {
    this.moveVector.x = 100 * deltaTime;
    this.direction = RIGHT;
    if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
      this.sprite.setAnimation(ANIM_WALK_RIGHT);
  }
  else if (keyboard.isKeyDown(keyboard.KEY_LEFT))
  {
    this.moveVector.x = -100 * deltaTime;
    this.direction = LEFT;
    if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
      this.sprite.setAnimation(ANIM_WALK_LEFT);
  }
  else if (keyboard.isKeyDown(keyboard.KEY_DOWN))
  {
    this.moveVector.y = 100 * deltaTime;
    this.direction = DOWN;
    if(this.sprite.currentAnimation != ANIM_WALK_DOWN)
      this.sprite.setAnimation(ANIM_WALK_DOWN);
  }
  else if (keyboard.isKeyDown(keyboard.KEY_UP))
  {
    this.moveVector.y = -100 * deltaTime;
    this.direction = UP;
    if(this.sprite.currentAnimation != ANIM_WALK_UP)
    this.sprite.setAnimation(ANIM_WALK_UP);
  }
  else {
    this.sprite.setAnimation(ANIM_IDLE);
  }

  //if (keyboard.isKeyDown(keyboard.KEY_SHOOT))


  this.position.x += this.moveVector.x;
  this.position.y += this.moveVector.y;

}

Player.prototype.draw = function() {
  this.sprite.draw(context, this.position.x, this.position.y);
}
