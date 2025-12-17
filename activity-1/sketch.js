function setup() {
  createCanvas(900, 600);
}

function draw() {
  background(255);
  strokeWeight(3)

  // mountain1
  triangle(
    -25, 600,   
    225, 250,   
    425, 600
  );

  // mountain2
  triangle(
    425, 600,   
    675, 280,   
    925, 600    
  );

  // cloud1
  circle(150, 150, 50);
  circle(180, 135, 65);
  circle(220, 150, 50);

  // cloud2
  circle(650, 160, 50);
  circle(680, 150, 70);
  circle(720, 160, 50);

  // sun
  circle(450, 300, 120);
}
