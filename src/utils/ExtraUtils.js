var ExtraUtils = {};

ExtraUtils.showCebron = function(game, x, y){
    var sprite = game.add.sprite(x, y, "cebron");

    var tween = game.add.tween(sprite)
        .to({
                x: game.camera.x + halfX,
                y: game.camera.y + halfY
            }, 400, Phaser.Easing.Sinusoidal.InOut, false, 0, 1, false)
        .start();

    tween.onComplete.add(function() {
        sprite.kill();
    }, this);
};

module.exports = ExtraUtils;