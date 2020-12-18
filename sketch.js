var ghost,ghostImg
var door,doorImg,doorGroup
var tower,towerImg
var climber,climberImg
var invisibleBlockGroup,invisibleBlock;
var gameState="play";

function preload(){
 towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost_standing.png");
}

function setup(){
  createCanvas(600,600);
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  
  tower=createSprite(300,300,20,20);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(300,300,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  
  
  
}

function draw(){
  background("black");
  
  if(gameState==="play"){
    
  
  if(tower.y>600){
    tower.y=300;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  spawnDoors();
  drawSprites();
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Gameover",250,300);
  }
}
function spawnDoors(){
  if(frameCount%150===0){
    door=createSprite(200,-50,20,20);
    door.addImage("door",doorImg);
    door.x=Math.round(random(100,500))
    door.velocityY=1;
    door.scale=0.5;
    door.lifetime=600;
    doorGroup.add(door);
    
    climber=createSprite(200,-20,20,20);
    climber.addImage("climber",climberImg);
    climber.velocityY=1;
    climber.x=door.x;
    climber.scale=0.5;
    climber.lifetime=600;
    climberGroup.add(climber);
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleBlock=createSprite(200,-20,20,1);
    invisibleBlock.debug=true;
    invisibleBlock.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.width=climber.width/2;
    
    
    
  }
  
  
}
