let rotating = false;
let t = 0;
let camZ = 400;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(17);

  if (keyIsDown(87) || keyIsDown(UP_ARROW)) camZ -= 10;
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) camZ += 10;

  camera(0, 0, camZ, 0, 0, 0, 0, 1, 0);

  ambientLight(60);
  directionalLight(255, 255, 255, 0.5, 1, -1);
  pointLight(255, 255, 255, -150, -100, 150);

  t += 0.01;

  if (rotating) {
    rotateX(mouseX * 0.01);
    rotateY(mouseY * 0.01);
  } else {
    rotateY(t);
  }

  // Body
  push();
  specularMaterial(220, 230, 255);
  shininess(255);
  scale(1, 0.25, 1);
  fill(180);
  noStroke();
  sphere(120);
  pop();

  // Rim
  push();
  specularMaterial(180, 195, 220);
  shininess(200);
  translate(0, 10, 0);
  rotateX(HALF_PI);
  fill(140);
  noStroke();
  torus(118, 10, 24, 6);
  pop();

  // Dome
  push();
  specularMaterial(140, 210, 255, 200);
  shininess(300);
  translate(0, -20, 0);
  fill(100, 180, 255, 200);
  noStroke();
  sphere(45, 12, 8);
  pop();
}

function keyPressed() {
  if (keyCode === 32) { 
    rotating = !rotating;
  }
}