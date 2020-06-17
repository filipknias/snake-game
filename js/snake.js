import {
  hideOverlay,
  updateScore,
  showDeathSummary,
  showPauseText,
  updateHighScore,
} from "./utilities.js";

import { setItem, getItem } from "./storage.js";

export default class Snake {
  constructor(boardId) {
    this.canvas = document.querySelector(boardId);
    this.ctx = this.canvas.getContext("2d");
    this.snakeSpeed = 120;
    this.scale = 40;
    this.columns = this.canvas.height / this.scale;
    this.rows = this.canvas.width / this.scale;
    this.snakeColor = "#3fef23";
    this.foodColor = "#fc324b";
    this.isPlaying = false;
    this.isPaused = false;
    this.score = 0;
    this.highScore = getItem("high-score");
  }

  init() {
    //check if game is arleady playing
    if (this.isPlaying || this.isPaused) return;
    //switch isPlaying to true
    this.isPlaying = true;
    //set snakeBody to middle of canvas
    this.snakeBody = [
      { x: (this.rows / 2) * this.scale, y: (this.columns / 2) * this.scale },
    ];
    //set snakeDirection to UP
    this.snakeDirection = {
      x: 0,
      y: -1,
    };
    //randomize snakeFood position
    this.snakeFood = this.getRandomPositionOnCanvas();
    //hide overlay
    hideOverlay();
    //reset score
    this.score = 0;
    updateScore(this.score);
    //display high score
    this.highScore = getItem("high-score");
    updateHighScore(this.highScore);
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
      //check for beating high score
      if (this.score > this.highScore) {
        setItem("high-score", this.score);
        this.highScore = getItem("high-score");
        updateHighScore(this.highScore);
      }
      //update score
      updateScore(this.score);
    } else {
      //delete last element from snakeBody array
      this.snakeBody.pop();
    }

    //check for fail
    if (this.checkforWall() || this.checkforSnake()) {
      showDeathSummary(this.score, this.highScore);
      clearInterval(this.snakeMove);
      this.isPlaying = false;
    }
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

  checkforWall() {
    //check for crush into wall
    if (
      this.snakeBody[0].x > this.canvas.width ||
      this.snakeBody[0].x < 0 ||
      this.snakeBody[0].y > this.canvas.height ||
      this.snakeBody[0].y < 0
    ) {
      return true;
    }
  }

  checkforSnake() {
    //check for crush into snake
    for (let i = 4; i < this.snakeBody.length; i++) {
      if (
        this.snakeBody[0].x === this.snakeBody[i].x &&
        this.snakeBody[0].y === this.snakeBody[i].y
      ) {
        return true;
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

  pauseGame() {
    //get status attribute from button
    const buttonStatus = document
      .querySelector("#pause-play-btn")
      .getAttribute("data-button");
    //if game is paused
    if (buttonStatus === "pause") {
      //set isPaused to true
      this.isPaused = true;
      //show pause text
      showPauseText();
      //stop game
      clearInterval(this.snakeMove);
      //set button data attribute to play
      document
        .querySelector("#pause-play-btn")
        .setAttribute("data-button", "play");
      //set button icon to play
      document.querySelector(".nav-btn-icon").src = `./images/play.svg`;
    }
    //if game is playing
    else if (buttonStatus === "play") {
      //set isPaused to false
      this.isPaused = false;
      //set button data attribute to pause
      document
        .querySelector("#pause-play-btn")
        .setAttribute("data-button", "pause");
      //hide overlay
      hideOverlay();
      //start game interval
      this.snakeMove = setInterval(() => {
        this.updateSnake();
        this.drawSnake();
      }, this.snakeSpeed);
      //set button icon to pause
      document.querySelector(".nav-btn-icon").src = `./images/pause.svg`;
    }
  }
}
