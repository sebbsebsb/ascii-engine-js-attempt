export default class MapLoader {
  constructor(builder) {
    this.builder = builder;
  }
  
  async loadFromCSV(url, WORLDMAPSIZE) {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.trim().split('\n');
    
    for (let line of lines) {
      const [xStr, yStr] = line.split(',');
      
      const x = parseInt(xStr, 10) - WORLDMAPSIZE - 1;
      const y = -1 * parseInt(yStr, 10) + WORLDMAPSIZE + 1;
      
      if (!isNaN(x) && !isNaN(y)) {
        this.builder.bd(x, y);
      }
    }
    console.log('map loaded');
  }
}