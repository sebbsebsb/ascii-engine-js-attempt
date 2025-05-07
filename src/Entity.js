import Vector from './Vector.js';

export default class Entity {
  constructor(maxHealth, loc, colMap, damage, health) {
    this.maxHealth = maxHealth;
    this.health = health || maxHealth;
    this.loc = loc;
    this.state = 'idle';
    this.colMap = colMap;
    this.damage = damage
  }
  randomMove() {
    const v = Vector.getRand();
    this.loc.tryMove(v, this.colMap);
  }
  moveTowardLoc(location) {
    this.loc.tryMove(this.loc.getDirection(location), this.colMap);
  }
  render() {
    switch (this.state) {
      case 'idle': return 'oo';
      default: return '??';
    }
  }
  decideMove() {
    this.randomMove();
  }
  hurt(amount) {
    health -= amount;
    if (health <= 0) {
      health = 0;
      // entitiy is dead idk1
    }
  }
}