import InventoryMenu from "./InventoryMenu.js";

export default class Inventory{
  constructor(invArr, audio) {
    this.invArr = invArr;
    this.audio = audio;
    this.menu = new InventoryMenu('INVENTORY', this.invArr, this.handleOptionSelect.bind(this), this.audio);
  }
  handleOptionSelect(option) {
    option.select();
  }
}