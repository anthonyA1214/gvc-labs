let x = 500; // where the ball starts
let y = 500;

let vx = 6; // velocity
let vy = 4;

let size = 60; // ball size
let r = size / 2; // for detecting the edges of the ball

function setup() {
  createCanvas(900, 600);
}

function draw() {
  background(255);

  fill(0, 0, 255); // drawing the ball
  circle(x, y, size);

  x += vx; // movement
  y += vy;

  // collision
  if (x - r <= 0 || x + r >= width) vx *= -1;
  if (y - r <= 0 || y + r >= height) vy *= -1;
}
