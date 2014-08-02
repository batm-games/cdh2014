function State() {
  this.PLAYER_SPEED = 200;
  this.PLAYERS_JOINED_TEAS_DISTANCE = 50;
  this.ALPHA_BLEND = 0.4;
  this.LIGHT_COLOR = 0x333333;
  this.BLEND_MODE = PIXI.blendModes.ADD;

  this.LIGHT_NORMAL_SIZE = 0.5;
  this.LIGHT_LARGE_SIZE = 1.0;
  this.LIGHT_LARGEEEEEE_SIZE = 2.0;

  this.SUPER_ZEBRA_SPEED = 200;
}

State.prototype = {
  preload: function () {
    game.load.audio('bgsound',['./sounds/bgsound.ogg']);
    game.load.audio('torch','./sounds/torch01.ogg');
    game.load.image('tileset', './assets/tilemaps/tileset.png');
    game.load.tilemap('map', './assets/tilemaps/tv_map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('pedro', './images/sprites/pedro.png',64,192);
    game.load.spritesheet('torch', './images/sprites/torch.png');
    game.load.spritesheet('ghost', './images/sprites/ghost.png', 34, 50);
    game.load.spritesheet('superZebra', './images/sprites/superZebra.png', 42, 50);

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
    // mask.scale.setTo(scale,scale);
    mask.baseScale = scale;
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
    mask.setScale = function(scale){
      for(var i=0;i<mask.masks.length;i++){
        mask.masks[i].scale.set(mask.masks[i].baseScale * scale,mask.masks[i].baseScale * scale);
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
      var enemy = {};
      if(i%2) {
        enemy = TVEnemy.createEnemy(i * X * 0.1,Y*0.50, 'atlaszebra','standby-1.png', 40);
        enemy.type = Statics.swordEnemy;
      }
      else {
        enemy = TVEnemy.createGhost(i * X * 0.1,Y*0.50, 40);
        enemy.type = Statics.ghost;
      }
      this.enemies.add(enemy);
      // enemy.alpha = this.ALPHA_BLEND;
      // enemy.tint = 0x111111;
    }
  },

  createSfx: function() {
    torchSfx = game.add.audio('torch');
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

    if(controls.attack.isDown || controls.tea.isDown){
      player.attack();
      torchSfx.play();
    }

    var deltaX = (-player.width) * 0.25;
    var deltaY = player.teaPower ? (-player.height) * 0.25 : 0;    
    player.light.move(player.x + deltaX,player.y + deltaY);
    player.light.setScale(player.teaPower ? this.LIGHT_LARGE_SIZE: this.LIGHT_NORMAL_SIZE);
  },
  mergedPlayersAction : function(player1,player2){
    if(player1.teaPower && player2.teaPower && player1.position.distance(player2.position) <= this.PLAYERS_JOINED_TEAS_DISTANCE){
      player1.light.setScale(this.LIGHT_LARGEEEEEE_SIZE);
      player2.light.setScale(this.LIGHT_LARGEEEEEE_SIZE);
      state.invokeSuperZebras();
    }
  },
  invokeSuperZebra : function(x,y){
    var zebra = game.add.sprite(x,y,'superZebra');
    zebra.animations.add('fly',[0,1],8,true);
    zebra.animations.play('fly');
    zebra.angle = -45;
    game.physics.arcade.enable(zebra);
    zebra.body.velocity.x = -this.SUPER_ZEBRA_SPEED;
    
    this.zebras.add(zebra);
  },
  invokeSuperZebras : function(){
    for(var i=-3;i<=3;i++){
      this.invokeSuperZebra(X*0.9,halfY + i * Y*0.1);
      this.invokeSuperZebra(X*0.8,halfY + i * Y*0.15);
    }
  },
  initVariables : function(){
    this.players = [];
    this.controls = [];
    this.enemies = game.add.group();
    this.torches = game.add.group();
    this.zebras = game.add.group();
  },
  updateEnemies : function() {
    this.enemies.forEach(function(enemy){
      TVEnemy.updateEnemy(enemy);
    });
  },
  create: function() {
    music = game.add.audio('bgsound',1,true);
    music.play('',0,1,true);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.createMap();
    this.initVariables();
    this.createGameObjects();
    this.createPlayers();
    this.createPlayers();
    this.createEnemies();
    this.createControls(Phaser.Keyboard.UP,Phaser.Keyboard.RIGHT,Phaser.Keyboard.DOWN,Phaser.Keyboard.LEFT,Phaser.Keyboard.NUMPAD_0,Phaser.Keyboard.NUMPAD_1);
    this.createControls(Phaser.Keyboard.W,Phaser.Keyboard.D,Phaser.Keyboard.S,Phaser.Keyboard.A,Phaser.Keyboard.C,Phaser.Keyboard.V);
    this.createSfx();

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
          if(enemy.type == Statics.ghost && torch.player.teaPower) {
            enemy.receiveDamage(torch.damage);
          }
          if(enemy.type == Statics.swordEnemy && !torch.player.teaPower) {
            enemy.receiveDamage(torch.damage);
          }
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