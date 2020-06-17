export function hideOverlay() {
  //hide overlay
  document.querySelector(".overlay").classList.add("hidden");
  //show play/pause button
  document.querySelector("#pause-play-btn").classList.remove("hidden");
  //hide modal
  document.querySelector(".overlay-modal").classList.add("hidden");
  //hide overlay text
  document.querySelector(".overlay-text").classList.add("hidden");
}

export function showPauseText() {
  //show overlay
  document.querySelector(".overlay").classList.remove("hidden");
  //show overlay text
  document.querySelector(".overlay-text").classList.remove("hidden");
  //change nav-btn icon to play
  document.querySelector(".overlay-text").innerHTML = "Game Paused";
}

export function updateScore(score) {
  document.querySelector("#food-counter").textContent = score.toString();
}

export function updateHighScore(highScore) {
  document.querySelector("#high-score").textContent = highScore.toString();
}

export function showDeathSummary(score, highScore) {
  //show overlay
  document.querySelector(".overlay").classList.remove("hidden");
  //show modal
  document.querySelector(".overlay-modal").classList.remove("hidden");
  //hide play/pause button
  document.querySelector("#pause-play-btn").classList.add("hidden");
  //display score
  document.querySelector("#score-counter").textContent = score.toString();
  //display high score
  document.querySelector(
    "#high-score-counter"
  ).textContent = highScore.toString();
}
