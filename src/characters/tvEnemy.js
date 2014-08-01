/**
 * Created by user on 8/1/14.
 */
var TVEnemy = {
  createEnemy: function(x, y, key, frame, enemySpeed) {
    this.enemySpeed = enemySpeed;
    var enemy = game.add.sprite(x,y, key, frame);
    enemy.animations.add('walk', ['walk-1.png','walk-2.pn'], 10, true);
    // enemy.animations.add('stop', ['stop-1.png','stop-2.png'], 10, true);
    enemy.animations.play('walk');
    enemy.anchor.set(0.5,0.5);
    enemy.scale.set(0.25,0.25);
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.velocity.x = enemySpeed;
    LifeUtils.giveLife(enemy, 30);
    return enemy;
  },
  updateEnemy: function(enemy) {
    if(enemy.body.onWall()) {
      enemy.position.x = 0;
      enemy.body.velocity.x = this.enemySpeed;
    }
  }
};

module.exports = TVEnemy;