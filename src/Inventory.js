import Menu from "./Menu.js";

export default class Inventory{
  constructor(invArr, audio) {
    this.invArr = invArr;
    this.audio = audio;
    this.menu = new Menu('INVENTORY', () => this.getAvailableItems(), this.handleOptionSelect.bind(this), this.audio);
  }
  handleOptionSelect(option) {
    if (option) option.select();
  }
  getAvailableItems() {
    return this.invArr.filter(item => {
      // Check if the item is not used in any gun's mag
      return !this.invArr.some(gun => gun.mag === item);
    });
  }
}