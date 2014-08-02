function State() {
}

State.prototype = {
  preload: function () {
    
  },
  create: function () {
    var text = "Ganasteeeeeeeee!\n";
    text += "Creditos\n";
    text += "== Diseñador Grafico == \nMiguel Velasco\n";
    text += "== Programadores ==\n";
    text += "Mauricio Poppe\n";
    text += "Edwin Guzman\n";
    text += "Thaer Latif\n";
    text += "Ronald Valverde\n";
    text += "Alvaro Rojas\n";
    text += "Gabriel Rea\n\n\n";
    text += "Bitless Against the Machine\n\n";
    text += "Gracias por jugar\n";

        var style = { font: "65px Arial", fill: "#00ff00", align: "center" };

//        var lightMask = new LightMask(this.fire);
//        var tween = game.add.tween(torch).to(
//            {y:-Y*0.47 + Y*2.5}
//            ,15000
//        );

    var t = game.add.text(X*0.5,Y*1.7, text, style);
    t.anchor.set(0.5,0.5);

    game.add.tween(t)
    .to({y:0},15000)
    .start();

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
