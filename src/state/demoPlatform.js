function State() {
}

State.prototype = {
  preload: function () {
    
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