import InventoryItem from "./InventoryItem.js";

export default class Clip extends InventoryItem{
  constructor(name, invArr, type, maxBullets, bulletsLeft) {
    super(name, invArr);
    this.type = type;
    this.maxBullets = maxBullets;
    this.bulletsLeft = bulletsLeft || maxBullets;
  }
  getBullletsLeft() {
    return this.bulletsLeft;
  }
  loadBullet() {
    if (this.getBullletsLeft()) {
      this.bulletsLeft--;
      return true;
    } else {
      return false;
    }
  }
  toString() {
    let output = '';
    output += this.name + ' Clip class\n';
    output += `type:${this.type} maxBullets:${this.maxBullets} bulletsLeft:${this.bulletsLeft}`;
    return output;
  }
}