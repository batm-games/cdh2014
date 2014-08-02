var ExtraUtils = {};
var imageFlag = false;

ExtraUtils.showCebron = function(game, x, y){
    if(imageFlag) return;
    imageFlag = true;

    var sprite = game.add.sprite(x, y, "cebron");
    var tween1 = game.add.tween(sprite)
        .to({
            x: game.camera.x + halfX,
            y: game.camera.y + halfY
        }, 400, Phaser.Easing.Sinusoidal.InOut, false, 0, 0, false)
        .start();
    console.log("test asdf asf");

    tween1.onComplete.add(function () {
        var tween2 = game.add.tween(sprite)
            .to({
                x: x,
                y: y
            }, 400, Phaser.Easing.Sinusoidal.InOut, false, 600, 0, false)
            .start();

        tween2.onComplete.add(function() {
            sprite.kill();
            imageFlag = false;
        });
    }, this);
};

module.exports = ExtraUtils;