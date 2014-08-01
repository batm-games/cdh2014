/**
 * Created by user on 8/1/14.
 */
var TVEnemy = function(){
    this.ENEMY_SPEED = 10;
    this.enemy = null;
    this.id = parseInt(Math.random() * 10000);
};

TVEnemy.prototype.createEnemy = function(x, y, key, frame, enemy_speed) {
    this.X = x;
    this.Y = y;
    this.ENEMY_SPEED = enemy_speed;

    var enemy = this.enemy = game.add.sprite(this.X, this.Y, key, frame);
    enemy.animations.add('walk', ['walk-1.png','walk-2.pn'], 10, true);
    enemy.animations.add('stop', ['stop-1.png','stop-2.png'], 10, true);
    enemy.animations.play('walk');
    enemy.anchor.set(0.5,0.5);
    enemy.scale.set(0.25,0.25);
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
}

TVEnemy.prototype.updateEnemy = function() {
    var dir = new Phaser.Point(0,0);
    dir.x += 1;
    dir.setMagnitude(this.ENEMY_SPEED);
    this.enemy.body.velocity.x = dir.x;
    if(this.enemy.body.onWall()) {
        this.enemy.position.x = 0;
    }

}

module.exports = TVEnemy;