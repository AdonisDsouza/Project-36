var dog,sadDog,happyDog, database;
var foodObj;
var foodS,foodStock;
var FeedTime, lastFed, Feed,addFood;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
 database = firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);

}

function draw() {
  background(46,139,87);

  foodObj.display();

  FedTime = database.ref('FeedTime');
  FedTime.on("value", function(data){
    lastFed = data.val();

  })
  
  fill(255,255,254);
  textSize(15);
  if(lastFed  >= 12) {
    text("Last Feed: " + lastFed %12 +"PM",350,30);
  }
  else if( lastFed === 0){
    text("Last Feed: 12AM ",350,30);
  }
  else{
    text("Last Feed: " + lastFed + "AM",350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  var food_stock_val;
  dog.addImage(happyDog);

  food_stock_val = foodObj.getFoodStock();
 
  if(food_stock_val   <= 0) {
    foodObj.updateFoodStock(food_stock_val *0);
    }else{foodObj.updateFoodStock(food_stock_val -1)}

    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
}

//function to add food in stock
function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
