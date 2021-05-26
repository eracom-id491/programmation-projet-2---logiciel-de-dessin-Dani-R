//ints
let ZoneActuelle = 1;
let tempspourdessiner = 20;
let Etape = 1;
let taille;
//floats 
let timer;
//Listes
let EtapeSTRING = ["","une tete", "un torse", "des jambes"];
let Animaux = ["chien","chat","poissson","giraffe","crocodile","pingouin","singe","pigeon","poulet","vache","chevre","phasme"];
//Bool
let start = false;
//Autres
let myFont;
let AnimalRandom;
let saveButton;

//Load font
function preload() {
  myFont = loadFont('font/Minecraft.ttf');
}

function setup() {
  //Definir les variables
  HauteurDeCase = windowHeight/3;
  timer = tempspourdessiner;
  textFont(myFont);
  taille = 1;
  AnimalRandom = random(Animaux);
  //Canvas
  createCanvas(windowWidth, windowHeight);
  background(20);
  //Bouton sauvegarde
  saveButton = createButton("save");
  saveButton.position(width - 50, height - 25);
  saveButton.mousePressed(downloadImage);
  //Afficher les limites
  Limites();
  //Text Indicatif
  textIndicatif();
}

function textIndicatif()
{
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

  if(start == false)
  {
    noStroke();
    fill(20);
    rectMode(CENTER);
    rect(windowWidth/2, 50, 500, 25);
    fill(255);
    text("Clique pour commencer le jeu",windowWidth/2,50);
  }
  if(start == true)
  {
    HauteurDeCase = windowHeight/3;
    textcentral();
  
    //Zones Déttection
    Zones();
  
    //Timer
    Temps();

    //change de zone
    changerdezone();

    stroke(255);
    //Dessin
    if(mouseIsPressed) {
      if(Etape == ZoneActuelle)
      {
        strokeWeight(taille);
        line(mouseX, mouseY, pmouseX, pmouseY);
      }
    }
  }
}

//Text instructions
function textcentral()
{
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
}

//Détecte si il faut changer de zone
function changerdezone()
{
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
  if(Etape >= 3)
  {
    noStroke();
    fill(0,255,0);
    rect(0, 0, 50, (HauteurDeCase* 2)*5);
  }
}

//Compteur
function Temps()
{
  if(frameCount % 60 == 0){
    timer --;
  }
  if(timer <= 0)
  {
    Etape += 1;
    AnimalRandom = random(Animaux);
    stroke(20);
    if(Etape >= 2)
    {
      line(0,HauteurDeCase,windowWidth,HauteurDeCase)
    }
    if(Etape >= 3)
    {
      line(0,HauteurDeCase*2,windowWidth,HauteurDeCase*2);
    }
    timer = tempspourdessiner;
  }
}

//Dessiner les limites
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
//Lancer le jeu
function mouseClicked() {
  start = true;
}
//Zones dessinables
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  saveButton.remove();
  saveButton = createButton("save");
  saveButton.position(width - 50, height - 25);
  saveButton.mousePressed(downloadImage);
  background(0);
  Limites();
}
//Sauvegarder l'image avec la touche S
function keyTyped() {
  if (key === 's') {
    downloadImage();
  }
}

//Changer la taille du piceau avec les fléches
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if(taille > 1)
    {
      taille--;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if(taille < 10)
    {
      taille++;
    }
  }
}
//Changer la taille du pinceau avec la molette
function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  //uncomment to block page scrolling
  //return false;
  if(event.delta < 0)
  {
    if(taille > 1)
    {
      taille-=0.4;
    }
  }
  else if(event.delta > 0)
  {
    if(taille < 10)
    {
      taille+=0.4;
    }
  }
}

function downloadImage() {
  save("Hybride.jpg");
}
