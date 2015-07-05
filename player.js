var LEFT = 0;
var RIGHT = 1;
var UP = 2;
var DOWN = 3;

var ANIM_WALK_LEFT = 0;
var ANIM_WALK_RIGHT = 1;
var ANIM_WALK_UP = 2;
var ANIM_WALK_DOWN = 3;
var ANIM_IDLE = 4;

var cooldownTimer = 0;

var Player = function() {
  this.sprite = new Sprite("player.png");
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [4, 5, 6, 7]);
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [8, 9, 10, 11]);
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [12, 13, 14, 15]);
  this.sprite.buildAnimation(4, 4, 32, 48, 0.25, [0, 1, 2, 3]);
  this.sprite.buildAnimation(4, 4, 32, 48, -1, [0]);
  this.sprite.setAnimationOffset(0, 0, 0);
  this.sprite.setLoop(0, false);

  this.position = new Vector2();
  this.position.set(200, 200);

  this.width = 32;
  this.height = 48;

  this.moveVector = new Vector2();

  this.rotation = 0;
};



Player.prototype.update = function(deltaTime) {
  this.sprite.update(deltaTime);

  this.moveVector.x = 0;
  this.moveVector.y = 0;

  var left = false;
  var right = false;
  var up = false;
  var down = false;

  if (keyboard.isKeyDown(keyboard.KEY_RIGHT)) {
    this.moveVector.x = 100 * deltaTime;
    this.direction = RIGHT;
    right = true;
    this.rotation = 90;
    if (this.sprite.currentAnimation != ANIM_WALK_RIGHT)
      this.sprite.setAnimation(ANIM_WALK_RIGHT);
  } else if (keyboard.isKeyDown(keyboard.KEY_LEFT)) {
    this.moveVector.x = -100 * deltaTime;
    this.direction = LEFT;
    left = true;
    this.rotation = 270;
    if (this.sprite.currentAnimation != ANIM_WALK_LEFT)
      this.sprite.setAnimation(ANIM_WALK_LEFT);
  } else if (keyboard.isKeyDown(keyboard.KEY_DOWN)) {
    this.moveVector.y = 100 * deltaTime;
    this.direction = DOWN;
    down = true;
    this.rotation = 180;
    if (this.sprite.currentAnimation != ANIM_WALK_DOWN)
      this.sprite.setAnimation(ANIM_WALK_DOWN);
  } else if (keyboard.isKeyDown(keyboard.KEY_UP)) {
    this.moveVector.y = -100 * deltaTime;
    this.direction = UP;
    up = true;
    this.rotation = 0;
    if (this.sprite.currentAnimation != ANIM_WALK_UP)
      this.sprite.setAnimation(ANIM_WALK_UP);
  } else {
    this.sprite.setAnimation(ANIM_IDLE);
  }

  this.position.x += this.moveVector.x;
  this.position.y += this.moveVector.y;

  if(keyboard.isKeyDown(keyboard.KEY_SHOOT)) {

    playerShoot();

  /*  var tempBullet = new Bullet(this.position.x, this.position.y);
    if(right == true)
    {
      tempBullet.velocity.x = 400;
      //tempBullet.position.x += 5;
    }
    else if(left == true)
    {
      tempBullet.velocity.x = -400;
      //tempBullet.position.x += 5;
    }
    else if(up == true)
    {
      tempBullet.velocity.y = -400;
      //tempBullet.position.y += 5;
    }
    else if(down == true)
    {
      tempBullet.velocity.y = 400;
      //tempBullet.position.y += 5;
    }

    cooldownTimer = 0.5;
    bullets.push(tempBullet);*/
  }
}

Player.prototype.draw = function() {
  this.sprite.draw(context, this.position.x, this.position.y);
}
