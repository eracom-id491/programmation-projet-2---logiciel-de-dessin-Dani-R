let saveButton;
let PeutDessiner = false;
let Etape = 1;
let ZoneActuelle = 1;
let timer = 2;

function setup() {
  HauteurDeCase = windowHeight/3;
  createCanvas(windowWidth, windowHeight);
  saveButton = createButton("save");
  saveButton.position(width - 50, height - 25);
  saveButton.mousePressed(downloadImage);
  background(20);
  Limites();
}

function draw() {

  HauteurDeCase = windowHeight/3;

  //Zones Déttection
  Zones();

  //Rectangle latérale
  stroke(255);
  fill(0);
  rect(0,0,200,windowHeight);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Tête", 100, HauteurDeCase/2);
  text("Torse", 100, HauteurDeCase/2 * 3);
  text("Jambes", 100, HauteurDeCase/2 * 5);
  textSize(30);

  //Timer
  if(Etape < 4)
  {
    if(frameCount % 60 == 0){
      timer --;
    }
    if(timer <= 0)
    {
      Etape += 1;
      timer = 2;
    }
  }


  stroke(255);
  //Dessin
  if(mouseIsPressed) {
    if(Etape == ZoneActuelle)
    {
      line(mouseX, mouseY, pmouseX, pmouseY );
    }
  }
}

function Limites()
{
  fill(20);
  stroke(255);
  //Tête
  //Hauteur = de 0 à HauteurDeCase
  rect(0,0,windowWidth,HauteurDeCase);
  //Torse
  //Hauteur = de Hauteur de case à HauteurDeCase * 2;
  rect(0,HauteurDeCase,windowWidth,HauteurDeCase);
  //Jambes
  //Hauteur = de Hauteur de case à HauteurDeCase * 3;
  rect(0,HauteurDeCase*2,windowWidth,HauteurDeCase);
}

function Zones()
{
  fill(20);
  if(mouseY >= 0 && mouseY <= HauteurDeCase)
  {
    //Tête
    ZoneActuelle = 1;
    console.log(ZoneActuelle);
  }
  if(mouseY > HauteurDeCase && mouseY <= HauteurDeCase*2)
  {
    //Torse
    ZoneActuelle = 2;
    console.log(ZoneActuelle);
  }
  if(mouseY > HauteurDeCase*2 && mouseY <= HauteurDeCase*3)
  {
    //Jambes
    ZoneActuelle = 3;
    console.log(ZoneActuelle);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW)
  {
    Etape += 1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  saveButton.remove();
  saveButton = createButton("save");
  saveButton.position(width - 50, height - 25);
  saveButton.mousePressed(downloadImage);
  background(0);
  Limites();
}

function downloadImage() {
  save();
}
