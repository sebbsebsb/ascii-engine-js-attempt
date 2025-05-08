import Vector from "./Vector.js";


export default class CombatVisuals {
  constructor(glob, effects) {
    this.glob = glob;
    this.effects = effects;
  }
  
  
  
  shootEntityVisuals(entityShot = null) {
    this.smoke();
    if (entityShot) {
      // line from player to entity
      // the target should change with the distance tbh
      for (let i = 1; i < this.glob.distAvg(entityShot.loc); i++) {
        const vector = new Vector().update(this.getRandomFromLine(entityShot));
        this.effects.set(vector.toString(), {text: this.getRandomBlock(), ticksRemaining: Math.ceil(Math.random() * 10)});
      }
      // little smoke cirlce around entity
      this.smoke(5, entityShot.loc);
      this.hit();
    }
    this.bang();
    return entityShot;
  }
  
  reload() {
    // 'RELOAD' visual
    const vector = new Vector(this.glob.x + Math.ceil(Math.random() * 9) - 6, this.glob.y + Math.ceil(Math.random() * 9) - 5);
    
    this.effects.set(vector.toString(), { text: 'RE', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'LO', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'AD', ticksRemaining: 2 });
  }
  
  
  smoke(radius = 10, target = this.glob) {
    // smoke visual
    for (let i = 1; i < radius; i++) {
      const vector = new Vector();
      vector.update(this.getRandomCircle(i, target));
      
      this.effects.set(vector.toString(), {text: this.getRandomBlock(), ticksRemaining: Math.ceil(Math.random() * 10)})
    }
    for (let i = 1; i < radius / 2; i++) {
      const vector = new Vector();
      vector.update(this.getRandomCircle(i, target));
      
      this.effects.set(vector.toString(), {text: this.getRandomBlock(), ticksRemaining: Math.ceil(Math.random() * 12)})
    }
  }
  bang() {
    // 'BANG' visual
    const vector = new Vector(this.glob.x + Math.ceil(Math.random() * 9) - 6, this.glob.y + Math.ceil(Math.random() * 9) - 5);
    
    this.effects.set(vector.toString(), { text: 'BA', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'NG', ticksRemaining: 2 });
  }
  hit() {
    // 'BANG' visual
    const vector = new Vector(this.glob.x + Math.ceil(Math.random() * 9) - 6, this.glob.y + Math.ceil(Math.random() * 9) - 5);
    
    this.effects.set(vector.toString(), { text: 'HI', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'T!', ticksRemaining: 2 });
  }
  click() {
    // 'CLICK' visual
    const vector = new Vector(this.glob.x + Math.ceil(Math.random() * 9) - 6, this.glob.y + Math.ceil(Math.random() * 9) - 5);
    
    this.effects.set(vector.toString(), { text: 'CL', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'IC', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'K ', ticksRemaining: 2 });
  }
  eject() {
    // 'EJECT' visual
    const vector = new Vector(this.glob.x + Math.ceil(Math.random() * 9) - 6, this.glob.y + Math.ceil(Math.random() * 9) - 5);
    
    this.effects.set(vector.toString(), { text: 'EJ', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'EC', ticksRemaining: 2 });
    this.effects.set(vector.add(1,0).toString(), { text: 'T ', ticksRemaining: 2 });
  }

  getRandomCircle(range, target = this.glob) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()) * range;
    
    const dx = Math.round(Math.cos(angle) * radius);
    const dy = Math.round(Math.sin(angle) * radius);
    
    const vector = new Vector().update(target).add(dx, dy);
    return vector;
  }
  getRandomBlock() {
    const i = Math.ceil(Math.random() * 4);
    switch (i) {
      case 1:
        return '\u2588\u2588';
      case 2:
        return '\u2591\u2591';
      case 3:
        return '\u2592\u2592';
      case 4:
        return '\u2593\u2593';
      default:
        console.log('default in getRandomBlock()');
        break;
    }
  }
  // gets a random vector between glob and entity.loc
  getRandomFromLine(entity) {
    const lineVectors = this.glob.getLineVectors(entity.loc);
    const index = Math.floor(Math.random() * lineVectors.length);
    return lineVectors[index];
  }
}