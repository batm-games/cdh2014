var filter;

function State() {
}

State.prototype = {
  preload: function () {
    this.game.load.image('phaser', 'images/phaser.png');
    this.game.load.script('filter', 'lib/filters/Fire.js');
  },
  create: function () {
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
    logo.anchor.setTo(0.5, 0.5);
    logo.alpha=0.5;

    var background = game.add.sprite(0, 0);
    background.width = 800;
    background.height = 600;

    filter = game.add.filter('Fire', 800, 600);
    filter.alpha = 0;

    background.filters = [filter];
    StateUtils.createDemoHomeButton();
  },
  update: function () {
    game.stats.update();
    filter.update();
  }
};

module.exports = State;