let targetX = 500; // where the ball starts
let targetY = 500;
let targetVx = 6; // velocity
let targetVy = 4;

let size = 45; // ball size
let r = size / 2; // for detecting the edges of the ball

let playerX = 100;
let playerY = 100;
let playerVx = 6;
let playerVy = 4;

let score = 0
let walls = [
  { x: 0,   y: 250, w: 350, h: 20 }, 
  { x: 330, y: 250, w: 20,  h: 200 }, 
  { x: 330, y: 450, w: 390, h: 20 },
  { x: 480, y: 0,   w: 20,  h: 700 }, 
  { x: 700, y: 200, w: 20,  h: 250 } 
];

function setup() {
  createCanvas(900, 600);
  placeTargetSafely();
}

function draw() {
  background(255);

  // walls
  fill(0);
  for (let wall of walls) {
    rect(wall.x, wall.y, wall.w, wall.h);
  }

  // =======================================================
  // player

  fill(0, 0, 255);
  circle(playerX, playerY, size);

  // movement
  // horizontal movement
  let nextX = playerX;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) nextX -= playerVx;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) nextX += playerVx;
  if (!collides(nextX, playerY)) {
    playerX = nextX;
  }

  // vertical movement
  let nextY = playerY;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) nextY -= playerVy;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) nextY += playerVy;
  if (!collides(playerX, nextY)) {
    playerY = nextY;
  }

  // player wrap
  if (playerX + r < 0) playerX = width + r;
  if (playerX - r > width) playerX = 0 - r;
  if (playerY + r < 0) playerY = height + r;
  if (playerY - r > height) playerY = 0 - r;

  // =======================================================
  // target

  fill(255, 0, 0);
  circle(targetX, targetY, size);

  // target movement
  targetX += targetVx;
  targetY += targetVy;

  // target wrap
  if (targetX + r < 0) targetX = width + r;
  if (targetX - r > width) targetX = 0 - r;
  if (targetY + r < 0) targetY = height + r;
  if (targetY - r > height) targetY = 0 - r;

  // invert velocity on upcoming wall collision
  if (collides(targetX + targetVx, targetY)) {
    targetVx = -targetVx;
  }
  if (collides(targetX, targetY + targetVy)) {
    targetVy = -targetVy;
  }

  // =======================================================
  let d = dist(playerX, playerY, targetX, targetY);
  if (d < r * 2) {
    score++;
    placeTargetSafely();
  }

  // score display
  textSize(16);
  fill(0);
  text("Score: " + score, 10, 20);
}

function collides(x, y) {
  for (let wall of walls) {
    if (
      x + r > wall.x &&
      x - r < wall.x + wall.w &&
      y + r > wall.y &&
      y - r < wall.y + wall.h
    ) {
      return true;
    }
  }
  return false;
}

function placeTargetSafely() {
  const maxAttempts = 1000;

  for (let i = 0; i < maxAttempts; i++) {
    const x = random(r, width - r);
    const y = random(r, height - r);
    if (!collides(x, y)) {
      targetX = x;
      targetY = y;
      return;
    }
  }

  // fallback if no position found
  targetX = 500;
  targetY = 500;
}