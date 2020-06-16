export function hideOverlay() {
  document.querySelector(".overlay").classList.add("hidden");
}

export function hideModal() {
  document.querySelector(".overlay-modal").classList.add("hidden");
}

export function showOverlayText() {
  document.querySelector(".overlay-text").classList.remove("hidden");
}

export function updateScore(score) {
  document.querySelector("#food-counter").textContent = score.toString();
}

export function deathSummary(score, highScore) {
  document.querySelector(".overlay").classList.remove("hidden");
  document.querySelector(".overlay-text").classList.add("hidden");
  document.querySelector(".overlay-modal").classList.remove("hidden");
  //display score
  document.querySelector("#score-counter").textContent = score.toString();
  //display high score
}
