export default class Toggles {
  constructor(effects, combatVisuals, audio) {
    this.tick = 0;
    this.gameState = 'game';
    this.debug = true;
    this.freeCam = false;
    this.pause = false;
    this.superSpeed = false;
    this.currentMenu = null;
    this.flash = false;
    this.effects = effects;
    this.combatVisuals = combatVisuals;
    this.audio = audio;
    
    this.reloadTicksLeft = 0;
    this.reloading = null;
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
    //////////////////////////////TESTING IN HERE
    // console.log(this.reloading);
    
    
    
    
    if (!this.pause) this.tick++;
    
    // updates and disappears visual effects
    for (const key of this.effects.keys()) {
      const effect = this.effects.get(key);
      effect.ticksRemaining--;
      if (effect.ticksRemaining < 1) {
        this.effects.delete(key);
      }
    }
    
    // updates reload
    if (this.reloading) {
      this.reloadTicksLeft--;
      if (!this.reloadTicksLeft) {
        this.audio.playReload(this.reloading);
        this.combatVisuals.reloadDone();
        this.reloading = null;
      }
      this.combatVisuals.reload();
    }
    
    
    return this.tick;
  }
  
  startReload(reloadTime, magType) {
    this.reloading = magType;
    this.reloadTicksLeft = reloadTime;
  }
  
  
  
}