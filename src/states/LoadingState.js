import RainbowText from 'objects/RainbowText';
import * as util from 'Utilities';
import {game} from 'index';

class LoadingState extends Phaser.State {
	preload() {
		util.trace('Preloading the loader.')

    var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
    loadingBar.anchor.setTo(0.5);
    game.load.setPreloadSprite(loadingBar);

		game.load.spritesheet("alien", "assets/sprites/alienThing.png", 128, 128, 6);
  }

  create() {
    util.trace('creating the loading state.')
    this.state.start("TitleState")
	}
}

export default LoadingState;
