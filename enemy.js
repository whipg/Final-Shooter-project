var Enemy = function() {
  this.sprite = new Sprite("enemyplaceholder.png");

  this.position = new Vector2();
  this.position.set(200, 200);

  this.width = 32;
  this.height = 48;

  this.moveVector = new Vector2();
};

Enemy.prototype.update = function(deltaTime) {
  this.sprite.update(deltaTime);

  this.moveVector.x = 0;
  this.moveVector.y = 0;

  this.position.x += this.moveVector.x;
  this.position.y += this.moveVector.y;

}

Enemy.prototype.draw = function() {
  this.sprite.draw(context, this.position.x, this.position.y);
}