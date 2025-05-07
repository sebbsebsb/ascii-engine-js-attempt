export default class Toggles {
  constructor(effects) {
    this.tick = 0;
    this.gameState = 'game';
    this.debug = true;
    this.freeCam = false;
    this.pause = false;
    this.superSpeed = false;
    this.effects = effects;
  };
  
  toString() {
    let output = '';
    if (this.debug) output += 'DB ';
    if (this.freeCam) output += 'FC ';
    if (this.pause) output += 'P ';
    if (this.superSpeed) output += 'SS';
    
    return output;
  }
  
  update() {
    if (!this.pause) this.tick++;
    
    // updates and disappears visual effects
    for (const key of this.effects.keys()) {
      const effect = this.effects.get(key);
      effect.ticksRemaining--;
      if (effect.ticksRemaining < 1) {
        this.effects.delete(key);
      }
    }
    return this.tick;
  }
  
}