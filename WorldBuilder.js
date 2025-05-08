import Vector from './Vector.js';
import { getRand } from './utils.js';

//////////////////////////////////////////////////BUILD FUNCTIONS

export default class WorldBuilder {
    constructor(world, colMap, WORLDMAPSIZE) {
        this.world = world;
        this.colMap = colMap;
        this.WORLDMAPSIZE = WORLDMAPSIZE;
    }
    // build one block with collision
    bd(xOrVec, y) {
        const key = this.getKey(xOrVec, y);
        this.world.set(key, '\u2588\u2588');
        this.colMap.set(key, true);
    }
    // clears one block and collision
    bdClr(xOrVec, y) {
        const key = this.getKey(xOrVec, y);
        this.world.delete(key);
        this.colMap.delete(key);
    }
    // build THE WHOLE THING BRO
    bld(vec1, vec2) {
      const smallVec = vec1.clone();
      const bigVec = vec2.clone();
      smallVec.minMax(bigVec);
      console.log(smallVec.toString(), bigVec.toString());
      
      for ( let y = smallVec.y; y <= bigVec.y; y++) {
        for (let x = smallVec.x; x <= bigVec.x; x++) {
          this.bd(x, y);
        }
      }
    }
    populate() {
        // this randomly populates periods sparsely
        for (let i = -this.WORLDMAPSIZE; i < this.WORLDMAPSIZE; i++) {
            for (let o = -this.WORLDMAPSIZE; o < this.WORLDMAPSIZE; o++) {
                let char = getRand(1,40);
                if (char === 1) {
                    char = '. ';
                } else if (char === 2) {
                    char = ' .'
                } else {
                    char = '  ';
                }
                
                
                this.world.set(`${i},${o}`, char);
            }
        }
    }
    // gets a map key from either a vector or an x y coord
    getKey(xOrVec, y) {
        if (xOrVec instanceof Vector) {
            y = xOrVec.y;
            xOrVec = xOrVec.x;
        }
        return `${xOrVec},${y}`;
    }
}

