import { txt } from './utils.js';

export default class Menu {
  constructor(title, options, onSelect) {
      this.title = title;
      this.options = options;
      this.selected = 0;
      this.onSelect = onSelect; // callback or action handler
  }

  navigate(dir) {
      this.selected += dir;
      if (this.selected < 0) this.selected = this.options.length - 1;
      if (this.selected >= this.options.length) this.selected = 0;
  }

  render(SIZE) {
      let output = '';
      output += txt(this.title, '\u2551', SIZE);
      for (let i = 0; i < this.options.length; i++) {
          const char = (i === this.selected) ? '\u2550' : ' '; // if it's selected put thingies around it
          output += txt(this.options[i], char, SIZE);
      }
      return output;
  }

  select() {
    const action = this.options[this.selected];
    if (this.onSelect) this.onSelect(action);
  }
}