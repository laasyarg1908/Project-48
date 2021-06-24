
var plane, planeImg;
var asteroid, asteroidImg;
var bg, bgImg;
var missile, missileImg;
var missileGroup, asteroidGroup;
var score = 0;
var gamestate = "play";
var earth, endImg, endImg2;
var endBg;

function preload()
{
  //loading all images
    planeImg = loadImage("img/plane.png");
    asteroidImg = loadImage("img/asteroid.png");
    bgImg = loadImage("img/bg.jpg");
    missileImg = loadImage("img/missile.png");
    endImg = loadImage("img/earth.png");
    endImg2 = loadImage("img/destroyed.png");
}


function setup() 
{
  createCanvas(800, 600);

  bg = createSprite(400, 300, 800, 600);
  bg.addImage(bgImg);
  bg.scale = 1.2;

  //creating plane
    plane = createSprite(400, 500, 50, 50);
    plane.addImage(planeImg);
    plane.scale = 0.3;
    //plane.debug = true;
    plane.setCollider("rectangle", 0, -50, 450, 40);

    asteroidGroup = new Group();
    missileGroup = new Group();

    earth = createSprite(400, 595, 800, 10);
    earth.visible = false;

    endBg = createSprite(400, 300, 400, 300);
    endBg.addImage(endImg2);
    endBg.scale = 1.25;
    endBg.visible = false;

}

function draw() 
{

  background("black"); 

  if (gamestate === "play")
  {
     

    //making plane move according to arrow keys
    if (keyDown(RIGHT_ARROW))
    {
      plane.x = plane.x + 10;
    }

    if (keyDown(LEFT_ARROW))
    {
      plane.x = plane.x - 10;
    }

    //calling asteroid spawning function
    spawnAsteroids();

    if (keyDown("space"))
    {
      createMissile();
    }

    //destroying missile and asteroid if they collide
    if (asteroidGroup.isTouching(missileGroup))
    {
      asteroidGroup.destroyEach();
      missileGroup.destroyEach();
      score += 1;
    }

    if (asteroidGroup.isTouching(earth) || asteroidGroup.isTouching(plane))
    {
      gamestate = "end";
    }

  }

  

  if (gamestate ===  "end")
  {
    if (asteroidGroup.isTouching(earth))
    {
      asteroidGroup.destroyEach();
      missileGroup.destroyEach();
      plane.destroy();
      bg.destroy();
      //background("black");
      endBg.visible = true;
      

    }
    else 
    if (asteroidGroup.isTouching(plane))
    {
      asteroidGroup.destroyEach();
      missileGroup.destroyEach();
      plane.destroy();
      bg.destroy();
      //background("black");
      endBg.visible = true;
      
    }
  }

  drawSprites();

  if (gamestate === "play")
  {
    fill("white");
    textSize(20);
    text("UsE aRrOw KeYs tO MoVe aNd SpAcE kEy To sHoOt!", 150, 20);

    fill("white");
    textSize(20);
    text("SCORE: "+score, 40, 120);
  }
  else 
  {
    textSize(25);
    stroke("purple");
    strokeWeight(3);
    fill("red");
    text("mIsSiOn FaIlEd...eArTh DeStRoYeD", 160, 100);
  }
      

}

//function to create asteroids every 60 frames
function spawnAsteroids()
{
    if(frameCount % 60 === 0)
    {          
      asteroid = createSprite(random(50, 550), 10, 30, 30);
      asteroid.addImage(asteroidImg);
      asteroid.scale = 0.15;
      asteroid.velocityY = 4 + frameCount/240;
      asteroid.lifetime = 200;
      //asteroid.debug = true;   
      asteroidGroup.add(asteroid);
    }
}

//creating missile
function createMissile()
{
  missile = createSprite(plane.x, 470, 20, 50);
  missile.addImage(missileImg);
  missile.scale = 0.15;
  missile.velocityY = -5;
  missile.lifetime = 200;
  //missile.debug = true;
  missile.setCollider("rectangle", 0, 0, 30, 50);
  missileGroup.add(missile);
}
