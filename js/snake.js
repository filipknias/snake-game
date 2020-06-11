import UI from "./ui.js";

export default class Snake {
  constructor(boardId) {
    this.canvas = document.querySelector(boardId);
    this.ctx = this.canvas.getContext("2d");
    this.snakeSpeed = 300;
    this.scale = 40;
    this.columns = this.canvas.height / this.scale;
    this.rows = this.canvas.width / this.scale;
    this.snakeBody = [
      { x: (this.rows / 2) * this.scale, y: (this.columns / 2) * this.scale },
    ];
    this.snakeDirection = {
      x: 0,
      y: -1,
    };
    this.snakeColor = "#3fef23";
    this.isPlaying = false;
  }

  init() {
    //pretend from pressing space many times
    if (!this.isPlaying) return;
    //hide overlay
    UI.hideOverlay();
    //set snake starting position
    this.drawSnake();
    this.snakeMove();
  }

  drawSnake() {
    //clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //draw snake
    for (let i = 0; i <= this.snakeBody.length - 1; i++) {
      this.ctx.fillStyle = this.snakeColor;
      this.ctx.fillRect(
        this.snakeBody[i].x,
        this.snakeBody[i].y,
        this.scale,
        this.scale
      );
    }
  }

  snakeMove() {
    //move snake
    setInterval(() => {
      if (!this.isPlaying) return;
      //set snake body to correct positions
      this.snakeBody.forEach((item) => {
        item.x += this.snakeDirection.x * this.scale;
        item.y += this.snakeDirection.y * this.scale;
      });
      //draw snake
      this.drawSnake();
    }, this.snakeSpeed);
  }
}
