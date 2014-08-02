/**
 * Created by user on 8/1/14.
 */
var TVEnemy = {
  createEnemy: function(x, y, key, frame, enemySpeed) {
    this.enemySpeed = enemySpeed;
    var enemy = game.add.sprite(x,y, key, frame);
    enemy.animations.add('walk', [4, 3, 2, 1, 0], 10, true);
    // enemy.animations.add('stop', ['stop-1.png','stop-2.png'], 10, true);
    enemy.animations.play('walk');
    enemy.anchor.set(0.5,0.5);
    enemy.scale.set(0.25,0.25);
    enemy.scale.x *= -1;
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    if(y <= Y * 0.1) {
      enemy.body.velocity.y = enemySpeed;
    }else if(y >= Y * 0.8){
      enemy.body.velocity.y = -enemySpeed;
    }else if(x >= X * 0.9){
      enemy.body.velocity.x = -enemySpeed;
      enemy.scale.x *= -1;
    }else {
      enemy.body.velocity.x = enemySpeed;
    }

    LifeUtils.giveLife(enemy, 30);
    enemy.damage = 10;
    return enemy;
  },
  createGhost: function(x, y, enemySpeed) {
    var KEY = 'ghost';
    var enemy = this.createEnemy(x, y, KEY, null, enemySpeed);
    enemy.scale.set(1, 1);
    return enemy;
  },
  updateEnemy: function(enemy) {
    if(enemy.body.onWall() && enemy.position.x >= X*0.4) {
      enemy.position.x = 0;
      enemy.kill();
      enemy.body.velocity.x = this.enemySpeed;
    }
  }
};

module.exports = TVEnemy;