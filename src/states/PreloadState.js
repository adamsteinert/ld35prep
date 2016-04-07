//import RainbowText from 'objects/RainbowText';
import * as util from 'Utilities';
import {game} from 'index';


class PreloadState extends Phaser.State {
	preload() {
		util.trace('Preloading the preloader.')
    game.load.image("loading","assets/sprites/loading.png")
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
