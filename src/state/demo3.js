//@author: Gareve
function State3() {
  this.DOG_SPEED = 200.0;
  this.CIRCLE_SPEED = this.DOG_SPEED * 2;
  this.circle = null;
}

State3.prototype = {
  preload: function () {
    game.load.spritesheet('dog', './images/sprites/baddie.png', 32, 32);
  },
  create: function () {
    var dog = this.dog = game.add.sprite(halfX,halfY, 'dog');
    dog.inputEnabled = true;
    dog.animations.add('left', [0, 1], 10, true);
    dog.animations.add('right', [2, 3], 10, true);        
    dog.animations.play('left');
    dog.anchor.set(0.5,0.5);

    this.cursors = game.input.keyboard.createCursorKeys();

    this.circle = new Phaser.Circle(halfX,halfY,10);

    
    
    // game.input.mouse.onMouseDown = function(event){
    //   console.log(event);
    // };

    StateUtils.createDemoHomeButton();
  },
  updatePlayer : function(delta){
    var dirCircle = new Phaser.Point(0,0);
    if(this.cursors.left.isDown) {dirCircle.x -= 1;}
    if(this.cursors.right.isDown){dirCircle.x += 1;}
    if(this.cursors.up.isDown)   {dirCircle.y -= 1;}
    if(this.cursors.down.isDown) {dirCircle.y += 1;}

    dirCircle.setMagnitude(this.CIRCLE_SPEED * delta);
    this.circle.x += dirCircle.x;
    this.circle.y += dirCircle.y;

    if(this.circle){
      var dirDog = Phaser.Point.subtract(this.circle,this.dog.position).setMagnitude(this.DOG_SPEED * delta);      

      if(this.dog.position.distance(this.circle) > 2){
        this.dog.position.x += dirDog.x;
        this.dog.position.y += dirDog.y;
        this.dog.animations.play(dirDog.x < 0 ? 'left' : 'right');
      }
    }
  },
  render: function(){
    game.debug.geom(this.circle,'#0fffff');
  },
  update: function (event) {
    game.stats.update();
    var delta = event.time.elapsed / 1000.0;
    //begin update

    this.updatePlayer(delta);
    //end update
  },
  shutdown: function(){
    game.debug.stop();
  }
};

module.exports = State3;