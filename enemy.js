var Enemy = function() {
  this.sprite = new Sprite("animals-cat.png");
  //this.sprite.buildAnimation(4, 2, 498, 292, 0.05, [0,1,2,3,4,5,6,7]);
  this.sprite.buildAnimation(1, 1, 133, 100, -1, [0]);
  this.sprite.setAnimationOffset(0, 0, 0);
  this.sprite.setLoop(0, false);

  this.position = new Vector2();

  this.width = 133;
  this.height = 100;

  this.moveVector = new Vector2();
};

Enemy.prototype.update = function(deltaTime) {
  this.sprite.update(deltaTime);

  this.moveVector.x = 0;
  this.moveVector.y = 0;

  if (rand(1, 4) == 1)
    this.moveVector.x = -100 * deltaTime; //Left
  if (rand(1, 4) == 2)
    this.moveVector.x = 100 * deltaTime;
  if (rand(1, 4) == 3)
    this.moveVector.y = 100 * deltaTime;
  if (rand(1, 4) == 4)
    this.moveVector.y = -100 * deltaTime;

  this.position.x += this.moveVector.x;
  this.position.y += this.moveVector.y;

}

Enemy.prototype.draw = function() {
  this.sprite.draw(context, this.position.x, this.position.y);
}
