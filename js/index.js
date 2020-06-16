import Snake from "./snake.js";
import { hideModal, showOverlayText, hideOverlay } from "./utilities.js";

const snake = new Snake("#game-board");

document.addEventListener("keydown", (e) => {
  switch (e.which) {
    //SPACE
    case 32: {
      snake.init();
      break;
    }
    //LEFT ARROW
    case 37: {
      if (snake.snakeDirection.x === 1 && snake.snakeBody.length > 1) return;
      snake.snakeDirection.x = -1;
      snake.snakeDirection.y = 0;
      break;
    }
    //UP ARROW
    case 38: {
      if (snake.snakeDirection.y === 1 && snake.snakeBody.length > 1) return;
      snake.snakeDirection.x = 0;
      snake.snakeDirection.y = -1;
      break;
    }
    //RIGHT ARROW
    case 39: {
      if (snake.snakeDirection.x === -1 && snake.snakeBody.length > 1) return;
      snake.snakeDirection.x = 1;
      snake.snakeDirection.y = 0;
      break;
    }
    //DOWN ARROW
    case 40: {
      if (snake.snakeDirection.y === -1 && snake.snakeBody.length > 1) return;
      snake.snakeDirection.x = 0;
      snake.snakeDirection.y = 1;
      break;
    }
  }
});

//Play again button on modal
document.querySelector("#play-again-btn").addEventListener("click", () => {
  hideModal();
  hideOverlay();
  snake.init();
});
