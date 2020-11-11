var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, bananaGroup, obstacleGroup;
var ground, groundImage;
var score = 0;
var survivalTime = 0;
var GameState;
var PLAY;
var END;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  
}



function setup() {
 
  createCanvas(600,300);
  
  PLAY = 1;
  GameState = PLAY;
  END = 0;

  
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  monkey = createSprite(80,210,10,10);
  monkey.scale = 0.135;
  monkey.addAnimation("monkey", monkey_running);

  
  ground = createSprite(300, 260, 600, 10);
  ground.velocityX = -3;
  ground.shapeColor = "green";
 

  
}


function draw() {

  background("lightblue");
  
 if (GameState === PLAY) {

 if (ground.x < 600){
      ground.x = ground.width/2;
    }
  
  fill("red");
  text("Score : " + score, 420, 30);
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival time : " + survivalTime, 420, 50);
  
  if (keyDown("space")) {
  monkey.velocityY = -6;
  }
  
 if (monkey.y <= 50) {
  monkey.velocityY = 5;
  }
  
  monkey.collide(ground);
  
  if (frameCount % 80 === 0) {
  banana = createSprite(400, 75, 10, 10);
  banana.y = Math.round(random(20,120));
  banana.velocityX = -3; 
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.lifetime = 200;
  bananaGroup.add(banana);
  }
 
 
if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 if (monkey.isTouching(bananaGroup)) {
 bananaGroup.destroyEach();
   score = score + 1; 
 
 }
 
  if (frameCount % 200 === 0) {
  obstacle = createSprite(400,230,20,20);
  obstacle.collide(ground);
  obstacle.velocityX = -3;
  obstacle.addImage(obstacleImage);  
  obstaclesGroup.add(obstacle);
  obstacle.scale = 0.15;
  obstacle.lifetime = 400;
  }
 }
   
  if (monkey.isTouching(obstaclesGroup)) {
  GameState = END;
  bananaGroup.setVelocityXEach(0);
  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  monkey.velocityY = 0;
  bananaGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  }
 
  if (GameState === END) {
  textSize(30);
  fill("orange");
  text("GAME OVER", 200, 150);
  monkey.visible = false;
  ground.visible = false;
  }
  
  drawSprites();
  
}