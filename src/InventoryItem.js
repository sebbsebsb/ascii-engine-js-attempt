export default class InventoryItem{
  constructor(name, invArr, player) {
    this.name = name;
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