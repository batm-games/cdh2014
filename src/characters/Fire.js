/**
 * Created by mauricio on 8/1/14.
 */
//var AssetManager = require('../utils/AssetManager');

function Fire() {
    var emitter = this.emitter = game.add.emitter(0, 0, 400);
    emitter.blendMode = PIXI.blendModes.ADD;
    emitter.minParticleAlpha = 0;
    emitter.maxParticleAlpha = 1;
    emitter.minParticleSpeed.y = 0;
    emitter.maxParticleSpeed.y = -5;
    emitter.minParticleSpeed.x = -10;
    emitter.maxParticleSpeed.x = 10;
    emitter.makeParticles(['fire']);

    emitter.gravity = -100;
    emitter.setAlpha(1, 0, 5000);
    emitter.setScale(1, 0, 1, 0, 3000);

    emitter.start(false, 2000, 10);

    this.frames = [];
}

Fire.prototype = {
    /**
     * Each object: {x: ..., y: ...}
     * @param frames
     */
    setFrames: function (frames) {
        this.frames = frames;
    },

    update: function (player, frame) {
        var current = this.frames[frame];
        if (!current) {
            throw 'no current frame';
        }
        this.emitter.x = player.x + current.x;
        this.emitter.y = player.y + current.y;
    }
};

module.exports = Fire;