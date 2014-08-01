/**
 * Created by tlatif on 7/22/2014.
 */
module.exports = {
    preload: function () {
        //game.load.image('progressBar', 'assets/progressBar.png');
    },
    create: function () {
        //game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};