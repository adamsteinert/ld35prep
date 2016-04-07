import {game} from 'index';

class SpriteState extends Phaser.State {
  create() {
    this.alien = game.add.sprite(100, 100, "alien");
    let wR = this.alien.animations.add('walkRight', [0,1,2], true);
    let wL = this.alien.animations.add('walkLeft', [3,4,5], true);
    this.alien.animations.play('walkRight', 3, true);
  }

  update() {
    //this.alien.animations.stop();
  }
}

export default SpriteState;
