import * as util from 'Utilities';
import {game} from 'index';
import {bgColors} from 'Constants'

class GameState extends Phaser.State {
	// Helpful tiled tutorial for loading tiled bits.
	// https://gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/
  // http://phaser.io/examples/v2/tilemaps/map-collide

	create() {
		this.cursor = game.input.keyboard.createCursorKeys();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

		util.trace('Game State On.')
		this.stage.backgroundColor = 0x2c2b2b;

		this.map = this.game.add.tilemap('gameTilemap');

		//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		this.map.addTilesetImage('ShapeTileset', 'gameTiles');
		this.map.setCollisionBetween(1,5, true, "Playscape");

		this.blockedLayer = this.map.createLayer("Playscape")
		this.objectLayer = this.map.createLayer("Object Ref");

		this.player = this.game.add.sprite(32, 32, 'player');

		//  We need to enable physics on the player
		game.physics.arcade.enable(this.player);

		//  Player physics properties. Give the little guy a slight bounce.
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 300;
		this.player.body.collideWorldBounds = true;

		//this.backgroundlayer.resizeWorld();
	}

	update() {
		game.physics.arcade.collide(this.player, this.blockedLayer);
		var p = this.player;
		var cursor = this.cursor;

		p.body.velocity.x = 0;

    if (cursor.up.isDown)
    {
        if (p.body.onFloor())
        {
            p.body.velocity.y = -200;
        }
				else {
					var nv = p.body.velocity.y -= 5;
					if(nv < -225) nv = -225;
					p.body.velocity.y = nv;
				}
    }

    if (cursor.left.isDown)
    {
        p.body.velocity.x = -150;
    }
    else if (cursor.right.isDown)
    {
        p.body.velocity.x = 150;
    }
	}
}

export default GameState;
