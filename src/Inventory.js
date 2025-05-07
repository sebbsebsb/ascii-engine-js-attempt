import InventoryMenu from "./InventoryMenu.js";

export default class Inventory{
  constructor(invArr) {
    this.invArr = invArr;
    this.menu = new InventoryMenu('INVENTORY', this.invArr, this.handleOptionSelect.bind(this));
  }
  handleOptionSelect(option) {
    option.select();
  }
}