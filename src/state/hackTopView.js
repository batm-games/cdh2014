function State() {
  this.PLAYER_SPEED = 200;
  this.PLAYERS_JOINED_TEAS_DISTANCE = 50;
}

State.prototype = {
  preload: function () {
    game.load.image('tileset', './assets/tilemaps/tileset.png');
    game.load.tilemap('map', './assets/tilemaps/tv_map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('pedro', './images/sprites/pedro.png');
    game.load.spritesheet('torch', './images/sprites/torch.png');

    game.load.atlas('atlaszebra', './images/spritesheets/atlaszebra.png', './images/spritesheets/atlaszebra.json');    
  },
  createMap : function(){
    // Create the tilemap
    this.map = game.add.tilemap('map');
    //this.map.setTileSize(32,32);
    // Add the tileset to the map
    this.map.addTilesetImage('tileset');
    // Create the layer, by specifying the name of the Tiled layer
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.map.setCollision(1,true,this.layer);
  },
  createPlayers: function(){
    var player = game.add.sprite(X*0.30,Y*0.50, 'pedro');
    player.anchor.set(0.5,0.5);
    player.scale.set(0.5,0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    LifeUtils.giveLife(player,100);

    this.players.push(player);
  },
  createGameObjects : function(){
    var torch = game.add.sprite(X*0.25,Y*0.35, 'torch');
    torch.scale.set(0.5,0.5);
    torch.z = 0;
  },
  createControls: function(ku,kr,kd,kl,kaction){
    //this.cursors = game.input.keyboard.createCursorKeys();
    control = {
      'u' : game.input.keyboard.addKey(ku),
      'r' : game.input.keyboard.addKey(kr),
      'd' : game.input.keyboard.addKey(kd),
      'l' : game.input.keyboard.addKey(kl),
      'action' : game.input.keyboard.addKey(kaction)
    };
    this.controls.push(control);
  },

  createEnemies: function() {
    for(var i=1;i<=3;i++) {
      var enemy = TVEnemy.createEnemy(i * X * 0.1,Y*0.50, 'atlaszebra','standby-1.png', 40);
      LiveUtils.giveLife(enemy, 30);
      this.enemies.push(enemy);
    }
  },
  updatePlayer : function(player,controls){
    var dir = new Phaser.Point(0,0);
    if(controls.l.isDown){dir.x -= 1;}
    if(controls.r.isDown){dir.x += 1;}
    if(controls.u.isDown){dir.y -= 1;}
    if(controls.d.isDown){dir.y += 1;}

    if(controls.action.isDown){
      player.tint = 0x00ff00;
      player.teaPower = true;
      dir = new Phaser.Point(0,0);
    }else{
      player.tint = 0xffffff;
      player.teaPower = false;
    }

    dir.setMagnitude(this.PLAYER_SPEED);
    player.body.velocity.x = dir.x;
    player.body.velocity.y = dir.y;

    if(dir.x != 0 && player.scale.x < 0 != dir.x < 0){
      player.scale.x *= -1;
    }
  },
  mergedPlayersAction : function(player1,player2){
    if(player1.teaPower && player2.teaPower && player1.position.distance(player2.position) <= this.PLAYERS_JOINED_TEAS_DISTANCE){
      player1.tint = 0x0000ff;
      player2.tint = 0x0000ff;
    }
  },
  initVariables : function(){
    this.players = [];
    this.controls = [];
    this.enemies = [];
  },
  updateEnemies : function() {
    for(var enemy in this.enemies) {
      TVEnemy.updateEnemy(this.enemies[enemy]);
    }
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.initVariables();
    this.createMap();
    this.createGameObjects();
    this.createEnemies();
    this.createPlayers();
    this.createPlayers();
    this.createControls(Phaser.Keyboard.UP,Phaser.Keyboard.RIGHT,Phaser.Keyboard.DOWN,Phaser.Keyboard.LEFT,Phaser.Keyboard.NUMPAD_0);
    this.createControls(Phaser.Keyboard.W,Phaser.Keyboard.D,Phaser.Keyboard.S,Phaser.Keyboard.A,Phaser.Keyboard.SPACEBAR);

    this.players[1].x += 10;
    
    StateUtils.createDemoHomeButton();
  },
  update: function (event) {
    game.stats.update();
    game.physics.arcade.collide(this.players[0], this.layer);
    game.physics.arcade.collide(this.players[1], this.layer);
    var delta = event.time.elapsed / 1000.0;
    
    //Players Action!
    this.updatePlayer(this.players[0],this.controls[0]);
    this.updatePlayer(this.players[1],this.controls[1]);
    this.mergedPlayersAction(this.players[0],this.players[1]);
    this.updateEnemies();
  },
  shutdown: function(){}
};

module.exports = State;