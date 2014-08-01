var StateUtils = {};

StateUtils.createDemoHomeButton = function(){
  var homeButton = game.add.text(game.world.centerX+200,game.world.height*0.7, "<Home>", { font: "30px Arial", fill: "#00ff00", align: "center" });
  homeButton.inputEnabled = true;
  homeButton.events.onInputDown.add(function(){game.state.start('MainMenu')},this);//(func,context)
};

module.exports = StateUtils;