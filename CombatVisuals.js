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
    this.printWordsOnScreen('RELOAD');
  }
  reloadDone() {
    this.printWordsOnScreen('FINISHED');
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
    this.printWordsOnScreen('BANG');
  }
  hit() {
    this.printWordsOnScreen('HIT');
  }
  click() {
    this.printWordsOnScreen('CLICK');
  }
  eject() {
    this.printWordsOnScreen('CHAMBERED');
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
  
  printWordsOnScreen(string) {
    const start = new Vector(
      this.glob.x + Math.ceil(Math.random() * 9) - 7, 
      this.glob.y + Math.ceil(Math.random() * 9) - 5
    ); // choose a coord to start at
    
    
    
    for (let i = 0; i < string.length; i += 2) {
      const chunk = string[i] + (string[i + 1] || ' '); // pair of 2 chars
      
      
      const pos = start.add(1, 0) // move one tile right per chunk
      
      
      this.effects.set(pos.toString(), {
        text: chunk,
        ticksRemaining: 2
      });
    }
  }
}