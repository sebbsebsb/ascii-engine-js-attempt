export default class Storage {
  constructor(glob) {
    this.glob = glob;
  }
  
  
  save() {
    localStorage.setItem('glob', JSON.stringify(this.glob)); // save position
    console.log('game saved');
  }
  load() {
    this.glob.update(JSON.parse(localStorage.getItem('glob'))); // update position
    console.log('game loaded');
  }
}