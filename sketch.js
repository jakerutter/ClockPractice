//rain drop code
var raindrop = [];
var H = window.screen.availHeight
var W = window.screen.availWidth
function setup() {
  createCanvas(W, H);
  for (var i = 0; i < 50; i++) {
    raindrop[i] = new Rain();
  }
}

function draw() {
  background(230, 230, 250);
  for (var i = 0; i < raindrop.length; i++) {
    raindrop[i].fall();
    raindrop[i].show();
  }
}
