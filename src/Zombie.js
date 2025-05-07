import Entity from "./Entity.js";

export default class Zombie extends Entity {
  constructor(maxHealth, loc, colMap, glob, health) {
    super(maxHealth, loc, colMap, health);
    this.glob = glob;
  }
  render() {
    switch (this.state) {
      case 'idle': return 'zz';
      default: return '??';
    }
  }
  decideMove() {
    switch (Math.ceil(Math.random() * 2)) {
      case 1:
        this.randomMove();
        break;
      case 2:
        this.moveTowardLoc(this.glob);
        break;
      default:
        console.log('default in decideMove() Zombie');
        break;
        
    }
  }
}