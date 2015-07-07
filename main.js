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

var deltaTime = getDeltaTime();

var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;

var gameState = STATE_SPLASH;

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var player = new Player();
var keyboard = new Keyboard();
var enemy = new Enemy();
var position = new Vector2();

var LAYER_COUNT = 2;
var LAYER_BACKGROUND = 0;
var LAYER_OBJECT_ENEMIES = 1;

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

var splashScreen = document.createElement("img");
splashScreen.src = "splashScreen.png";

var gameOverScreen = document.createElement("img");
gameOverScreen.src = "gameOver.png";

var heart = document.createElement("img");
heart.src = "Heart.png";

var shootTimer = 0;
var score = 0;
var lives = 3;
var damageTimer = 1;

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
    /*  for (var y = 0; y < map.layers[LAYER_OBJECT_ENEMIES].height; y++) {
        for (var x = 0; x < map.layers[LAYER_OBJECT_ENEMIES].width; x++) {
          if (map.layers[LAYER_OBJECT_ENEMIES].data[idx] != 0) {
            var px = tileToPixel(x);
            var py = tileToPixel(y);
            var e = new Enemy();
            enemies.push(e);
          }
          idx++;
        }
      }*/

  }

  musicBackground = new Howl({
    urls: ["bensound-acousticbreeze.mp3"],
    loop: true,
    buffer: true,
    volume: 0.2
  });
  musicBackground.play();

}

function playerShoot() {
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

function spawnEnemy() {
  var type = rand(0, 3);

  var ENEMY_SPEED = 500;

  var dirX = rand(-10, 10);
  var dirY = rand(-10, 10);

  var magnitude = (dirX * dirX) + (dirY * dirY);
  if (magnitude != 0) {
    var oneOverMag = 1 / Math.sqrt(magnitude);
    dirX *= oneOverMag;
    dirY *= oneOverMag;
  }
  var movX = dirX * SCREEN_WIDTH;
  var movY = dirY * SCREEN_HEIGHT;

  var x = SCREEN_WIDTH / 2;
  var y = SCREEN_HEIGHT / 2;

  enemy.x = x + movX;
  enemy.y = y + movY;

  enemy.velocityX = -dirX * ENEMY_SPEED;
  enemy.velocityY = -dirY * ENEMY_SPEED;

  enemies.push(enemy);
}

function rand(floor, ceil) {
  return Math.floor((Math.random() * (ceil - floor)) + floor);
}

function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (y2 + h2 < y1 ||
    x2 + w2 < x1 ||
    x2 > x1 + w1 ||
    y2 > y1 + h1) {
    return false;
  }
  return true;
}

function runSplash(deltaTime) {
  context.drawImage(splashScreen, 0, 0);
  if (keyboard.isKeyDown(13) == true)
    gameState = STATE_GAME;
  return;
}

function runGame(deltaTime) {

  var fireEmitter = createFireEmitter("fire.png", enemy.position.x, enemy.position.y);

  drawMap();
  player.update(deltaTime);

  fireEmitter.update(deltaTime);

          fireEmitter.draw();

  context.fillStyle = "yellow";
  context.font = "16px Arial";
  var scoreText = "Right: " + (keyboard.isKeyDown(68));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 16 + 100);
  var scoreText = "Left: " + (keyboard.isKeyDown(65));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 34 + 100);
  var scoreText = "Down: " + (keyboard.isKeyDown(83));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 52 + 100);
  var scoreText = "Up: " + (keyboard.isKeyDown(87));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 70 + 100);
  var scoreText = "Random: " + (rand(1, 4));
  context.fillText(scoreText, SCREEN_WIDTH - 170, 88 + 100);

   // score
context.fillStyle = "yellow";
context.font="32px Arial";
var scoreText = "Score: " + score;
context.fillText(scoreText, SCREEN_WIDTH - 160, 35);


  var spawnTimer = 0;
  spawnTimer -= deltaTime;
  if (enemies.length < 7) {
    if (spawnTimer <= 0) {
      spawnTimer = 3;
      spawnEnemy();
    }
  }

  for (var i = 0; i < enemies.length; i++) {
    for (var j = 0; j < bullets.length; j++) {
      if (intersects(
          bullets[j].x, bullets[j].y,
          bullets[j].width, bullets[j].height,
          enemies[i].position.x, enemies[i].position.y,
          enemies[i].width, enemies[i].height) == true) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score += 1;
      }
    }
  }

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].x += bullets[i].velocityX;
    bullets[i].y += bullets[i].velocityY;

    if (bullets[i].x < -bullets[i].width ||
      bullets[i].x > SCREEN_WIDTH ||
      bullets[i].y < -bullets[i].height ||
      bullets[i].y > SCREEN_HEIGHT) {
      bullets.splice(i, 1);

      break;
    }
  }

  for(var i = 0; i < enemies.length; i++)
  {
    if(intersects(
      enemies[i].position.x, enemies[i].position.y,
      enemies[i].width, enemies[i].height,
      player.position.x, player.position.y,
      player.width, player.height) == true && damageTimer <= 0) {
        lives -= 1;
        damageTimer = 1;
      }
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update(deltaTime);

    if (enemies[i].position.x > SCREEN_WIDTH + enemies[i].width + 1) {
      enemies[i].position.x = 0 - enemies[i].width;
    };
    if (enemies[i].position.x < 0 - enemies[i].width - 1) {
      enemies[i].position.x = SCREEN_WIDTH + enemies[i].width;
    };
    if (enemies[i].position.y > SCREEN_HEIGHT + enemies[i].height) {
      enemies[i].position.y = 0 - enemies[i].height;
    };
    if (enemies[i].position.y < 0 - enemies[i].height) {
      enemies[i].position.y = SCREEN_HEIGHT + enemies[i].height;
    };
  }

  player.draw();
  enemy.draw();

  for(var i=0; i<lives; i++)
  {
    context.drawImage(heart, 20+ ((heart.width + 2) * i), 10);
  }

  for (var i = 0; i < bullets.length; i++) {
    context.drawImage(bullets[i].image,
      bullets[i].x - bullets[i].width / 2,
      bullets[i].y - bullets[i].height / 2);
  }

  if(shootTimer > 0)
    shootTimer -= deltaTime;
  if(damageTimer > 0)
    damageTimer -= deltaTime;

  if(lives <= 0)
  {
    gameState = STATE_GAMEOVER;
  }
}

function runGameOver() {
  context.drawImage(gameOverScreen, 0, 0);
  context.fillStyle = "white";
  context.font = "42px Arial";
  context.fillText(score, SCREEN_WIDTH/2, SCREEN_HEIGHT/2 + 20);
}

function run() {
  context.fillStyle = "#ccc";
  context.fillRect(0, 0, canvas.width, canvas.height);
  //context.drawImage(background, 0, 0);

  var deltaTime = getDeltaTime();

  switch (gameState) {
    case STATE_SPLASH:
      runSplash(deltaTime);
      break;
    case STATE_GAME:
      runGame(deltaTime);
      break;
    case STATE_GAMEOVER:
      runGameOver(deltaTime);
      break;
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
