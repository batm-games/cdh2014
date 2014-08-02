/**
Globals:
    game
    game.stats
    StateUtils
    X, Y
    halfX, halfY
**/
StateUtils = require('./utils/stateUtils');
require('./utils/Statics');
TVEnemy = require('./characters/tvEnemy');
LifeUtils = require('./utils/LifeUtils');

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

// boot
game.state.add('boot', require('./state/boot'), false);
// load (loads assets for all the states)
game.state.add('load', require('./state/load'), false);

//game.state.add('Demo1'   , require('./state/demo1')   , false);//(key,state,autoStart)
//game.state.add('Demo2'   , require('./state/demo2')   , false);//(key,state,autoStart)
//game.state.add('Demo3'   , require('./state/demo3')   , false);//(key,state,autoStart)
//game.state.add('Demo4'   , require('./state/demo4')   , false);//(key,state,autoStart)
//game.state.add('Demo5'   , require('./state/demo5')   , false);//(key,state,autoStart)
//game.state.add('Platformer'   , require('./state/demoPlatform')   , false);//(key,state,autoStart)
//game.state.add('TopView'   , require('./state/demoTopView')   , false);//(key,state,autoStart)
game.state.add('hackTopView'   , require('./state/hackTopView')   , false);//(key,state,autoStart)
game.state.add('Level0', require('./state/level/Level0'), false);//(key,state,autoStart)
game.state.add('Level1', require('./state/level/Level1'), false);//(key,state,autoStart)
game.state.add('Level2', require('./state/level/Level2'), false);
game.state.add('teaAnimation', require('./state/teaAnimation'), false);//(key,state,autoStart)
//game.state.add('MainMenu', require('./state/mainMenu'), false);//(key,state,autoStart)
//game.state.add('Light', require('./state/lightTest'), false);//(key,state,autoStart)



game.state.start('boot');