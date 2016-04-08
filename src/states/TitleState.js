import * as util from 'Utilities';
import {game} from 'index';
import {bgColors} from 'Constants'

class TitleState extends Phaser.State {

  create() {
    //http://kvazars.com/littera/

    this.stage.backgroundColor = 0x2c2b2b;
    this.add.image(0, 0, 'background');

    game.add.bitmapText(100, 205, "littera", "This is the Game Title", 36); //.anchor.x = 0.5;
    let start = game.add.bitmapText(100, 250, "littera", "Click to start.", 36);

    //var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
    start.inputEnabled = true;
    start.events.onInputDown.add(this.startGame, this)
    start.events.onInputOver.add(this.startOver, this);
    start.events.onInputOut.add(this.startOut, this);

    //playButton.anchor.set(0.5);


    //game.state.start("SpriteState");
    //game.time.events.add(Phaser.Timer.SECOND * 2, this.startGame, this);
  }

  startGame() {
    game.state.start("SpriteState");
  }

  startOver() {
    util.trace('Over.')
  }

  startOut() {
    util.trace('Out.')
  }
}

export default TitleState
