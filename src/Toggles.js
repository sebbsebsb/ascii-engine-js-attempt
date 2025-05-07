export default class Toggles {
  constructor() {
    this.tick = 0;
    this.gameState = 'game';
    this.debug = true;
    this.freeCam = false;
    this.pause = false;
    this.superSpeed = false;
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
    return this.tick;
  }
  
}