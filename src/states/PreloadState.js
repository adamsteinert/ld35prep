//import RainbowText from 'objects/RainbowText';
import * as util from 'Utilities';
import {game} from 'index';


class PreloadState extends Phaser.State {
	preload() {
		util.trace('Preloading State.')
    game.load.image("loading","assets/sprites/loading.png")
		game.load.image("loadText","assets/GameLoading.png")
		game.load.image("background","assets/background.png")
		game.load.image("player","assets/Blurble.png")

		this.load.tilemap('gameTilemap', 'assets/Sample Platform Level.json', null, Phaser.Tilemap.TILED_JSON);
		//game.load.image("level","assets/Sample Platform Level.png")
		game.load.image("gameTiles", "assets/ShapeTileset.png")

		game.load.bitmapFont("littera", "assets/fonts/litteraDefault.png", "assets/fonts/litteraDefault.fnt")


		game.load.image("clouds", "assets/Clouds.png");
    game.load.image("cloudsblk", "assets/Clouds_blk.png");
		game.load.image("cloudslt", "assets/Clouds_lt.png");
		
	}

	create() {
		game.load.onFileComplete.add(this.fileComplete, this);

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    util.trace('preload done.')
		//this.state.start('LoadingState')
		this.state.start('TileScrollState')
	}

	fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
		util.trace("PRG| File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles)
	}

}

export default PreloadState;
