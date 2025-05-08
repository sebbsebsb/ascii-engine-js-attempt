import InventoryItem from './InventoryItem.js';
import { txt } from './utils.js';

export default class Menu {
  constructor(titleOrFn, optionsOrFn, onSelect, audio) {
      this.titleFn = typeof titleOrFn === 'function' ? titleOrFn : () => titleOrFn; // this allows it to call a function instead
      this.optionsFn = typeof optionsOrFn === 'function' ? optionsOrFn : () => optionsOrFn; // this allows it to call a function instead
      this.selected = 0;
      this.onSelect = onSelect; // callback or action handler
      this.audio = audio;
  }
  
  get options() {
    return this.optionsFn();
  }
  get title() {
    return this.titleFn();
  }

  navigate(dir) {
    this.audio.play('menuMove');
    this.selected += dir;
    if (this.selected < 0) this.selected = this.options.length - 1;
    if (this.selected >= this.options.length) this.selected = 0;
  }

  render(SIZE) {
    let output = '';
    output += txt(this.title, '\u2550', SIZE);
    
    for (let i = 0; i < this.options.length; i++) {
      const char = (i === this.selected) ? '\u2550' : ' '; // if it's selected put thingies around it
      const opt = this.options[i];
      
      output += txt(opt instanceof InventoryItem ? opt.toString() : opt, char, SIZE);
    }
    return output;
  }

  select() {
    this.audio.play('menuSelect');
    const action = this.options[this.selected];
    if (this.onSelect) this.onSelect(action);
  }
}