/**
 * Created by vudduu on 8/1/2014.
 */
var Background = function (game, config) {
    var sprite = config.sprite || Background.DEFAULT_SPRITE;
    var h = this.h = config.h || Background.DEFAULT_H;
    var w = this.w = config.w || Background.DEFAULT_W;
    var a = this.a = config.a || 1;
    this.v = config.v || 0;
//    console.log(this.v);
    this.game = game;
    this.camera = this.game.camera;

    this.bg = game.add.tileSprite(0, 0, X, Y, sprite);
//    this.bg.blendMode = PIXI.blendModes.ADD;
    this.bg.scale.y = 1.5;
//    this.bgLast2 = game.add.sprite(w, 0, sprite);

    this.bg.alpha = a;
//    this.bg.tint = 0x111111;

//    this.bgLast1.tint = 0xff0000;
//    this.bgLast2.tint = 0xff0000;

    this.bg.width = w;
    this.bg.height = h;
//    this.bgLast1.width = this.bgLast2.width = w;
};
Background.prototype.update = function(player) {
    var incX = 0,
        currentX = parseInt(this.camera.x);

    if(currentX > this.lastX) incX = -this.v;
    if(currentX < this.lastX) incX = this.v;

    this.bg.x = this.camera.x;
    this.bg.y = this.camera.y;
    this.bg.tilePosition.x += incX;
//    this.updateBackgroundLast(incX);
    this.lastX = currentX;
};
Background.prototype.updateBackgroundLast = function(incX) {
    this.bg.x += incX;

//    if (this.bg.x <= this.camera.x - this.w) {
//        this.bg.x = this.camera.x;
//    }
//    if (this.bg.x >= this.camera.w) {
//        this.bg.x = this.camera.x;
//    }
};

Background.DEFAULT_SPRITE = 'city';
Background.DEFAULT_H = Y;
Background.DEFAULT_W = X;


module.exports = Background;