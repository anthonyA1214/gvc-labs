let brushColor = 0;
let brushSize = 10;

let startX, startY;
let layer;

let selectedColorIndex = 0;
let selectedTool = 'line';

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  layer = createGraphics(windowWidth, windowHeight);
  layer.background(255);
}

function draw() {
  image(layer, 0, 0);
  drawUI();

  if (mouseIsPressed && mouseY > 85) {
    layer.stroke(brushColor);
    layer.strokeWeight(brushSize);

    switch (selectedTool) {
      case 'line':
        layer.line(mouseX, mouseY, pmouseX, pmouseY);
        break;

      case 'eraser':
        layer.line(mouseX, mouseY, pmouseX, pmouseY);
        break;

      case 'circle':
        noFill();
        stroke(brushColor);
        strokeWeight(brushSize);
        ellipseMode(CORNERS);
        ellipse(startX, startY, mouseX, mouseY);
        break;

      case 'square':
        noFill();
        stroke(brushColor);
        strokeWeight(brushSize);
        rect(startX, startY, mouseX - startX, mouseY - startY);
        break;

      case 'triangle':
        noFill();
        stroke(brushColor);
        strokeWeight(brushSize);
        triangle(startX, startY, mouseX, mouseY, startX * 2 - mouseX, mouseY);
        break;
      // Shapes are drawn on mouse release
    }
  }
}

function drawUI() {
  noStroke();

  fill(220);
  rect(0, 0, width, 85);

  // row 1
  drawColorButton(10, 10, color(0, 0, 0), 0);
  drawColorButton(50, 10, color(255, 0, 0), 1);
  drawColorButton(90, 10, color(0, 255, 0), 2);
  drawColorButton(130, 10, color(0, 0, 255), 3);
  drawColorButton(170, 10, color(255, 255, 0), 4);
  // row 2
  drawColorButton(10, 45, color(255, 165, 0), 5);
  drawColorButton(50, 45, color(255, 192, 203), 6);
  drawColorButton(90, 45, color(128, 0, 128), 7);
  drawColorButton(130, 45, color(0, 255, 255), 8);
  drawColorButton(170, 45, color(139, 69, 19), 9);

  // brush sizes
  drawSizeButton(220, 10, '+');
  drawSizeButton(220, 45, '-');

  fill(0);
  textSize(18);
  textAlign(LEFT, CENTER);
  text('Brush Size: ' + brushSize, 260, 25);

  fill(255, 150, 0);
  rect(260, 45, 55, 25, 8);
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('CLEAR', 287.5, 57.5);
  
  fill(0, 200, 255);
  rect(320, 45, 55, 25, 8);
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('SAVE', 347.5, 57.5);

  drawShapeButton(385, 10, "line");
  drawShapeButton(430, 10, "circle");
  drawShapeButton(475, 10, "square");
  drawShapeButton(520, 10, "triangle");

  const eraserX = 385;
  const eraserY = 45;
  noStroke();
  fill(200);
  rect(eraserX, eraserY, 60, 30, 8);
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('ERASER', eraserX + 30, eraserY + 15);

  if (selectedTool === 'eraser') {
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(eraserX - 2, eraserY - 2, 64, 34, 8);
  }
} 

function drawColorButton(x, y, c, index) {
  if (index === selectedColorIndex) {
    fill(c);
    rect(x - 2, y - 2, 34, 34, 100);
  } else {
    fill(c);
    stroke(255);
    strokeWeight(0.5);
    rect(x, y, 30, 30, 100);
  }
}

function drawSizeButton(x, y, label) {
  fill(200);
  rect(x, y, 30, 30, 100);
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x + 15, y + 15);
}

function drawShapeButton(x, y, shape) {
  noStroke();
  fill(200);
  rect(x, y, 40, 30, 5);

  let cx = x + 20;
  let cy = y + 15;

  stroke(0);
  strokeWeight(2);
  noFill();
  switch (shape) {
    case "line":
      line(x + 8, y + 22, x + 32, y + 8);
      break;

    case "circle":
      ellipseMode(CENTER);
      ellipse(cx, cy, 20, 20);
      break;

    case "square":
      rect(cx - 10, cy - 10, 20, 20);
      break;

    case "triangle":
      triangle(cx, cy - 10, cx - 10, cy + 10, cx + 10, cy + 10);
      break;
  }

  if (selectedTool === shape) {
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(x - 2, y - 2, 44, 34, 5);
  }
}

function mousePressed() {
  startX = mouseX;
  startY = mouseY;

  // Check color buttons
  let colors = [
    color(0, 0, 0), color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0),
    color(255, 165, 0), color(255, 192, 203), color(128, 0, 128), color(0, 255, 255), color(139, 69, 19)
  ];
  
  // Check first row of color buttons
  if (mouseY >= 10 && mouseY <= 40) {
    for (let i = 0; i < 5; i++) {
      if (mouseX >= 10 + i * 40 && mouseX <= 40 + i * 40) {
        brushColor = colors[i];
        selectedColorIndex = i;
      }
    }
  }

  // Check second row of color buttons
  if (mouseY >= 45 && mouseY <= 75) {
    for (let i = 0; i < 5; i++) {
      if (mouseX >= 10 + i * 40 && mouseX <= 40 + i * 40) {
        brushColor = colors[i + 5];
        selectedColorIndex = i + 5;
      }
    }
  }

  // Check size buttons
  if (mouseX >= 220 && mouseX <= 250) {
    if (mouseY >= 10 && mouseY <= 40) {
        brushSize = min(100, brushSize + 1);
    } else if (mouseY >= 45 && mouseY <= 75) {
        brushSize = max(1, brushSize - 1);
    }
  }

  // Check clear button
  if (mouseX >= 260 && mouseX <= 315 && mouseY >= 45 && mouseY <= 70) {
    layer.background(255);
  }

  // Check save button
  if (mouseX >= 320 && mouseX <= 375 && mouseY >= 45 && mouseY <= 70) {
    saveCanvas(layer, 'myDrawing', 'png');
  }

  // Check shape buttons
  if (mouseY >= 10 && mouseY <= 40) {
    if (mouseX >= 385 && mouseX <= 425) {
      if (selectedColorIndex === -1) {
        brushColor = color(0, 0, 0);
      }
      selectedTool = "line";
    } else if (mouseX >= 430 && mouseX <= 470) {
      if (selectedColorIndex === -1) {
        brushColor = color(0, 0, 0);
      }
      selectedTool = "circle";
    } else if (mouseX >= 475 && mouseX <= 515) {
      if (selectedColorIndex === -1) {
        brushColor = color(0, 0, 0);
      }
      selectedTool = "square";
    } else if (mouseX >= 520 && mouseX <= 560) {
      if (selectedColorIndex === -1) {
        brushColor = color(0, 0, 0);
      }
      selectedTool = "triangle";
    }
  }

  // Check eraser button
  if (mouseX >= 385 && mouseX <= 445 && mouseY >= 45 && mouseY <= 75) {
    selectedTool = 'eraser';
    selectedColorIndex = -1;
    brushColor = color(255, 255, 255);
  }
}

function mouseReleased() {
  // For shapes, finalize the drawing on mouse release
  if (mouseY > 85) {
    switch (selectedTool) {
      case 'circle':
        layer.ellipseMode(CORNERS);
        layer.ellipse(startX, startY, mouseX, mouseY);
        break;

      case 'square':
        layer.rect(startX, startY, mouseX - startX, mouseY - startY);
        break;

      case 'triangle':
        layer.triangle(startX, startY, mouseX, mouseY, startX * 2 - mouseX, mouseY);
        break;
    }
  }
}