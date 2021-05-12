class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(400,200);
    car1.addImage("car1",car1_img);
    /*car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);*/
    cars = [car1];
    
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

     player.getCarsAtEnd();


    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

   /* if(player.distance > 4500){
      gameState = 2;
      player.rank+=1;
      Player.updateCarAtEnd(player.rank);
      
    }*/
    if(alienGroup.isTouching(car1)){
      gameState = 2;
      alienGroup.destroyEach();
      fruitGroup.destroyEach();
      
    }
    if(fruitGroup.isTouching(car1)){
      fruitGroup.destroyEach();
       
  }
   
    drawSprites();
  }
  
  spawnGoodObstacle(){
    if(World.frameCount % 80 === 0){
      var fruit1 = createSprite(displayWidth,displayHeight,20,20);
      fruit1.scale = 0.2;
     var y = displayHeight - fruit1.y;
     var r = Math.round(random(1,2));
      if(r === 1){
        fruit1.addImage(car4_img);
      }else if(r === 2){
        fruit1.addImage(car4_img);
      }
      
      fruit1.x = Math.round(random(50,500))
      fruit1.velocityY= 7;
      
      fruit1.setLifetime = 100;
      
      fruitGroup.add(fruit1);
    }
  }
  spawnBadObstacle(){
    if(World.frameCount % 80 === 0){
      var alien = createSprite(0,200,20,20);
      alien.scale = 0.5;
     var r = Math.round(random(1,2));
      if(r === 1){
        alien.addImage(car2_img);
        alien.scale = 0.1;
      }else if(r === 2){
        alien.addImage(car2_img);
        alien.scale = 0.1;
      }
      
      alien.x = Math.round(random(50,400))
      alien.velocityY = 7;
      alien.setLifetime = 100;
      


      alienGroup.add(alien);
    }
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }
}
