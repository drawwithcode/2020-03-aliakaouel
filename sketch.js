let myImage;
let mySound;
let rez = 20;
let food;
let w;
let h;


function preload(){
  // put preload code here
  myImage = loadImage("Sky.jpg");
  mySound = loadSound("SoundClick.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  snake = new Snake();
  foodLocation();

}

function draw() {

  //Image Background
  image(myImage, 0, 0, width, height);

  //text up
  push();
  fill("#white");
  textSize(16);
  textAlign(CENTER);
  text("Click on the arrow to start", windowWidth / 2, 50);
  text("Click '1' '2' and '0' to change the speed", windowWidth -300, 50);
  pop();


  scale(rez);
  if (snake.eat(food)) {
    mySound.play();
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background("pink");

    push();
    fill("white");
    textSize(50);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    pull();

    noLoop();
  }

  noStroke();
  fill("white");
  rect(food.x, food.y, 1, 1);

}

class Snake {

  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }

  endGame() {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
      return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
      let part = this.body[i];
      if(part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  if(eat = true){
    mySound.play();}
    show() {
      for(let i = 0; i < this.body.length; i++) {
        fill("white");
        noStroke();
        rect(this.body[i].x, this.body[i].y, 1, 1)
      }
    }

  }

  function foodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);

  }

  function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
      snake.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW) {
      snake.setDir(0, 1);
    } else if (keyCode === UP_ARROW) {
      snake.setDir(0, -1);
    } else if (key == ' ') {
      snake.grow();
    }

  }

  function keyTyped(){
    if(key == "1"){
      frameRate(20);
    }else if(key == "2") {
      frameRate(20);
    }else if(key == "0"){
      frameRate(10)
    }

  }



  //Resize Window
  function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
  }
