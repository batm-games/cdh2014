/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');
var Fire = require('../../characters/Fire');

var Level0 = function () {
    AbstractLevel.call(this, 'world1');
};

Level0.prototype = Object.create(AbstractLevel.prototype);

_.merge(Level0.prototype, {
    preload: function () {
    },
    createFire: function () {
        this.fire = new Fire(this.player);
        this.fire.setFrames([{ x: 0, y: -30 }]);
    },
    createMask: function () {
        this.mask = game.add.sprite(halfX + 30, halfY, 'maskInverse');
        // tungsten http://planetpixelemporium.com/tutorialpages/light.html
        this.mask.tint = 0xffc58f;
        this.mask.anchor.setTo(0.5, 0.5);
        this.mask.scale.setTo(10, 10);
        this.mask.alpha = 0.4;
        this.mask.blendMode = PIXI.blendModes.ADD;
//        PIXI.blendModes = {
//            NORMAL:0,
//            ADD:1,
//            MULTIPLY:2,
//            SCREEN:3,
//            OVERLAY:4,
//            DARKEN:5,
//            LIGHTEN:6,
//            COLOR_DODGE:7,
//            COLOR_BURN:8,
//            HARD_LIGHT:9,
//            SOFT_LIGHT:10,
//            DIFFERENCE:11,
//            EXCLUSION:12,
//            HUE:13,
//            SATURATION:14,
//            COLOR:15,
//            LUMINOSITY:16
//        };
    },
    create: function () {
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            }
        ]);
        this.createPlayer();
        this.createFire();
        this.createMask();
        game.camera.follow(this.player.getSprite());
    },
    update: function () {
        game.stats.update();
        game.physics.arcade.collide(
            this.player.getSprite(),
            this.layers[0]
        );
        this.player.controlPlayer();
        this.fire.update(0);
        this.mask.x = this.fire.getSprite().x;
        this.mask.y = this.fire.getSprite().y;
    }

});
module.exports = Level0;