let saveButton;
let PeutDessiner = false;
let Etape = 1;
let EtapeSTRING = ["","une tete", "un torse", "des jambes"];
let Animaux = ["chien","chat","poissson","giraffe","crocodile","pingouin","singe","pigeon","poulet","vache","chevre"];
let ZoneActuelle = 1;
let timer = 10;
let myFont;
let AnimalRandom;

function preload() {
  myFont = loadFont('font/Minecraft.ttf');
}

function setup() {
  AnimalRandom = random(Animaux);
  textFont(myFont);
  HauteurDeCase = windowHeight/3;
  createCanvas(windowWidth, windowHeight);
  saveButton = createButton("save");
  saveButton.position(width - 50, height - 25);
  saveButton.mousePressed(downloadImage);
  background(20);
  Limites();
  fill(255);
  noStroke();
  textAlign(LEFT, CENTER)
  textSize(50);
  text("Tete", 100, HauteurDeCase/2);
  text("Torse", 100, HauteurDeCase/2 * 3);
  text("Jambes", 100, HauteurDeCase/2 * 5);
  textSize(18);
  textAlign(CENTER, CENTER)
}

function draw() {

  HauteurDeCase = windowHeight/3;
  noStroke();
  fill(20);
  rectMode(CENTER);
  rect(windowWidth/2, 50, 500, 25);
  fill(255);
  if(Etape < 4)
  {
    text("Tu as " + timer + " secondes pour dessiner " + EtapeSTRING[Etape] + " de " + AnimalRandom, windowWidth/2,50);
  }
  else if(Etape >= 4)
  {
    text("Ton hybride est fini!",windowWidth/2,50);
  }
  stroke(255);

  //Zones Déttection
  Zones();

  //Timer
  if(frameCount % 60 == 0){
    timer --;
  }
  if(timer <= 0)
  {
    Etape += 1;
    AnimalRandom = random(Animaux);
    timer = 10;
  }

  if(Etape == 1)
  {
    noStroke();
    fill(0,255,0);
    rect(0, 0, 50, (HauteurDeCase* 2));
  }
  else
  {
    noStroke();
    fill(20);
    rect(0, 0, 50, (HauteurDeCase* 2));
  }
  if(Etape == 2)
  {
    noStroke();
    fill(0,255,0);
    rect(0, HauteurDeCase, 50, (HauteurDeCase* 2));
  }
  else if(Etape > 2)
  {
    noStroke();
    fill(20);
    rect(0, HauteurDeCase, 50, (HauteurDeCase* 2));
  }
  if(Etape == 3)
  {
    noStroke();
    fill(0,255,0);
    rect(0, 0, 50, (HauteurDeCase* 2)*5);
  }
  else if(Etape > 3)
  {
    noStroke();
    fill(20);
    rect(0, 0, 50, (HauteurDeCase* 2)*5);
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
  strokeWeight(3);
  //Tête
  //Hauteur = de 0 à HauteurDeCase
  //Torse
  //Hauteur = de Hauteur de case à HauteurDeCase * 2;
  line(0,HauteurDeCase,windowWidth,HauteurDeCase)
  //Jambes
  //Hauteur = de Hauteur de case à HauteurDeCase * 3;
  line(0,HauteurDeCase*2,windowWidth,HauteurDeCase*2);
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
