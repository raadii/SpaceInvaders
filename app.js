// keeps track of keys being pressed
let keys = {};

// get the canvas and drawing context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// load hero image
let heroImg = new Image();
heroImg.src = "assets/player.png";

// load enemy image
let enemyImg = new Image();
enemyImg.src = "assets/enemyShip.png";

// hero starting position 
let hero = {
  x: canvas.width / 2 - 45,
  y: canvas.height - canvas.height / 4
};

// arrays to store enemies and lasers
let enemies = [];
let lasers = [];

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
      hero.x -= 10; 
      break;
    case "ArrowRight":
      hero.x += 10; 
      break;
    case "ArrowUp":
      hero.y -= 10; 
      break;
    case "ArrowDown":
      hero.y += 10; 
      break;
    case " ":
      
      lasers.push({
        x: hero.x + 45,
        y: hero.y,
        width: 5,
        height: 20
      });
      break;
  }
});

// move enemies downward
function moveEnemies() {
  enemies.forEach(enemy => {
    enemy.y += 5;
  });
}
// move lasers upward
function moveLasers() {
  lasers.forEach(laser => {
    laser.y -= 15;
  });
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
      }
    });
  });
}

// main game loop
function gameLoop() {

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
    ctx.fillStyle = "red";
    ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
  });

  // update game objects
  moveEnemies();
  moveLasers();
  detectCollisions();
}

// run the game loop every 100ms
setInterval(gameLoop, 100);