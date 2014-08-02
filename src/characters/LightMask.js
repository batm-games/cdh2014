/**
 * Created by mauricio on 8/1/14.
 */
//var AssetManager = require('../utils/AssetManager');
function LightMask(owner) {
    this.owner = owner;
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
}

LightMask.prototype = {
    update: function (delta) {
        this.dim();
        this.mask.x = this.owner.getSprite().x;
        this.mask.y = this.owner.getSprite().y;

        if (this.debug) {
            game.debug.spriteInfo(this.mask, 200, 50);
            game.debug.text(this.mask.alpha, 500, 50);
        }
    },

    dim: function (delta) {
        this.mask.alpha = Math.min(this.owner.intensity / 10, 1.1);
    },

    resetLight: function () {
        this.mask.alpha = 1;
    }
};

module.exports = LightMask;