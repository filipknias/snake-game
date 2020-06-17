export function checkStorage() {
  if (localStorage.getItem("high-score") === null) {
    localStorage.setItem("high-score", "0");
  }
}

export function setItem(item, value) {
  if (localStorage.getItem(item) !== null) {
    localStorage.setItem(item, value);
  } else {
    return;
  }
}

export function getItem(item) {
  let items = [];
  if (localStorage.getItem(item) !== null) {
    items = localStorage.getItem(item);
  }

  return items;
}
