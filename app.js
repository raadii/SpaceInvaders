// keeps track of keys being pressed
let keys = {};

// get the canvas and drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// load laser, hero, and enemy images
let laserImg = new Image();
laserImg.src = "assets/laserRed.png";

let heroImg = new Image();
heroImg.src = "assets/player.png";

let enemyImg = new Image();
enemyImg.src = "assets/enemyShip.png";

// life icon image
let lifeImg = new Image();
lifeImg.src = "assets/life.png";

// hero starting position
let hero = {
  x: canvas.width / 2 - 45,
  y: canvas.height - canvas.height / 4
};

// arrays to store enemies and lasers
let enemies = [];
let lasers = [];

// player stats
let lives = 3;
let points = 0;


let gameOver = false;
let win = false;

// prevent arrow keys from scrolling the page
window.addEventListener("keydown", function(e) {

  window.addEventListener("keydown", (e) => {

  if (gameOver && e.key === "Enter") {

    enemies = [];
    lasers = [];

    lives = 3;
    points = 0;

    gameOver = false;
    win = false;

    hero.x = canvas.width / 2 - 45;
    hero.y = canvas.height - canvas.height / 4;

    createEnemies();

  }

});
  if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) {
    e.preventDefault();
  }
});

function createEnemies() {

  // number of enemies per row
  const ENEMY_TOTAL = 5;
  const ENEMY_SPACING = 98;

  // calculate where formation should start
  const formationWidth = ENEMY_TOTAL * ENEMY_SPACING;
  const startX = (canvas.width - formationWidth) / 2;
  const stopX = startX + formationWidth;

  // create a 5x5 grid of enemies
  for (let x = startX; x < stopX; x += ENEMY_SPACING) {
    for (let y = 0; y < 50 * 5; y += 50) {
      enemies.push({
        x: x,
        y: y,
        width: 98,
        height: 50
      });
    }
  }
}

// generate enemies when the game starts
createEnemies();

// handle keyboard input and move hero
window.addEventListener("keydown", (e) => {

  switch (e.key) {

    case "ArrowLeft":
      hero.x -= 6;
      break;

    case "ArrowRight":
      hero.x += 6;
      break;

    case "ArrowUp":
      hero.y -=6;
      break;

    case "ArrowDown":
      hero.y += 6;
      break;

    case " ":
      lasers.push({
        x: hero.x + 45,
        y: hero.y,
        width: 9,
        height: 33
      });
      break;
  }
});

// move enemies downward
function moveEnemies() {
  enemies.forEach(enemy => {
    enemy.y += 2.5;
  });
}

// move lasers upward
function moveLasers() {

  lasers.forEach(laser => {
    laser.y -= 15;
  });

  // remove lasers that leave the screen
  lasers = lasers.filter(laser => laser.y > 0);
}

// check if lasers hit enemies
function detectCollisions() {
  lasers.forEach((laser, lIndex) => {
    enemies.forEach((enemy, eIndex) => {

      // simple rectangle collision check
      if (
        laser.x < enemy.x + enemy.width &&
        laser.x + laser.width > enemy.x &&
        laser.y < enemy.y + enemy.height &&
        laser.y + laser.height > enemy.y
      ){
        // remove enemy and laser if they collide
        enemies.splice(eIndex, 1);
        lasers.splice(lIndex, 1);

        // add points
        points += 100;
      }
    });
  });

  if (enemies.length === 0) {
  win = true;
  gameOver = true;
}

}

// check if hero collides with enemy
function detectHeroCollision() {
  enemies.forEach((enemy, index) => {
    if (
      hero.x < enemy.x + enemy.width &&
      hero.x + 98 > enemy.x &&
      hero.y < enemy.y + enemy.height &&
      hero.y + 75 > enemy.y
    ) {
      enemies.splice(index, 1);
      lives--;
    }
  });

  if (lives <= 0) {
  gameOver = true;
}
}

// draw points on screen
function drawPoints() {

  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "left";
  ctx.fillText("Points: " + points, 10, canvas.height - 20);

}

// draw life icons
function drawLife() {

  const START_POS = canvas.width - 180;

  for (let i = 0; i < lives; i++) {

    ctx.drawImage(
      lifeImg,
      START_POS + 45 * (i + 1),
      canvas.height - 37
    );

  }
}

// main game loop
function gameLoop() {

  if (gameOver) {
  ctx.font = "40px Arial";
  ctx.fillStyle = win ? "green" : "red";
  ctx.textAlign = "center";

  if (win) {
    ctx.fillText("YOU WIN! Press Enter to restart", canvas.width / 2, canvas.height / 2);
  } else {
    ctx.fillText("GAME OVER! Press Enter to restart", canvas.width / 2, canvas.height / 2);
  }

  return;
}

  // clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw black background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw hero ship
  ctx.drawImage(heroImg, hero.x, hero.y);

  // draw all enemies
  enemies.forEach(enemy => {
    ctx.drawImage(enemyImg, enemy.x, enemy.y);
  });

  // draw lasers
  lasers.forEach(laser => {
    ctx.drawImage(laserImg, laser.x, laser.y);
  });

  // update game objects
  moveEnemies();
  moveLasers();
  detectCollisions();
  detectHeroCollision();

  // draw UI
  drawPoints();
  drawLife();

}

// run the game loop every 100ms
setInterval(gameLoop, 100);