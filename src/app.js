/**
Globals:
    game
    StateUtils
    X, Y
    halfX, halfY
**/
StateUtils = require('./utils/stateUtils');
TVEnemy = require('./characters/tvEnemy');

game = new Phaser.Game(1280, 640, Phaser.AUTO, 'game');

var stats = game.stats = this.stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.querySelector('#game').appendChild(stats.domElement);

Y = game.height;
X = game.width;
halfX = X * 0.5;
halfY = Y * 0.5;
require('./utils/AssetManager');
game.state.add('Demo1'   , require('./state/demo1')   , false);//(key,state,autoStart)
game.state.add('Demo2'   , require('./state/demo2')   , false);//(key,state,autoStart)
game.state.add('Demo3'   , require('./state/demo3')   , false);//(key,state,autoStart)
game.state.add('Demo4'   , require('./state/demo4')   , false);//(key,state,autoStart)
game.state.add('Demo5'   , require('./state/demo5')   , false);//(key,state,autoStart)
game.state.add('Platformer'   , require('./state/demoPlatform')   , false);//(key,state,autoStart)
game.state.add('TopView'   , require('./state/demoTopView')   , false);//(key,state,autoStart)
game.state.add('hackTopView'   , require('./state/hackTopView')   , false);//(key,state,autoStart)
game.state.add('Level0', require('./state/level/Level0'), false);//(key,state,autoStart)
game.state.add('MainMenu', require('./state/mainMenu'), false);//(key,state,autoStart)
game.state.add('Light', require('./state/lightTest'), false);//(key,state,autoStart)

game.state.start('Level0');

