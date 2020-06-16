import { hideOverlay, updateScore, deathSummary } from "./utilities.js";

export default class Snake {
  constructor(boardId) {
    this.canvas = document.querySelector(boardId);
    this.ctx = this.canvas.getContext("2d");
    this.snakeSpeed = 150;
    this.scale = 40;
    this.columns = this.canvas.height / this.scale;
    this.rows = this.canvas.width / this.scale;

    this.snakeDirection = {
      x: 0,
      y: -1,
    };
    this.snakeColor = "#3fef23";
    this.foodColor = "#fc324b";
    this.isPlaying = false;
    this.score = 0;
  }

  init() {
    //check if game is arleady playing
    if (this.isPlaying) return;
    //switch isPlaying to true
    this.isPlaying = true;
    this.snakeBody = [
      { x: (this.rows / 2) * this.scale, y: (this.columns / 2) * this.scale },
    ];
    this.snakeFood = this.getRandomPositionOnCanvas();
    //hide overlay
    hideOverlay();
    //reset score
    this.score = 0;
    updateScore(this.score);
    //draw food in random place
    this.drawFood();
    //get snake into moving
    this.snakeMove = setInterval(() => {
      this.updateSnake();
      this.drawSnake();
    }, this.snakeSpeed);
  }

  updateSnake() {
    //new snake head
    const newHead = {
      x: this.snakeBody[0].x + this.snakeDirection.x * this.scale,
      y: this.snakeBody[0].y + this.snakeDirection.y * this.scale,
    };

    //add new head to 0 index of snakeBody array
    this.snakeBody.unshift(newHead);

    //check if snake eat food
    if (
      this.snakeBody[0].x === this.snakeFood.x &&
      this.snakeBody[0].y === this.snakeFood.y
    ) {
      //randomize new food position
      this.snakeFood = this.getRandomPositionOnCanvas();
      this.drawFood();
      //increase score
      this.score++;
      //update score
      updateScore(this.score);
    } else {
      //delete last element from snakeBody array
      this.snakeBody.pop();
    }

    //check for fail
    this.checkForFail();
  }

  drawSnake() {
    //clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //draw food in his place
    this.drawFood();
    //draw snake
    for (let i = 0; i <= this.snakeBody.length - 1; i++) {
      //console.log(this.snakeBody[i]);
      this.ctx.fillStyle = this.snakeColor;
      this.ctx.fillRect(
        this.snakeBody[i].x,
        this.snakeBody[i].y,
        this.scale,
        this.scale
      );
    }
  }

  checkForFail() {
    //check for crush into wall
    if (
      this.snakeBody[0].x > this.canvas.width ||
      this.snakeBody[0].x < 0 ||
      this.snakeBody[0].y > this.canvas.height ||
      this.snakeBody[0].y < 0
    ) {
      deathSummary(this.score, this.highScore);
      clearInterval(this.snakeMove);
      this.isPlaying = false;
    }
    //check for crush into snake
    for (let i = 4; i < this.snakeBody.length; i++) {
      if (
        this.snakeBody[0].x === this.snakeBody[i].x &&
        this.snakeBody[0].y === this.snakeBody[i].y
      ) {
        deathSummary(this.score, this.highScore);
        clearInterval(this.snakeMove);
        this.isPlaying = false;
      }
    }
  }

  getRandomPositionOnCanvas() {
    return {
      x: Math.floor(Math.random() * this.rows) * this.scale,
      y: Math.floor(Math.random() * this.columns) * this.scale,
    };
  }

  drawFood() {
    //draw food in random place
    this.ctx.fillStyle = this.foodColor;
    this.ctx.fillRect(
      this.snakeFood.x,
      this.snakeFood.y,
      this.scale,
      this.scale
    );
  }
}
