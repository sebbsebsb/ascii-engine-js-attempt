import InventoryItem from "./InventoryItem.js";

export default class Mag extends InventoryItem{
  constructor(invArr, player, type, maxBullets, bulletsLeft) {
    super(invArr, player);
    this.invArr = invArr;
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
    output += `${this.type} MAG ${this.bulletsLeft}/${this.maxBullets}`;
    return output;
  }
}