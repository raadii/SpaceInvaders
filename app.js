const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let heroImg = new Image();
heroImg.src = "assets/player.png";

let enemyImg = new Image();
enemyImg.src = "assets/enemyShip.png";

let hero = { x: canvas.width / 2 - 45, y: canvas.height - canvas.height / 4 };

let enemies = [];

function createEnemies() {
  const ENEMY_TOTAL = 5;
  const ENEMY_SPACING = 98;

  const formationWidth = ENEMY_TOTAL * ENEMY_SPACING;
  const startX = (canvas.width - formationWidth) / 2;
  const stopX = startX + formationWidth;

  for (let x = startX; x < stopX; x += ENEMY_SPACING) {
    for (let y = 0; y < 50 * 5; y += 50) {
      enemies.push({ x: x, y: y });
    }
  }
}

createEnemies();

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
  }
});

function moveEnemies() {
  enemies.forEach(enemy => {
    enemy.y += 0.2;
  });
}

function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(heroImg, hero.x, hero.y);

  enemies.forEach(enemy => {
    ctx.drawImage(enemyImg, enemy.x, enemy.y);
  });

  moveEnemies();
}

setInterval(gameLoop, 50);