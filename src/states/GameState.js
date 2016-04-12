import * as util from 'Utilities';
import {game} from 'index';
import {bgColors} from 'Constants'

// Normal walking state that allows a jump.
class WalkingState {
	constructor(sprite, cursor) {
		util.trace('Walking...')
		this.sprite = sprite;
		this.cursor = cursor;
	}

	handleJumping() {
		let p = this.sprite;

		if (p.body.onFloor())
		{
				p.body.velocity.y = -200;
		}
	}

	nextState() {
		let p = this.sprite;
		if (p.body.onFloor()) {
			return this;
		}
		else {
			return new JumpingState(this.sprite, this.cursor);
		}
	}
}

// Allow player to jump and handle single double jump with a minimum .25 second
// delay
class JumpingState {
	constructor(sprite, cursor) {
		util.trace('Jumping...')
		this.sprite = sprite;
		this.cursor = cursor;
		this.canDoubleJump = false;
		game.time.events.add(Phaser.Timer.SECOND * 0.25, this.setJump, this);
	}

	setJump() {
		this.canDoubleJump = true;
	}

	handleJumping() {
		let p = this.sprite;

		if (p.body.onFloor())
		{
				p.body.velocity.y = -200;
		}
		else {
			if(this.canDoubleJump)	{
				util.trace('Double!!')
				this.canDoubleJump = false;
				p.body.velocity.y += -200
			}
		}
	}

	nextState() {
		let p = this.sprite;
		if (p.body.onFloor())	{
			return new WalkingState(this.sprite, this.cursor);
		}
		else {
			return this;
		}
	}
}

class PlayerState {
		constructor(sprite, cursor) {
			this.sprite = sprite;
			this.body = sprite.body;
			this.cursor = cursor;
			this.state = new WalkingState(sprite, cursor)
		}

}

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

		this.playerState = new PlayerState(this.player, this.cursor);
		//this.backgroundlayer.resizeWorld();
	}

	update() {
		game.physics.arcade.collide(this.player, this.blockedLayer);
		var p = this.playerState;
		var cursor = this.cursor;

		p.body.velocity.x = 0;

	  if(p.body.onFloor()) {
			p.state = p.state.nextState();
		}
    if (cursor.up.isDown)
    {
			p.state.handleJumping();
			p.state = p.state.nextState();
/*        if (p.body.onFloor())
        {
            p.body.velocity.y = -200;
        }
				else {
					var nv = p.body.velocity.y -= 5;
					if(nv < -225) nv = -225;
					p.body.velocity.y = nv;
				}
				*/
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
