var bullets = [];
var LEFT = 0;
var RIGHT = 1;
var UP = 2;
var DOWN = 3;

var ANIM_WALK_LEFT = 0;
var ANIM_WALK_RIGHT = 1;
var ANIM_WALK_UP = 2;
var ANIM_WALK_DOWN = 3;


var Player = function() {
  this.sprite = new Sprite("playerplaceholder.png");
  this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
  this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
  this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
  this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
  this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
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
    this.moveVector.x = 100 * deltaTime;
  if (keyboard.isKeyDown(keyboard.KEY_LEFT))
    this.moveVector.x = -100 * deltaTime;

  if (keyboard.isKeyDown(keyboard.KEY_DOWN))
    this.moveVector.y = 100 * deltaTime;
  if (keyboard.isKeyDown(keyboard.KEY_UP))
    this.moveVector.y = -100 * deltaTime;

  this.position.x += this.moveVector.x;
  this.position.y += this.moveVector.y;

}

Player.prototype.draw = function() {
  this.sprite.draw(context, this.position.x, this.position.y);
}
