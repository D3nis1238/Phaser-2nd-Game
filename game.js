function preload() {
  this.load.image("fon", "assets/fon.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("star", "assets/star-1.png");
    this.load.image("skelet", "assets/chaxluknevmuryshiu.png");
  this.load.spritesheet("dude", "assets/pixilart-drawing.png", {
    frameWidth: 20,
    frameHeight: 34,
  });
} 
function create() {
  player = this.physics.add.sprite(100, 450, "dude")
  player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

}
var camera = document.getElementById("camera")
var dude = Document.getElementById("dude")
function updatecamera(){
var dudePosition =
dude.getBoundingClientRect();
var screenWidth = windows.innerWidth
var screenHight = windows.innerHight
var CameraX = dudePosition.Left -(screenWidth / 2) +(dudePosition.Width / 2);
var CameraY = dudePosition.Left -(screenHeight / 2) +(dudePosition.height / 2);
camera.style.left = cameraX + "px"
camera.style.top =  CameraY +"px"
}
window.onload = function () {
  updatecamera();
};
dude.addEventListener("mousemove", 
function() {
  updatecamera();
});