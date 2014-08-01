/**
 * Created by user on 8/1/14.
 */
var TVEnemy = {
    ENEMY_SPEED :200
};

TVEnemy.createEnemy = function(x, y, key, frame) {
    this.X = x;
    this.Y = y;

    var enemy = this.enemy = game.add.sprite(this.X, this.Y, key, frame);
    enemy.animations.add('walk', ['walk-1.png','walk-2.png'], 10, true);
    enemy.animations.add('stop', ['stop-1.png','stop-2.png'], 10, true);
    enemy.animations.play('walk');
    enemy.anchor.set(0.5,0.5);
    enemy.scale.set(0.25,0.25);
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
}

TVEnemy.updateEnemy = function(controls) {
//    var dir = new Phaser.Point(0,0);
//    if(controls.left.isDown) {dir.x -= 1;}
//    if(controls.right.isDown){dir.x += 1;}
//    if(controls.up.isDown)   {dir.y -= 1;}
//    if(controls.down.isDown) {dir.y += 1;}
//
//    dir.setMagnitude(this.ENEMY_SPEED);
//    this.enemy.body.velocity.x = dir.x;
//    this.enemy.body.velocity.y = dir.y;
}

module.exports = TVEnemy;