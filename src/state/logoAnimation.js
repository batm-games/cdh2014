function State() {
}

State.prototype = {
    preload: function () {
        game.load.spritesheet('machines', './images/machines.png');
    },
    create: function () {
        var machines = game.add.sprite(halfX, halfY, 'machines');
        machines.anchor.setTo(0.5, 0.5);
        machines.width = Y*0.9;
        machines.height = Y*0.9;

        setTimeout(function() {
            var tween1 = game.add.tween(machines)
                .to({
                    alpha: 0
                }, 3000).start();
            tween1.onComplete.add(function () {
                machines.kill();
                game.state.start('teaAnimation');
            });
        }, 2000);
    },
    update: function (event) {
    }
};

module.exports = State;
