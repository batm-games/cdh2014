/**
 * Created by vudduu on 8/1/2014.
 */
var Background = function (game, config) {
    var sprite = config.sprite || Background.DEFAULT_SPRITE;
    var h = this.h = config.h || Background.DEFAULT_H;
    var w = this.w = config.w || Background.DEFAULT_W;

    this.game = game;
    this.camera = this.game.camera;

    this.bgLast1 = game.add.sprite(0, 0, sprite);
    this.bgLast2 = game.add.sprite(w, 0, sprite);

    this.bgLast1.height = this.bgLast2.height = h;
    this.bgLast1.width = this.bgLast2.width = w;
};
Background.prototype.update = function() {
    var incX = 0,
        currentX = parseInt(this.camera.x);

    if(currentX > this.lastX) incX = -0.1;
    if(currentX < this.lastX) incX = 0.1;

    this.updateBackgroundLast(incX);

    this.lastX = currentX;
};
Background.prototype.updateBackgroundLast = function(incX) {
    this.bgLast1.x += incX;

    if (this.bgLast1.x <= this.camera.x - this.w) {
        this.bgLast1.x = this.camera.x;
    }
    if (this.bgLast1.x >= this.camera.w) {
        this.bgLast1.x = this.camera.x;
    }

    if (this.bgLast1.x > this.camera.x) {
        this.bgLast2.x = this.bgLast1.x - this.w;
    }
    else {
        this.bgLast2.x = this.bgLast1.x + this.w;
    }
};

Background.DEFAULT_SPRITE = 'background';
Background.DEFAULT_H = Y;
Background.DEFAULT_W = X;


module.exports = Background;