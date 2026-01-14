function setup() {
  createCanvas(900, 600);
}

let size = 40;

function draw() {
  background(255);
  
  ellipse(mouseX, mouseY, size);
}

function keyIsDown() {
  if (key === "W" || key === "w") size++;
  if (key === "S" || key === "s") size--;
}

function mousePressed() {
  console.log(size)
}