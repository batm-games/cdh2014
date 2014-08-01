//@author: gareve
function State() {
  this.dog = null;
  this.cursors = null;  
}

State.prototype = {
  preload: function () {
    game.load.spritesheet('dog', './images/sprites/baddie.png', 32, 32);
  },
  create: function () {
    var dog = this.dog = game.add.sprite(halfX,halfY, 'dog');
    dog.inputEnabled = true;
    dog.position.x = halfX;
    dog.position.y = halfY;
 
    //  Our two animations, walking left and right.
    dog.animations.add('left', [0, 1], 10, true);
    dog.animations.play('left');

    //  Allow dragging - the 'true' parameter will make the sprite snap to the center
    dog.input.enableDrag(true);
    dog.events.onDragStop.add(function(dog){console.log('Dog Released');});

    this.cursors = game.input.keyboard.createCursorKeys();

    StateUtils.createDemoHomeButton();
  },
  update: function (event) {
    game.stats.update();
    var delta = event.time.elapsed / 1000.0;
  }
};

module.exports = State;