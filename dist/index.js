//import "css-paint-polyfill";

function init() {
  CSS.paintWorklet
    .addModule("/dist/paint.js")
    .then(_ok => addLoaded())
    .catch(err => console.error("Unable to register paintWorklet", err));
}

function addLoaded() {
  document.querySelector("html").classList.add("is-loaded");
}

init();
