

var bullets = [];

var Player = function() {
this.image = document.createElement("img");
this.position = new Vector2();
this.position.set(9*35, 0*35);
this.velocityX = 0;
this.velocityY = 0;
this.angularVelocity = 0;
this.velocity = new Vector2();
this.width = 159;
this.height = 163;
//this.rotation = 0;
//this.image.src = "hero.png";
};
var player = new Player();

Player.prototype.update = function(deltaTime)
{
if( typeof(this.rotation) == "undefined" )
this.rotation = 0; 
this.rotation += deltaTime;
}
Player.prototype.draw = function()
{
context.save();
context.translate(this.x, this.y);
//context.rotate(this.rotation);
//context.drawImage(this.image, -this.width/2, -this.height/2);
context.restore();
}