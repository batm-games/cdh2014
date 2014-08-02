/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');
var Fire = require('../../characters/Fire');

Level1 = function () {
    AbstractLevel.call(this, 'world2', 4);
};
Level1.prototype = Object.create(AbstractLevel.prototype);
_.merge(Level1.prototype, {
    preload: function () {},
    create: function () {
        game.time.deltaCap = 1 / 40;
        this.timeEnd = moment().add('seconds', 60);
        //this.createBackground();
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            },
            {
                name: 'Tile Layer 2',
                collisionTiles: [2]
            },
            {
                name: 'Tile Layer 3',
                collisionTiles: [3]
            }
        ]);
        this.createPlayer();
        this.createDoor();
        game.camera.follow(this.player.getSprite());
    },
    update: function (event) {
        game.physics.arcade.collide(this.player.getSprite(), this.layers[0]);
        game.physics.arcade.collide(this.player.getSprite(), this.layers[0]);
        game.physics.arcade.collide(this.door, this.layers[0]);
        game.physics.arcade.collide(this.player.getSprite(), this.door, this.goToNextLevel, null, this);
        game.physics.arcade.overlap(this.player.getSprite(), this.layers[1], this.foundZebra, null, this);
        game.physics.arcade.overlap(this.player.getSprite(), this.layers[2], this.zebraDamagePlayer, null, this);
        game.stats.update();
        var delta = event.time.elapsed / 1000.0;
        this.player.update(delta);

        var now = moment();
        var left = this.timeEnd.diff(now);
        game.debug.text(moment(left).format('mm:ss'), halfX, 50);

        if (this.player.dead ||
                left < 100) {
            game.state.start('Level1');
        }
//        this.background.update(this.player.getX());

        this.layers[0].alpha = this.player.fire.intensity / 10 / 2;
        this.layers[1].alpha = this.player.fire.intensity / 10 / 2;
        this.layers[2].alpha = this.player.fire.intensity / 10 / 2;
    },
    goToNextLevel: function () {
        if (this.player.people >= this.minimumZebras) {
            game.state.start('Level1');
        } else {
            this.door.body.velocity.x -= this.door.body.velocity.x * 2;
        }
    }
});

module.exports = Level1;