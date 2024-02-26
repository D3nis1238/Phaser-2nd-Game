function preload() {
  this.load.spritesheet("dude", "assets/pixil-frame-0.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
} 
function create() {
  player = this.physics.add.sprite(100, 450, "dude")
}