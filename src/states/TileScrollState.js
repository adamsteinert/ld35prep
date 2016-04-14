import * as util from 'Utilities';
import {game} from 'index';
import {bgColors} from 'Constants'

class TileScrollState extends Phaser.State {
	// http://phaser.io/docs/2.4.4/Phaser.TileSprite.html
  // http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
  // https://www.gimp.org/tutorials/Tileable_Textures/
  // http://phaser.io/examples/v2/camera/basic-follow
  // http://phaser.io/examples/v2/groups/group-as-layer
  
	create() {
		this.cursor = game.input.keyboard.createCursorKeys();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

		util.trace('Game State On.')
		this.stage.backgroundColor = 0x2c2b2b;

    this.cloudsLT = game.add.tileSprite(0,0,1280, 736,"cloudslt");
    this.cloudsBlk = game.add.tileSprite(0,0,1280, 736,"cloudsblk");
    this.clouds = game.add.tileSprite(0,0,1280, 736,"clouds");

    this.clouds.tint = 0x7a4b53;
    this.cloudsLT.tint = 0x00FF00;

		this.player = this.game.add.sprite(game.world.centerX, 700, 'player');
    this.player.anchor.setTo(0.5, 1);
		//  We need to enable physics on the player
		game.physics.arcade.enable(this.player);

		//  Player physics properties. Give the little guy a slight bounce.
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 300;
		this.player.body.collideWorldBounds = true;
	}

	update() {
		game.physics.arcade.collide(this.player, this.blockedLayer);
		var p = this.player;
		var cursor = this.cursor;
    let cloudV = 0;

		p.body.velocity.x = 0;

    if (cursor.up.isDown)
    {
        if (p.body.onFloor())
        {
            p.body.velocity.y = -200;
        }
    }

    if (cursor.left.isDown)
    {
        //p.body.velocity.x = -150;
        cloudV = -15;
    }
    else if (cursor.right.isDown)
    {
        //p.body.velocity.x = 150;
        cloudV = 15;
    }

    this.clouds.tilePosition.x -= cloudV; // p.body.velocity.x / 10;
    this.cloudsLT.tilePosition.x -= (cloudV/4);
    this.cloudsBlk.tilePosition.x -= (cloudV/8);
	}
}

export default TileScrollState;
