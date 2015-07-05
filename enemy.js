var ANIM_WALK = 0;

var Enemy = function() {
  this.sprite = new Sprite("enemyplaceholder.png");
  this.sprite.buildAnimation(4, 2, 498, 292, 0.05, [0,1,2,3,4,5,6,7]);
  this.sprite.setAnimationOffset(0, 0, 0);
  this.sprite.setLoop(0, false);

  this.position = new Vector2();

  this.width = 498;
  this.height = 292;

  this.moveVector = new Vector2();
};

Enemy.prototype.update = function(deltaTime) {
  this.sprite.update(deltaTime);
  this.sprite.setAnimation(ANIM_WALK);

  this.moveVector.x = 0;
  this.moveVector.y = 0;

  if(rand(1,4) == 1)
  this.moveVector.x = -1; //Left
  if(rand(1,4) == 2)
  this.moveVector.x = 1;
  if(rand(1,4) == 3)
  this.moveVector.y = 1;
  if(rand(1,4) == 4)
  this.moveVector.y = -1;

  this.position.x += this.moveVector.x;
  this.position.y += this.moveVector.y;

}

Enemy.prototype.draw = function() {
  this.sprite.draw(context, this.position.x, this.position.y);
}
