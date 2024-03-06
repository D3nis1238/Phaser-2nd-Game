var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 321 },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var game = new Phaser.Game(config);
var platforms;
var dude;
var score = 0;
var scoreText;
var lives = 3;
var worldwidth = 9600;
var platform
var player
var star
var skelet
var fon
var bush
var stone
var tree

function preload() {
  this.load.image("fon", "assets/Новий проєкт.png");
  // this.load.image("fon1", "assets/фон+.jpg");
  this.load.image("platform", "assets/14.png");
  this.load.image("star", "assets/star-1.png");
  this.load.image("skelet", "assets/chaxluknevmuryshiu.png");
  this.load.image("tree", "assets/Tree_2.png");
  this.load.image("stone", "assets/Stone.png");
  this.load.image("bush", "assets/Bush (1).png");
  this.load.spritesheet("dude", "assets/pixilart-drawing.png", {
    frameWidth: 20,
    frameHeight: 34,
  });
}

function create() {
  //додаю фон
  this.add.tileSprite(0, 0, worldwidth, 1080, "fon")
  .setOrigin(0, 0)
  .setDepth(0)
  .setScale(1);

  //Додаю платформи
  platforms = this.physics.add.staticGroup();

  for (var x = 0; x < worldwidth; x = x + 128) {
    //console.log(x);
    platforms
      .create(x, 1080-80, "platform")
    .setOrigin(0, 0)
    .refreshBody();
      
  }
  //додаю чела
  player = this.physics.add.sprite(100, 450, "dude")
  player.setBounce(0.2);
  player.setCollideWorldBounds(true)
  player.setDepth(5)
  //додав колізію
  this.physics.add.collider(player,platforms)
  //роблю челу анімацію
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
  //прикрепляю камеру
  cursors = this.input.keyboard.createCursorKeys();




  this.cameras.main.setBounds(0, 0, worldwidth, window.innerHeight);
  this.physics.world.setBounds(0, 0, worldwidth, window.innerHeight);
  this.cameras.main.startFollow(player);
}
function update() {

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }

}
