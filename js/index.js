import Snake from "./snake.js";
import { checkStorage, getItem } from "./storage.js";
import { updateHighScore } from "./utilities.js";

const snake = new Snake("#game-board");

window.addEventListener("load", () => {
  checkStorage();
  updateHighScore(snake.highScore);
});

document.addEventListener("keydown", (e) => {
  switch (e.which) {
    //SPACE
    case 32: {
      snake.init();
      break;
    }
    //LEFT ARROW
    case 37: {
      if (
        (snake.snakeDirection.x === 1 && snake.snakeBody.length > 1) ||
        snake.isPaused
      )
        return;
      snake.snakeDirection.x = -1;
      snake.snakeDirection.y = 0;
      break;
    }
    //UP ARROW
    case 38: {
      if (
        (snake.snakeDirection.y === 1 && snake.snakeBody.length > 1) ||
        snake.isPaused
      )
        return;
      snake.snakeDirection.x = 0;
      snake.snakeDirection.y = -1;
      break;
    }
    //RIGHT ARROW
    case 39: {
      if (
        (snake.snakeDirection.x === -1 && snake.snakeBody.length > 1) ||
        snake.isPaused
      )
        return;
      snake.snakeDirection.x = 1;
      snake.snakeDirection.y = 0;
      break;
    }
    //DOWN ARROW
    case 40: {
      if (
        (snake.snakeDirection.y === -1 && snake.snakeBody.length > 1) ||
        snake.isPaused
      )
        return;
      snake.snakeDirection.x = 0;
      snake.snakeDirection.y = 1;
      break;
    }
  }
});

//Play again button on modal
document.querySelector("#play-again-btn").addEventListener("click", () => {
  snake.init();
});

//Pause/play button
document.querySelector("#pause-play-btn").addEventListener("click", () => {
  snake.pauseGame();
});
