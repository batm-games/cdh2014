var ExtraUtils = {};
var imageFlag = false;

ExtraUtils.showCebron = function(game, x, y){
    if(imageFlag) return;
    imageFlag = true;

    var sprite = game.add.sprite(x, y, "cebron");
    var yaa = game.add.sprite(
        game.camera.x + halfX, game.camera.y - 100, 'yaaa'
    );
    yaa.anchor.setTo(0.5, 0.5);

    var yaaaa = game.add.audio('yaaaa',1,false);
    yaaaa.play('', 0, 1, false);
    game.add.tween(yaa)
        .to({
            y: game.camera.y + 100
        }, 400, Phaser.Easing.Sinusoidal.InOut, false, 0, 0, false)
        .start()
        .onComplete.add(function () {
            game.add.tween(yaa)
                .to({
                    y: game.camera.y - 100
                }, 400, Phaser.Easing.Sinusoidal.InOut, false, 600, 0, false)
                .start()
                .onComplete.add(function() {
                    yaa.kill();
    //                imageFlag = false;
                });
        });

//    sprite.scale.set(1.1, 1,1);
    var tween1 = game.add.tween(sprite)
        .to({
            x: game.camera.x + halfX * 1.3,
            y: game.camera.y + halfY * 1.3
        }, 400, Phaser.Easing.Sinusoidal.InOut, false, 0, 0, false)
        .start();
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