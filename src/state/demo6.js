var filter;
var socket;

function State() {
}

State.prototype = {
    preload: function () {
        this.game.load.image('ground', '/assets/gfx/ground.png');
        this.game.load.image('player', '/assets/gfx/player.png');
    },
    create: function () {
        socket = io('http://10.100.0.133:4000');
        var me = this;

        me.players = {};

        function createNewPlayer(x, y, spriteName) {
            var player = me.game.add.sprite(x, y, spriteName);
            me.game.physics.enable(player, Phaser.Physics.ARCADE);
            player.body.collideWorldBounds = true;
            return player;
        }

        socket.on('player:join', function (data) {
            me.players[data.socketId] = createNewPlayer(data.x, data.y, 'player');
        });

        socket.on('player:move', function (data) {
            console.log(data);
            me.players[data.id].body.x = data.x;
            me.players[data.id].body.y = data.y;
        });

        this.game.stage.backgroundColor = 0x4488cc;

        this.MAX_SPEED = 500; // pixels/second

        this.player = createNewPlayer(this.game.width/2, this.game.height-64, 'player');

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        // Create some ground for the player to walk on
        this.ground = this.game.add.group();
        for(var x = 0; x < this.game.width; x += 32) {
            // Add the ground blocks, enable physics on each, make them immovable
            var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
            groundBlock.body.immovable = true;
            groundBlock.body.allowGravity = false;
            this.ground.add(groundBlock);
        }

        // Show FPS
        this.game.time.advancedTiming = true;
        this.fpsText = this.game.add.text(
            20, 20, '', { font: '16px Arial', fill: '#ffffff' }
        );

        this.lastConnection = new Date();
    },

    update: function () {
        var actualTime = new Date();
        if(actualTime - this.lastConnection > 500) {
            this.lastConnection = actualTime;
            socket.emit('player:move', {
                x: this.player.body.x,
                y: this.player.body.y
            });
        }

        if (this.game.time.fps !== 0) {
            this.fpsText.setText(this.game.time.fps + ' FPS');
        }

        // Collide the player with the ground
        this.game.physics.arcade.collide(this.player, this.ground);
        for(var p in this.players) {
            if(this.players.hasOwnProperty(p)) {
                this.game.physics.arcade.collide(p, this.ground);
            }
        }

        if (this.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.body.velocity.x = -this.MAX_SPEED;
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.body.velocity.x = this.MAX_SPEED;
        } else {
            // Stop the player from moving horizontally
            this.player.body.velocity.x = 0;
        }
    },

    leftInputIsActive: function() {
        var isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x < this.game.width/4);
        return isActive;
    },

    rightInputIsActive: function() {
        var isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);
        return isActive;
    }
};

module.exports = State;