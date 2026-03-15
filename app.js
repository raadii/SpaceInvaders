const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);


const heroImg = new Image();
heroImg.src = "assets/player.png";

const enemyImg = new Image();
enemyImg.src = "assets/enemyShip.png";


heroImg.onload = () => {

    ctx.drawImage(heroImg, canvas.width / 2 - 45, canvas.height - canvas.height / 4);

    drawEnemies();
};

function drawEnemies() {

    const ENEMY_TOTAL = 5;
    const ENEMY_SPACING = 98;
    const formationWidth = ENEMY_TOTAL * ENEMY_SPACING;
    const startX = (canvas.width - formationWidth) / 2;
    const stopX = startX + formationWidth;

    for (let x = startX; x < stopX; x += ENEMY_SPACING) {
        for (let y = 0; y < 50 * 5; y += 50) {
            ctx.drawImage(enemyImg, x, y);
        }
    }
}