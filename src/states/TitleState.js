import * as util from 'Utilities';
import {game} from 'index';
import {bgColors} from 'Constants'

class TitleState extends Phaser.State {

  create() {
    
    game.state.start("SpriteState");
  }

  startGame() {
    game.state.start("SpriteState");
  }
}

export default TitleState
