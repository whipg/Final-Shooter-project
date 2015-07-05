var Bullet = function(x, y, moveRight) {
  this.sprite = new Sprite("bullet.png");
  this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
  this.sprite.setAnimationOffset(0, 0, 0);
  this.sprite.setLoop(0, false);

  this.position = new Vector2();
  this.position.set(x, y);

  this.velocity = new Vector2();

  var BULLET_SPEED = 450;

  this.moveRight = moveRight;
  this.moveLeft = true;
  if (this.moveRight == true)
    this.velocity.set(MAXDX * 2, 0);
  else
    this.velocity.set(-MAXDX * 2, 0);
};

Bullet.prototype.update = function(deltaTime)
{
  this.sprite.update(deltaTime);
  this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
  this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
}

Bullet.prototype.draw = function() {
  this.sprite.draw(context, screenX, this.position.y);
}