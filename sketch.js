var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance ;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

var alienGroup;
var fruitGroup;
 
var coin;
var coinImg;
var plr;



function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/stone.jpg");

 
  car4_img = loadImage("images/coin.jpg");
  ground = loadImage("images/ground.png");
 
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  
  database = firebase.database();
  alienGroup = createGroup();
  fruitGroup = createGroup();
  game = new Game();
  game.getState();
  game.start();

  
}


function draw(){


  

  if(playerCount === 1){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    
    game.spawnBadObstacle();
    game.spawnGoodObstacle();

  
}
  if(gameState === 2){
    game.end();
  }

}

