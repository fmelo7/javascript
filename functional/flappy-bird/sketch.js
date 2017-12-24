var bird;
var pipes = [];

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  pipes.forEach((p, i) => {
    p.show();
    p.update();
    p.hits(bird);
    if (p.offscreen())
      pipes.splice(i, 1);
  });

  bird.show();
  bird.update();

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ')
    bird.up();
}