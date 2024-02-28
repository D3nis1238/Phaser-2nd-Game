var scoreText;
var gameOver = false;
var worldwidth = 10000;
var config = {
  type: Phaser.AUTO,     width: 800,
  height: 600, 
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 321 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
function preload() {
  //this.load.image("fon", "assets/fon.png");
  this.load.image("fon1", "assets/фон+.jpg");
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
this.add.tileSprite(0,0,worldwidth, 1080,"fon1").setOrigin(0,0);
platforms = this.physics.add.staticgroup();
for (var x = 0; x < worldwidth; x = x + 100) {
  console.log(x)
  plstform.create(x,1000, "ground").setOrigin(0, 0).refreshBody();
}
this.camera.main.setBounds(0,0,worldwidth, window.innerHeight);
this.camera.world.setBounds(0,0,worldwidth, window.innerHeight);
this.camera.main.startFollow(dude);
}
function upgrade(){

}
