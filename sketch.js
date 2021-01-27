var PLAY=1;
var END=0;
var gameState=1;
var sword,fruit,fruits,monster,fruitGroup,enemyGroup, score,r,fruitGroup1;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var gameOverSound ,knifeSwoosh

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwoosh = loadSound("knifeSwooshSound.mp3");
 
}

function setup(){
  createCanvas(600, 600);
   
  sword=createSprite(50,250,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  fruitGroup1=createGroup();
}

function draw()
{
  background("lightblue");
  knifeSwoosh.play();
 
  
  
  
  if(gameState===PLAY)
  {
    
    
    fruits();
    Enemy();
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    
    if(fruitGroup.isTouching(sword))
    {
    fruitGroup.destroyEach();
   
    score=score+2;
    knifeSwoosh.play();
    }
  
     if(enemyGroup.isTouching(sword))
     {
        gameState=END;
        
        
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
      gameOverSound.play();
      
     }
  }
     drawSprites();
  
  text("Score : "+ score,300,30);
  
}
function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits()
{
  if(World.frameCount%80===0){
     fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-(7+(score/10));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    if(frameCount%100===0)
    {
      fruits.velocityX=fruits.velocityX-2;
    }
   }
  
}
