/**
 * Created by mauricio on 8/1/14.
 */
//var AssetManager = require('../utils/AssetManager');

function Fire(owner) {
    var emitter = this.emitter = game.add.emitter(0, 0, 400);
    emitter.blendMode = PIXI.blendModes.ADD;
    emitter.minParticleAlpha = 0;
    emitter.maxParticleAlpha = 1;
    emitter.minParticleSpeed.y = 0;
    emitter.maxParticleSpeed.y = -5;
    emitter.minParticleSpeed.x = -10;
    emitter.maxParticleSpeed.x = 10;
    emitter.makeParticles(['fire']);

    emitter.gravity = -500;
    emitter.setScale(1, 0, 1, 0, 3000);

    emitter.start(false, 2000, 5);

    this.intensity = 10;
    this.frames = [];
    this.owner = owner;

    this.setIntensity(this.intensity);
}

Fire.prototype = {
    /**
     * Each object: {x: ..., y: ...}
     * @param frames
     */
    setFrames: function (frames) {
        this.frames = frames;
        return this;
    },

    setIntensity: function (n) {
        var scale = 10;
        n = Math.max(n, 1);
        if (n < 0) {
            throw 'less than zero';
        }
        this.intensity = n;
        this.emitter.setAlpha(this.intensity / 10, 0, 5000);
//        this.emitter.minParticleSpeed.x = -n * scale;
//        this.emitter.maxParticleSpeed.x = n * scale;
        return this;
    },

    setIntensityDelta: function (delta) {
        this.setIntensity(this.intensity + delta);
        return this;
    },

    getSprite: function () {
        return this.emitter;
    },

    update: function (delta, frame) {
        var current = this.frames[frame];
        if (!current) {
            throw 'no current frame';
        }
        this.dim(delta);
        this.emitter.x = this.owner.getSprite().x + current.x;
        this.emitter.y = this.owner.getSprite().y + current.y;
    },

    dim: function (delta) {
        this.setIntensity(
            this.intensity - delta * 1.1
        );
    }
};

module.exports = Fire;