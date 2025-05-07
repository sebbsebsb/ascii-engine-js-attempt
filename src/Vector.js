

export default class Vector {
  x;
  y;
  
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  // returns modified vector, either by x y coords or by another vector
  add(xOrVec, y) {
    if (xOrVec instanceof Vector) {
      this.x += xOrVec.x;
      this.y += xOrVec.y;
    } else {
        this.x += xOrVec;
        this.y += y;
    }
    return this;
  }
  
  update(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  
  toString() {
    return `${this.x},${this.y}`;
  }
  
  // checks collision and moves if possible
  tryMove(vec, colMap = new Map()) {
    // create new vector v which is this + dx dy coords
    const v = new Vector().update(this).add(vec);
    // check if there is no collision
    if (!colMap.has(v.toString())) {
      // copy v to this
      this.update(v);
      return true;
    }
    return false
  }
  
  equals(vector) {
    if (this.x === vector.x && this.y === vector.y) {
      return true;
    } else {
      return false;
    }
  }
  
  // gets the distance between this and v vectors, returns it as a vector
  distance(v) {
    const distance = new Vector();
    const smallVec = this.clone();
    const bigVec = v.clone();
    smallVec.minMax(bigVec);
    
    distance.x = bigVec.x - smallVec.x;
    distance.y = bigVec.y - smallVec.y;
    
    return distance;
  }
  // gives the average distance between x and y
  distAvg(v) {
    const distance = this.distance(v);
    let result = (distance.x + distance.y) / 2;
    return result;
  }
  // returns the direction of this -> v as a vector
  getDirection(v) {
    const direction = new Vector();
    
    // if this.x is bigger then point left etc
    if (this.x > v.x) {
      direction.x = -1;
    } else if (this.x < v.x){
      direction.x = 1;
    }
    
    // if this.y is bigger then point down etc
    if (this.y > v.y) {
      direction.y = -1;
    } else if (this.y < v.y) {
      direction.y = 1;
    }
    
    return direction;
  }
  
  // returns a clone of the vector
  clone() {
    const newVec = new Vector().update(this);
    return newVec;
  }
  
  // compares the vectors this and v, making this have the min x and y and v have the max x and y
  minMax(v) {
    const smallVec = new Vector();
    const bigVec = new Vector();
    
    // set x coords
    if (v.x < this.x) {
      smallVec.x = v.x;
      bigVec.x = this.x;
    } else {
      smallVec.x = this.x;
      bigVec.x = v.x;
    }
    
    // set y coords
    if (v.y < this.y) {
      smallVec.y = v.y;
      bigVec.y = this.y;
    } else {
      smallVec.y = this.y;
      bigVec.y = v.y;
    }
    this.update(smallVec);
    v.update(bigVec);
  }
  
  
  
  
  // returns a random vector one any direction or stay still to use with movement
  static getRand() {
    const directions = [
      { x: 1, y: 0 },  // Right
      { x: -1, y: 0 }, // Left
      { x: 0, y: 1 },  // Down
      { x: 0, y: -1 }, // Up
      { x: 0, y: 0 }   // Stay still
    ];
    const rand = directions[Math.floor(Math.random() * directions.length)];
    
    return new Vector(rand.x, rand.y);
  }
  
  // returns a ray between this and vector
  getLineVectors(vector) {
    const start = new Vector().update(this);
    const end = new Vector().update(vector);
    start.minMax(end);
    
    
    const points = [];
  
    let x0 = start.x;
    let y0 = start.y;
    const x1 = end.x;
    const y1 = end.y;
  
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
  
    while (true) {
      points.push(new Vector(x0, y0));
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  
    return points;
  }
  
}
  