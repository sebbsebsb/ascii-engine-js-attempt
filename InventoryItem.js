export default class InventoryItem{
  constructor(invArr, player) {
    this.invArr = invArr;
    this.invArr.push(this);
    this.player = player;
  }
  toString() {
    return this.name + ' InventoryItem';
  }
  select() {
    console.log(this);
  }
}