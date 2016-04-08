import RainbowText from 'objects/RainbowText';
import * as util from 'Utilities';
import {game} from 'index';

class LoadingState extends Phaser.State {
	preload() {
		util.trace('Loading State.')

		this.stage.backgroundColor = 0x1f1f1f;
    var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
		loadingBar.tint = 0xca4037;
		var loadingText = this.add.sprite(game.width/2, (game.height/2), "loadText");
		loadingText.tint = 0x63499e;

		loadingText.y += loadingText.height;

    loadingBar.anchor.setTo(0.5);
		loadingText.anchor.setTo(0.5);

    game.load.setPreloadSprite(loadingBar);

		game.load.spritesheet("alien", "assets/sprites/alienThing.png", 128, 128, 6);
  }

  create() {
    util.trace('creating the loading state.')
		game.time.events.add(Phaser.Timer.SECOND * 2, this.nextState, this);
	}

	nextState() {
		this.state.start("TitleState")
	}
}

export default LoadingState;
