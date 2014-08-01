function State() {
}

State.prototype = {
  preload: function () {
    game.load.image('tileset', './images/tileset.png');
    game.load.tilemap('map', './images/map_topview.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('dog', './images/sprites/baddie.png', 32, 32);

    game.load.atlas('atlaszebra', './images/spritesheets/atlaszebra.png', './images/spritesheets/atlaszebra.json');    
  },
  create: function () {
    
    StateUtils.createDemoHomeButton();
  },
  update: function (event) {
    game.stats.update();
    var delta = event.time.elapsed / 1000.0;
    //begin update
    
  },
  shutdown: function(){}
};

module.exports = State;