function State() {
  this.PLAYER_SPEED = 200;
  this.PLAYERS_JOINED_TEAS_DISTANCE = 50;
  this.ALPHA_BLEND = 0.4;
  this.LIGHT_COLOR = 0x333333;
  this.BLEND_MODE = PIXI.blendModes.ADD;
}

State.prototype = {
  preload: function () {
    game.load.image('tileset', './assets/tilemaps/tileset.png');
    game.load.tilemap('map', './assets/tilemaps/tv_map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('pedro', './images/sprites/pedro.png',64,192);
    game.load.spritesheet('torch', './images/sprites/torch.png');
    game.load.spritesheet('ghost', './images/sprites/ghost.png', 34, 50);

    game.load.atlas('atlaszebra', './images/spritesheets/atlaszebra.png', './images/spritesheets/atlaszebra.json');    
  },
  createMap : function(){
    // game.stage.backgroundColor = '#00ff00';
    // Create the tilemap
    this.map = game.add.tilemap('map');
    //this.map.setTileSize(32,32);
    // Add the tileset to the map
    this.map.addTilesetImage('tileset');
    // Create the layer, by specifying the name of the Tiled layer
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.layer.alpha = this.ALPHA_BLEND;
    this.layer.blendMode = this.BLEND_MODE;
    this.map.setCollision(1,true,this.layer);
  },
  //1.25,2,2.5
  createLightLayer : function(x, y, scale){
    var mask = game.add.sprite(x,y, 'maskInverseFlat');
    mask.anchor.setTo(0.5, 0.5);
    mask.scale.setTo(scale,scale);
    mask.alpha = 0.4;
    mask.tint = this.LIGHT_COLOR;
    mask.blendMode = this.BLEND_MODE;

    return mask;
  },
  createLight : function(){
    var mask = {
      masks : [this.createLightLayer(0,0,1.25),this.createLightLayer(0,0,2.0),this.createLightLayer(0,0,2.5)]
    };
    mask.move = function(x,y){
      for(var i=0;i<mask.masks.length;i++){
        mask.masks[i].x = x;
        mask.masks[i].y = y;
      }
    };

    return mask;
  },
  createPlayers: function(){
    var state = this;
    var player = game.add.sprite(X*0.30,Y*0.50, 'pedro');
    player.anchor.set(0.5,0.5);
    player.scale.set(0.5,0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.animations.add('normal',[0],1,true);
    player.animations.add('teaUp' ,[1],1,true);

    LifeUtils.giveLife(player,100);

    player.attack = function(){
      return function(){
        if(player.attacking){return;}

        player.attacking = true;
        var deltaX = player.width * 0.5;
        var torch = game.add.sprite(player.x + deltaX,player.y, 'torch');
        torch.anchor.set(0.5,0.5);
        torch.scale.set(0.25,0.25);
        game.physics.arcade.enable(torch);
        state.torches.add(torch);
        torch.player = player;
        torch.damage = 15;

        var tween = game.add.tween(torch)
        .to({alpha: 0.3}, 1000)
        .start();

        tween.onComplete.add(function(){
          torch.kill();
          player.attacking = false;  
        });
      }();
    };

    player.light = this.createLight();

    this.players.push(player);
  },
  createGameObjects : function(){
    var torch = game.add.sprite(X*0.25,Y*0.35, 'torch');
    torch.scale.set(0.5,0.5);
    torch.z = 0;
  },
  createControls: function(ku,kr,kd,kl,kAttack,kTea){
    //this.cursors = game.input.keyboard.createCursorKeys();
    control = {
      'u' : game.input.keyboard.addKey(ku),
      'r' : game.input.keyboard.addKey(kr),
      'd' : game.input.keyboard.addKey(kd),
      'l' : game.input.keyboard.addKey(kl),
      'attack' : game.input.keyboard.addKey(kAttack),
      'tea' : game.input.keyboard.addKey(kTea)
    };
    this.controls.push(control);
  },

  createEnemies: function() {
    for(var i=1;i<=3;i++) {
//      var enemy = TVEnemy.createEnemy(i * X * 0.1,Y*0.50, 'atlaszebra','standby-1.png', 40);
      var enemy = TVEnemy.createGhost(i * X * 0.1,Y*0.50, 40);
      this.enemies.add(enemy);
      // enemy.alpha = this.ALPHA_BLEND;
      // enemy.tint = 0x111111;
    }
  },
  updatePlayer : function(player,controls){
    var dir = new Phaser.Point(0,0);
    if(controls.l.isDown){dir.x -= 1;}
    if(controls.r.isDown){dir.x += 1;}
    if(controls.u.isDown){dir.y -= 1;}
    if(controls.d.isDown){dir.y += 1;}

    if(controls.tea.isDown){
      // player.tint = 0x00ff00;
      player.animations.play('teaUp');
      player.teaPower = true;
      dir = new Phaser.Point(0,0);
    }else{
      // player.tint = 0xffffff;
      player.teaPower = false;
      player.animations.play('normal');
    }

    dir.setMagnitude(this.PLAYER_SPEED);
    player.body.velocity.x = dir.x;
    player.body.velocity.y = dir.y;

    if(dir.x != 0 && player.scale.x < 0 != dir.x < 0){
      player.scale.x *= -1;
    }

    if(controls.attack.isDown){
      player.attack();
    }

    var deltaX = (-player.width) * 0.25;
    var deltaY = player.teaPower ? (-player.height) * 0.25 : 0;
    player.light.move(player.x + deltaX,player.y + deltaY);
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
    this.enemies = game.add.group();
    this.torches = game.add.group();
  },
  updateEnemies : function() {
    // for(var enemy in this.enemies) {
    //   TVEnemy.updateEnemy(this.enemies[enemy]);
    // }
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.createMap();
    this.initVariables();
    this.createGameObjects();
    this.createPlayers();
    this.createPlayers();
    this.createEnemies();
    this.createControls(Phaser.Keyboard.UP,Phaser.Keyboard.RIGHT,Phaser.Keyboard.DOWN,Phaser.Keyboard.LEFT,Phaser.Keyboard.NUMPAD_0,Phaser.Keyboard.NUMPAD_1);
    this.createControls(Phaser.Keyboard.W,Phaser.Keyboard.D,Phaser.Keyboard.S,Phaser.Keyboard.A,Phaser.Keyboard.C,Phaser.Keyboard.V);

    this.players[1].x += 10;
    
    StateUtils.createDemoHomeButton();
  },
  update: function (event) {
    game.stats.update();
    game.physics.arcade.collide(this.players[0], this.layer);
    game.physics.arcade.collide(this.players[1], this.layer);
    game.physics.arcade.overlap(
      this.torches, 
      this.enemies,
      function(torch,enemy){
        if(torch.damage > 0){
          enemy.receiveDamage(torch.damage)
        }
        torch.damage = 0;
      }
    );
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