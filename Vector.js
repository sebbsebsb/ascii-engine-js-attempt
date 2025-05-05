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
  static tryMove(current, dx, dy, colMap) {
    const v = new Vector().update(current).add(dx, dy);
    if (!colMap.has(v.toString())) {
        current.update(v);
    }
  }
}
  