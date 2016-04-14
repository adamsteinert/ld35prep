import GameState from 'states/GameState';
import TileScrollState from 'states/TileScrollState';
import PreloadState from 'states/PreloadState';
import LoadingState from 'states/LoadingState';
import TitleState from 'states/TitleState';
import SpriteState from 'states/SpriteState';

class Game extends Phaser.Game {

	constructor() {
		console.log('XXXXgame starting')
		super(1280, 736, Phaser.AUTO, 'content', null);

		this.state.add('PreloadState', PreloadState, false);
		this.state.add('LoadingState', LoadingState, false);
		this.state.add('GameState', GameState, false);
		this.state.add('TileScrollState', TileScrollState, false);
		this.state.add('TitleState', TitleState, false);
		this.state.add('SpriteState', SpriteState, false);

		this.state.start('PreloadState');
		console.log('XXXXgame started')
	}
}

export let game = new Game();
