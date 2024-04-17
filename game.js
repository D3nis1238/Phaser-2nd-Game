var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1488 },
      debug: false,
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
var text

function preload() {
  this.load.image("fon", "assets/Новий проєкт.png");
  this.load.image("platform", "assets/14.png");
  this.load.image("star", "assets/Mushroom_2.png");
  this.load.image("skelet", "assets/Новий проєкт (2).png");
  this.load.image("tree", "assets/Tree_2.png");
  this.load.image("stone", "assets/Stone.png");
  this.load.image("bush", "assets/Bush (1).png");
  this.load.image("1plt", "assets/13.png");
  this.load.image("2plt", "assets/15.png");
  this.load.image("3plt", "assets/14.png");
  this.load.image("heart", "assets/pngwing.com.png");
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

    platforms
      .create(x, 1080 - 80, "platform")
      .setOrigin(0, 0)
    .refreshBody();

  }
  //додаю чела
  player = this.physics.add.sprite(100, 450, "dude")
  player.setBounce(0.2)
  player.setCollideWorldBounds(true)
  player.setDepth(5);
  //додав колізію
  this.physics.add.collider(player, platforms)
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
  //додаю камень
  stone = this.physics.add.staticGroup();
  for (var y = 0; y < worldwidth; y = y + Phaser.Math.FloatBetween(700, 1000)) {
    stone
      .create(y, 1080 - 80, "stone")
      .setOrigin(0, 1)
      //.refreshBody()
      .setDepth(Phaser.Math.Between(1, 10))
      .setScale(Phaser.Math.FloatBetween(0.5, 2));
  }
  //додаю дерева
  tree = this.physics.add.staticGroup();
  for (var y = 0; y < worldwidth; y = y + Phaser.Math.FloatBetween(700, 1000)) {
    tree
      .create(y, 1080 - 80, "tree")
      .setOrigin(0, 1)
      //.refreshBody()
      .setDepth(Phaser.Math.Between(1, 10))
      .setScale(Phaser.Math.FloatBetween(0.5, 2));
  }
  //додаю кущи
  bush = this.physics.add.staticGroup();
  for (var y = 0; y < worldwidth; y = y + Phaser.Math.FloatBetween(700, 1000)) {
    bush
      .create(y, 1080 - 80, "bush")
      .setOrigin(0, 1)
      //.refreshBody()
      .setDepth(Phaser.Math.Between(1, 10))
      .setScale(Phaser.Math.FloatBetween(0.5, 2));
  }
  //додаю зірки
  cursors = this.input.keyboard.createCursorKeys();
  stars = this.physics.add.group({
    key: "star",
    repeat: 10,
    setXY: { x: Phaser.Math.FloatBetween(700, 1000), y: 0, stepX: Phaser.Math.FloatBetween(900, 1500) },
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  function collectStar(player, star) {
    star.disableBody(true, true);
  }
  //додаю рахунок
  scoreText = this.add.text(16, 16, "score: 0 / 80", { fontSize: "32px", fill: "#000" }
  )
    .setScrollFactor(0);
  function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Score:" + score + " / 80");
  }
  // додаю ворогів
  cursors = this.input.keyboard.createCursorKeys();
  skelets = this.physics.add.group({
    key: "skelet",
    repeat: 5,
    setXY: { x: Phaser.Math.FloatBetween(700, 1500), y: 0, stepX: Phaser.Math.FloatBetween(900, 1500) }

  });

  skelets.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
  this.physics.add.collider(skelets, platforms);
  this.physics.add.overlap(player, skelets, collectSkelet, null, this);
  function collectSkelet(player, skelet) {
    skelet.disableBody(true, true);
  }


  //життя
  livesText = this.add.text(1700, 16, "lives: " + lives, { fontSize: "32px", fill: "#000" }
  )
    .setScrollFactor(0);
  function collectSkelet(player, skelet) {
    skelet.disableBody(true, true);

    lives += -1;
    livesText.setText("lives: " + lives);
    // if (lives <= 0) {
    // livesText.setStyle({ fill: '#ff0000' });
    // gameover = true;
    // this.physics.pause();
    //  player.setTint(0xff0000);
    // player.anims.play('turn');
    // }
  }
  //додаю платформи згори
  for (var x = 0; x < worldwidth; x = x + Phaser.Math.FloatBetween(1000, 2000)) {
    var y = Phaser.Math.FloatBetween(128, 128 * 6);
    platforms
      .create(x, y, "1plt")
      .setOrigin(0.5, 0.5);
    var i;
    for (i = 1; 1 < Phaser.Math.FloatBetween(0, 5); i++) {
      platforms
        .create(x + 128 * i, y, "3plt")
        .setOrigin(0.5, 0.5);
    }
    platforms
      .create(x + 128 * i + 128, y, "2plt")
      .setOrigin(0.5, 0.5);
  }

  this.physics.add.collider(player, platform)
  //кнопка ресета
  //var resetButton = this.add.text(400, 450, 'reset',{fontSize: '40px', fill : '#ccc'})
  //.setInteractive()
  //.setScrollFactor(0)
  //.on('pointerdown', function (){

  //}
  //)
  //рух ворога
//додадю heart


// heart = this.physics.add.staticGroup();
//   for (var y = 0; y < worldwidth; y = y + Phaser.Math.FloatBetween(700, 1000)) {
//     heart
//       .create(y, 1080 - 80, "heart")
//       .setOrigin(0, 1)
//       .refreshBody()
//       .setDepth(Phaser.Math.Between(1, 10))
//       .setScale(0.08);
//   }




// cursors = this.input.keyboard.createCursorKeys();
//   heart = this.physics.add.group({
//     key: "heart",
//     repeat: 5,
//     setXY: { x: Phaser.Math.FloatBetween(700, 1500), y: 0, stepX: Phaser.Math.FloatBetween(900, 1500) }

//   })
//   .setScrollFactor(0);
//   function collectheart(player, heart) {
//     heart.disableBody(true, true);

//     lives2 += +1;
//     livesText.setText("lives: " + lives2);
//   }
}



function update() {

  if (cursors.left.isDown) {
    player.setVelocityX(-1600);

    player.anims.play("left", true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(1600);

    player.anims.play("right", true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-1488);
  }
  //рух ворога
  if (Math.abs(player.x - skelets.x) < 600) {
    skelets.moveTo(player, player.x, player.y, 300, 1)
  }
  if (lives == 0) {
    console.log('game over')
    restartGame();
  }
  //зміна напрямку ворога
  skelets.children.iterate((child) => {
    if (Math.random() < 0.05) {
      child.setVelocityX(Phaser.Math.FloatBetween(-500, 500))
    }
  })

  function restartGame() {
    location.reload();
  }
}