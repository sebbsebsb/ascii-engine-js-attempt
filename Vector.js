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
  }
  
  toString() {
    return `${this.x},${this.y}`;
  }
}
  