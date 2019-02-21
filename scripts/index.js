function init() {
  if ('paintWorklet' in CSS) {
    CSS.paintWorklet
      .addModule('/dist/paint.js')
      .then(_ok => addLoaded())
      .catch(err => console.error('Unable to register paintWorklet', err));
  } else {
    console.log('paintWorklet not supported, falling back');
  }
}

function addLoaded() {
  document.querySelector('html').classList.add('is-loaded');
}

init();
