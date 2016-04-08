//import RainbowText from 'objects/RainbowText';
import * as util from 'Utilities';
import {game} from 'index';


class PreloadState extends Phaser.State {
	preload() {
		util.trace('Preloading State.')
    game.load.image("loading","assets/sprites/loading.png")
		game.load.image("loadText","assets/GameLoading.png")
		game.load.image("background","assets/background.png")
		game.load.image("level","assets/Sample Platform Level.png")

		game.load.bitmapFont("littera", "assets/fonts/litteraDefault.png", "assets/fonts/litteraDefault.fnt")
	}

	create() {
		game.load.onFileComplete.add(this.fileComplete, this);

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    util.trace('preload done.')
		this.state.start('LoadingState')
	}

	fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
		util.trace("PRG| File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles)
	}

}

export default PreloadState;
