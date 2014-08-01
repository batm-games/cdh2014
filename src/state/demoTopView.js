function State() {
  this.DOG_SPEED = 200;
}

State.prototype = {
  preload: function () {
    game.load.image('tileset', './images/tileset.png');
    game.load.tilemap('map', './images/map_topview.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('dog', './images/sprites/baddie.png', 32, 32);

    game.load.atlas('atlaszebra', './images/spritesheets/atlaszebra.png', './images/spritesheets/atlaszebra.json');    
  },
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the tilemap
    this.map = game.add.tilemap('map');
    //this.map.setTileSize(32,32);
    // Add the tileset to the map
    this.map.addTilesetImage('tileset');
    // Create the layer, by specifying the name of the Tiled layer
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer2 = this.map.createLayer('Tile Layer 2');

    // this.layer.scale.set(0.25,0.25);
    // this.layer2.scale.set(0.25,0.25);
    // Set the world size to match the size of the layer
    this.layer.resizeWorld();
    // Enable collisions for the first element of our tileset (the blue wall)
    this.map.setCollision(1,true,this.layer2);
    //this.map.setCollision(2);
    this.map.setCollision(3,true,this.layer);
    //this.map.setCollision(4);

    var dog = this.dog = game.add.sprite(halfX, halfY, 'atlaszebra','standby-1.png');
    dog.animations.add('walk', ['walk-1.png','walk-2.png'], 10, true);
    dog.animations.add('stop', ['stop-1.png','stop-2.png'], 10, true);
    dog.animations.play('walk');
    dog.anchor.set(0.5,0.5);
    dog.scale.set(0.25,0.25);

    var person = this.person = game.add.sprite(X*0.2, Y*0.05, 'dog');
    person.tint = 0xffff00;
    person.animations.add('left', [0, 1], 10, true);
    person.animations.add('right', [2, 3], 10, true);        
    person.animations.play('left');
    person.anchor.set(0.5,0.5);

    game.physics.arcade.enable(this.dog);
    game.physics.arcade.enable(this.person);
    dog.body.collideWorldBounds = true;
    person.body.collideWorldBounds = true;

    person.body.velocity.y = 10;

    this.cursors = game.input.keyboard.createCursorKeys();

    //game.camera.scale.set(0.5,0.5);
    game.camera.follow(dog);

    StateUtils.createDemoHomeButton();
  },
  updatePlayer : function(delta){
    var dirCircle = new Phaser.Point(0,0);
    if(this.cursors.left.isDown) {dirCircle.x -= 1;}
    if(this.cursors.right.isDown){dirCircle.x += 1;}
    if(this.cursors.up.isDown)   {dirCircle.y -= 1;}
    if(this.cursors.down.isDown) {dirCircle.y += 1;}

    dirCircle.setMagnitude(this.DOG_SPEED);
    //this.dog.x += dirCircle.x;
    //this.dog.y += dirCircle.y;
    this.dog.body.velocity.x = dirCircle.x;
    this.dog.body.velocity.y = dirCircle.y;

    if(dirCircle.x != 0){
      this.dog.animations.play(dirCircle.x < 0 ?'left':'right')
    }
  },
  update: function (event) {
    game.physics.arcade.collide(this.dog, this.layer);
    game.physics.arcade.collide(this.person, this.layer2,function(person,layer){person.kill();});
    game.stats.update();
    var delta = event.time.elapsed / 1000.0;
    //begin update
    this.updatePlayer(delta);

    //console.log(this.dog.position.distance(this.person.position));
    if(this.dog.position.distance(this.person.position) < 64){
      this.person.body.velocity.y = 0;
      this.person.tint = 0x00ff00;
      this.dog.animations.play('stop');
    }    
  },
  shutdown: function(){}
};

module.exports = State;
