//Create variables here
var dog
var happyDog
var database
var foodS
var foodStock
var dog
var feed
var addFood
var feedTime,lastFed
var foodObj
var dogImg1;
var sadDogimg
function preload()
{
 dogIMG = loadImage("images/dogImg.png");
  dog1IMG = loadImage("images/dogImg1.png");
	//load images here
  sadDogimg=loadImage("images/deadDog/png")
}

function setup() {
  createCanvas(500, 500);
  foodObj=new Food()
  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  dog=createSprite(250,250,30,30)
  dog.addImage(dogIMG)
  dog.scale=0.2
  database=firebase.database()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  
}


function draw() {
  background("green")  
foodObj.display()
fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed=data.val()
})
fill(255,255,254)
textSize(15)
if(lastFed>=12){
text("Last Feed : "+ lastFed%12 + "PM", 350,30)
}
else if(lastFed==0){
text("Last Feed : 12 AM", 350,30)
}
else{
text("last Feed : 12 AM", 350,30)
}
if(gameState!="Hungry"){
  feed.hide()
  addFood.hide()
  dog.remove
}
else{
  feed.show()
  addFood.show()
  dog.addImage(sadDogimg)
}
readState=database.ref('gameState')
readState.on("value",function(date){
gameState=data.val()
})
currentTime=hour();
if(currentTime==(lastFed+1)){
update("PLaying")
foodObj.garden()
}
else if(curentTime==(lastFed+2)){
update("Sleeping")
foodObj.bedroom()
}
else if(currentTime>(lastFed+2)&&currentTime<+(lastFed+4)){
update("Bathing")
foodObj.washroom()
}
else{
update("Hungry")
foodObj.dsiplay()
}
drawSprites();
fill("white")
text("food:"+foodS,170,200)
}
function readStock(data){
  foodS=data.val();
foodObj.updateFoodStock(foodS)
}
function writeStock(x){
if(x<=0){
  x=0
}
else{
x=x-1
}
database.ref('/').update({
Food:x
})

}

function addFoods(){
foodS++;
database.ref('/').update({
Food:foodS
})
}
function feedDog(){
dog.addImage(dog1IMG)
foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})

}
function update(state){
database.ref('/').update({
gameState:state
})
}
