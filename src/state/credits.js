function State() {
}

State.prototype = {
  preload: function () {
    
  },
  create: function () {
    var text = "You Win!\nCredits\n";
        var style = { font: "65px Arial", fill: "#00ff00", align: "center" };

//        var lightMask = new LightMask(this.fire);
//        var tween = game.add.tween(torch).to(
//            {y:-Y*0.47 + Y*2.5}
//            ,15000
//        );

    var t = game.add.text(X*0.5,Y*0.5, text, style);
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