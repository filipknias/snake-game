import Snake from "./snake.js";

const snake = new Snake("#game-board");

document.addEventListener("keydown", (e) => {
  if (e.which === 32) {
    snake.isPlaying = true;
    snake.init();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.which === 37) {
    //left
    snake.snakeDirection.x = -1;
    snake.snakeDirection.y = 0;
  }
  if (e.which === 38) {
    //up
    snake.snakeDirection.x = 0;
    snake.snakeDirection.y = -1;
  }
  if (e.which === 39) {
    //right
    snake.snakeDirection.x = 1;
    snake.snakeDirection.y = 0;
  }
  if (e.which === 40) {
    //down
    snake.snakeDirection.x = 0;
    snake.snakeDirection.y = 1;
  }
});
