import Entity from "./Entity.js";

export default class Zombie extends Entity {
  constructor(maxHealth, loc, colMap, glob, damage, health) {
    super(maxHealth, loc, colMap, damage, health);
    this.glob = glob;
  }
  render() {
    switch (this.state) {
      case 'idle': return 'zz';
      case 'chasing': return '!!';
      default: return '??';
    }
  }
  
  // AI
  decideMove() {
    if (this.glob.distAvg(this.loc) < 10) { // he sees you
      this.state = 'chasing';
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
    } else {
      this.randomMove();
    }
    
    

  }
  
  
}