var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

function getDeltaTime() {
  endFrameMillis = startFrameMillis;
  startFrameMillis = Date.now();

  // Find the delta time (dt) - the change in time since the last drawFrame
  // We need to modify the delta time to something we can use.
  // We want 1 to represent 1 second, so if the delta is in milliseconds
  // we divide it by 1000 (or multiply by 0.001). This will make our
  // animations appear at the right speed, though we may need to use
  // some large values to get objects movement and rotation correct
  var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

  // validate that the delta is within range
  if (deltaTime > 1)
    deltaTime = 1;

  return deltaTime;
}

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var player = new Player();
var keyboard = new Keyboard();
var enemy = new Enemy();
var position = new Vector2();
var bullet = new Bullet();
var LAYER_COUNT = 3;
var LAYER_BACKGROUND = 0;
var LAYER_OBJECT_ENEMIES = 1;
var LAYER_OBJECT_TRIGGERS = 2;

var MAP = {
  tw: 100,
  th: 100
};
var TILE = 32;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

//Physics
var METER = TILE;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;
var JUMP = METER * 1500;
var GRAVITY = METER * 9.8 * 6;

var enemies = [];
var bullets = [];
var tileset = document.createElement("img");
tileset.src = "0.png";

function cellAtPixelCoord(layer, x, y) {
  if (x < 0 || x > SCREEN_WIDTH || y < 0)
    return 1;
  // let the player drop of the bottom of the screen (this means death)
  if (y > SCREEN_HEIGHT)
    return 0;
  return cellAtTileCoord(layer, p2t(x), p2t(y));
};

function cellAtTileCoord(layer, tx, ty) {
  if (tx < 0 || tx >= MAP.tw || ty < 0)
    return 1;
  // let the player drop of the bottom of the screen (this means death)
  if (ty >= MAP.th)
    return 0;
  return cells[layer][ty][tx];
};

function tileToPixel(tile) {
  return tile * TILE;
};

function pixelToTile(pixel) {
  return Math.floor(pixel / TILE);
};

function bound(value, min, max) {
  if (value < min)
    return min;
  if (value > max)
    return max;
  return value;
}

function drawMap() {
  for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
    var idx = 0;
    for (var y = 0; y < map.layers[layerIdx].height; y++) {
      for (var x = 0; x < map.layers[layerIdx].width; x++) {
        if (map.layers[layerIdx].data[idx] != 0) {
          // the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
          // correct tile
          var tileIndex = map.layers[layerIdx].data[idx] - 1;
          var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
          var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
          context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x * TILE, (y - 1) * TILE, TILESET_TILE, TILESET_TILE);
        }
        idx++;
      }
    }
  }
}

var musicBackground;

var cells = []; // the array that holds our simplified collision data
function initialize() {
  for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) { // initialize the collision map
    cells[layerIdx] = [];
    var idx = 0;
    idx = 0;
    for (var y = 0; y < map.layers[LAYER_OBJECT_ENEMIES].height; y++) {
      for (var x = 0; x < map.layers[LAYER_OBJECT_ENEMIES].width; x++) {
        if (map.layers[LAYER_OBJECT_ENEMIES].data[idx] != 0) {
          var px = tileToPixel(x);
          var py = tileToPixel(y);
          var e = new Enemy(px, py);
          enemies.push(e);
        }
        idx++;
      }
    }

}

  musicBackground = new Howl(
  {
    urls: ["bensound-acousticbreeze.mp3"],
    loop: true,
    buffer: true,
    volume: 0.2
  });
  musicBackground.play();

}

function playerShoot()
{
        var bullet = {
                image: document.createElement("img"),
                x: player.position.x,
                y: player.position.y,
                width: 5,
                height: 5,
                velocityX: 0,
                velocityY: 0,
        };

        bullet.image.src = "bullet.png";

        var BULLET_SPEED = 6;

        var velX = 0;
        var velY = 1;

        var s = Math.sin(player.rotation);
        var c = Math.cos(player.rotation);

        var xVel = (velX * c) - (velY * s);
        var yVel = (velX * s) + (velY * c);

        bullet.velocityX = xVel * BULLET_SPEED;
        bullet.velocityY = yVel * BULLET_SPEED;

        bullets.push(bullet);
};

function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (y2 + h2 < y1 ||
    x2 + w2 < x1 ||
    x2 > x1 + w1 ||
    y2 > y1 + h1) {
    return false;
  }
  return true;
}

function run() {
  context.fillStyle = "#ccc";
  context.fillRect(0, 0, canvas.width, canvas.height);
  //context.drawImage(background, 0, 0);

  var deltaTime = getDeltaTime();

  drawMap();
  player.update(deltaTime);

  context.fillStyle = "yellow";
  context.font = "16px Arial";
  var scoreText = "Right: " + (keyboard.isKeyDown(68));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 16);
  var scoreText = "Left: " + (keyboard.isKeyDown(65));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 34);
  var scoreText = "Down: " + (keyboard.isKeyDown(83));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 52);
  var scoreText = "Up: " + (keyboard.isKeyDown(87));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 70);

  /*var hit = false;
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].update(deltaTime);
    if (bullets[i].position.x < 0 ||
      bullets[i].position.x > SCREEN_WIDTH) {
      hit = true;
    }

    for (var j = 0; j < enemies.length; j++) {
      if (intersects(bullets[i].position.x, bullets[i].position.y, TILE, TILE) == true) {
        enemies.splice(j, 1);
        hit = true;
        break;
      }
    }
    if (hit == true) {
      bullets.splice(i, 1);
      break;
    }
  }
  for (var j = 0; j < enemies.length; j++) {
    if (Player.isDead = false) {
      if (intersects(enemies[j].position.x, enemies[j].position.y, TILE, TILE, Player.position.x, Player.position.y, Player.width / 2, Player.height / 2) == true) {
        lives -= 1;
        player.position.set(2 * 35, 17 * 35);
        sfxDamage.play();
        break;
      }
    }
  }

  if (keyboard.isKeyDown(keyboard.KEY_SHOOT) == true) {
    context.fillStyle = "#F02936";
    context.font = "14px Arial"
    context.fillText("Click!", SCREEN_WIDTH - 170, 35);
  }*/

  player.draw();

  /*  for(var i=0; i<enemies.length; i++)
    {
        enemies[i].update(deltaTime);
    }*/
    for(var i=0; i<bullets.length; i++)
                    {
                            context.drawImage(bullets[i].image,
                            bullets[i].x - bullets[i].width/2,
                            bullets[i].y - bullets[i].height/2);
                    }

}
initialize();

//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is
// called 60 times per second. We have some options to fall back on
// in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() {
        cb();
        window.requestAnimationFrame(_cb);
      }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() {
        cb();
        window.mozRequestAnimationFrame(_cb);
      }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }

  window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);
