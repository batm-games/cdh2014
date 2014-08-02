var StateUtils = {};

StateUtils.createDemoHomeButton = function(){
  var homeButton = game.add.text(X*8,Y*8, "<Home>", { font: "30px Arial", fill: "#00ff00", align: "center" });
  homeButton.inputEnabled = true;
  homeButton.events.onInputDown.add(function(){game.state.start('MainMenu')},this);//(func,context)
  // homeButton.alpha=0;
};

module.exports = StateUtils;