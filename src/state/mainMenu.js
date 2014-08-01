function State() {
}

State.prototype = {
  preload: function () {
  },
  create: function () {
    var style = { font: "30px Arial", fill: "#00ff00", align: "center" };
    
    game.add.text(game.world.centerX-300, 0, "Main Menu\nBitless Against the Machine", style);

    var moveScene = function(){game.state.start(this.demo.key);}
    var demos = [
      {key:'Demo1',label: 'demo1.js: Logo on Fire'},
      {key:'Demo2',label: 'demo2.js: Sprites + Doggie + Drag'},
      {key:'Demo3',label: 'demo3.js: Cursors + Mouse'},
      {key:'Demo4',label: 'demo4.js: Tweens + Spritesheet + Tint'},
      {key:'Demo5',label: 'demo5.js: Camera'},
      {key:'Platformer',label: 'Platform Thaer'},
      {key:'hackTopView',label: 'hackTopView'}
    ];
    for(var i=0;i<demos.length;i++){
      var demo = demos[i];      
      var label = game.add.text(game.world.centerX-300, 100 + i*40, demo.label, style);
      label.inputEnabled = true;
      label.events.onInputDown.add(moveScene,{demo:demo});//(func,context)
    }
  },

  update: function () {
    game.stats.update();
  }
};

module.exports = State;//returned object on require('file.js');
