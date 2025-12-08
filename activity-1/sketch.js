function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background("#0b1220");

  const x = width * 0.5;
  const y = height * 0.45;
  const size = min(width, height) * 0.35;

  fill("#FFF7D6");
  ellipse(x, y, size, size);

  fill("#0b1220");
  ellipse(x + size * 0.3, y - size * 0.05, size * 0.9, size * 0.9);

  star(100);
}

function star(count) {
  randomSeed(1);
  fill(255, 255, 255);
  for (let i = 0; i < count; i++) {
    const x = random(width);
    const y = random(height);
    const size = random(1, 3);
    ellipse(x, y, size, size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
