let saveButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  saveButton = createButton("save");
  saveButton.position(width - 50, height - 25);
  saveButton.mousePressed(downloadImage);
  background(0);
}

function draw() {
  fill(0);
  rect(width - 50, height - 25, 50, 25);
  stroke(255);
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  saveButton.remove();
  saveButton = createButton("save");
  saveButton.position(width - 50, height - 25);
  saveButton.mousePressed(downloadImage);
  background(0);
}

function downloadImage() {
  save();
}
