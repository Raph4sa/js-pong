let leftPaddle;
let rightPaddle;
let ball;

function setup() {
  createCanvas(800, 400);
  leftPaddle = new Paddle(30);
  rightPaddle = new Paddle(width - 50);
  ball = new Ball();
}

function draw() {
  background(0);
  leftPaddle.show();
  leftPaddle.update();
  rightPaddle.show();
  rightPaddle.update();
  ball.show();
  ball.update();
  ball.checkPaddleCollision(leftPaddle);
  ball.checkPaddleCollision(rightPaddle);

  // Controle das raquetes
  if (keyIsDown(87)) {
    leftPaddle.move(-10); // W
  } else if (keyIsDown(83)) {
    leftPaddle.move(10); // S
  }

  if (keyIsDown(UP_ARROW)) {
    rightPaddle.move(-10);
  } else if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.move(10);
  }
}

class Paddle {
  constructor(x) {
    this.x = x;
    this.y = height / 2 - 50;
    this.w = 20;
    this.h = 100;
    this.yChange = 0;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.yChange;
    this.y = constrain(this.y, 0, height - this.h);
  }

  move(steps) {
    this.yChange = steps;
  }
}

class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(3, 5) * (random(1) > 0.5 ? 1 : -1);
    this.ySpeed = random(3, 5) * (random(1) > 0.5 ? 1 : -1);
    this.r = 12;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }

    if (this.x < 0 || this.x > width) {
      this.reset();
    }
  }

  checkPaddleCollision(paddle) {
    // Verifica a colisão apenas se a bola estiver se movendo na direção da raquete
    if ((this.xSpeed < 0 && this.x - this.r < paddle.x + paddle.w && this.x - this.r > paddle.x) ||
        (this.xSpeed > 0 && this.x + this.r > paddle.x && this.x + this.r < paddle.x + paddle.w)) {
      if (this.y > paddle.y && this.y < paddle.y + paddle.h) {
        this.xSpeed *= -1;
        let deltaY = this.y - (paddle.y + paddle.h / 2);
        this.ySpeed = deltaY * 0.35;
      }
    }
  }
}