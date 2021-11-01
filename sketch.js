const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie;
var zombie1, zombie2, zombie3, zombie4,sadZombie;
var breakButton;
var backgroundImage;
var stones = [];
var stick,stickImg,stick2,stick2Img;
var bgm;

function preload() {
  zombie1 = loadImage("./assets/joker1.png");
  zombie2 = loadImage("./assets/joker2.png");

  zombie3 = loadImage("./assets/joker3.png");
  zombie4 = loadImage("./assets/joker3.png");
  sadzombie = loadImage("./assets/sadJoker.png");

  stickImg=loadImage("./assets/stick.png");
  stick2Img=loadImage("./assets/stick2.png");
      

  backgroundImage = loadImage("./assets/background.jpg");

 // bgm = loadSound("/assets/kid-s-game-—-children-s-music-instrumental-music-for-kids.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);


  
//  bgm.play();
 // bgm.setVolume(0.23);
  

  stick = createSprite(80,140);
  stick.addImage(stickImg);
  stick.scale=0.18;
  stick.depth=-2;

  stick = createSprite(width-80,180);
  stick.addImage(stick2Img);
  stick.scale=0.2;
  stick.depth=-2;

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);


  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);



  for (var i = 0; i < 1; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 100,130);
    var stone2 = new Stone2 (x, y, 100,130);
    var stone3 = new Stone3 (x, y, 100,130);
    var stone4 = new Stone4(x, y, 100,130);
    var stone5 = new Stone5(x, y, 100,130);
    var stone6 = new Stone6(x, y, 100,130);
    var stone7 = new Stone7(x, y, 100,130);
    var stone8 = new Stone8(x, y,100,130);
   
    stones.push(stone);
    stones.push(stone2);
    stones.push(stone3);
    stones.push(stone4);
    stones.push(stone5);
    stones.push(stone6);
    stones.push(stone7);
    stones.push(stone8);
    
  }

  

  zombie = createSprite(width / 2, height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addImage("sad", sadzombie);
  zombie.scale = 0.3;
  zombie.velocityX = 2;

  
    
  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");

  breakButton.mouseClicked(handleButtonPress);

 
  breakButton.mousePressed(handleButtonPress);
  //breakButton.mouse(handleButtonPress);
  //breakButton.mousePressed(ButtonPress);


}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  
  
  for (var stone of stones) {
    stone.show();
    var pos = stone.body.position;
    
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    //var distance = dist(zombie.position.x, zombie.position.y);
    //var distance = dist(pos.x, pos.y);
    //var distance = dist(zombie, pos);



    /*if (distance >= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      zombie.changeImage("sad");
      collided = true;
    }*/

    /*if (distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      zombie.Image("sad");
      collided = true;
    }*/

    if (distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      zombie.changeImage("sad");
      zombie.scale=0.35;
      collided = true;
    }

    /*if (distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.Velocity(stone.body, { x: 10, y: -10 });
      zombie.changeImage("sad");
      collided = true;
    }*/
  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -4;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 4;
    zombie.changeAnimation("lefttoright");
  }
  }
  drawSprites();

}
function handleButtonPress() {
  /* jointLink=dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500); */

  /* jointLink.dettach();
  setTimeout(() => {
    break();
  }, 1500); */

  /* jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 5); */

   jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500); 
}
