import { sym, txt } from './utils.js';





export default class Renderer {
  constructor({
    SIZE, 
    world, 
    colMap, 
    mainMenu, 
    toggle, 
    glob, 
    entityHandler, 
    inventory,
    effects,
    items,
    player
  }) {
    this.SIZE = SIZE;
    this.world = world;
    this.colMap = colMap;
    this.mainMenu = mainMenu;
    this.toggle = toggle;
    this.glob = glob;
    this.entityHandler = entityHandler;
    this.inventory = inventory;
    this.effects = effects;
    this.items = items;
    this.player = player;
  }
  
  draw(gameState = this.toggle.gameState, coords = this.glob) {
    if(this.toggle.flash) {
      this.flash();
    } else if(this.player.health < 1) {
      this.deathScreen();
    } else {
      if (gameState === 'game') {
        this.drawGame(coords);
      } else if (gameState === 'mainMenu') {
        this.toggle.currentMenu = this.mainMenu;
        
        this.drawMenu(coords);
      } else if (gameState === 'inventory sub-menu') {
        this.drawMenu(coords);
        // in this case the current menu is set in the inventory object
      } else if (gameState === 'inventory') {
        this.toggle.currentMenu = this.inventory.menu;
        
        this.drawMenu(coords);
      }
    }
  }
  // flash screen then update
  flash() {
    let output = '';
    output += this.topHUD();
    let n = Math.floor(this.SIZE / 2); // formula to help determine the center of the grid
    for (let j = this.glob.y + n; j >= -1 * (n - this.glob.y); j--) { // y rows
      
      // put stuff here to display on the left side
      output += this.leftHUD();
      
      for (let i = this.glob.x - n; i <= n + this.glob.x; i++) { // x columns
        const b = Math.ceil(Math.random() * 6);
        switch (b) {
          case 1:
            output += '\u2588\u2588';
            break;
          case 2:
            output += '\u2591\u2591';
            break;
          case 3:
            output += '\u2592\u2592';
            break;
          case 4:
            output += '\u2593\u2593';
            break;
          case 5:
            output += '  ';
            break;
          case 6:
            output += '  ';
            break;
          default:
            console.log('default in flash()');
            break;
        }
      }
      
      // put stuff here to display on the right side
      output += this.rightHUD();
      
      output += '\n';
    }
    output += this.bottomHUD(this.glob);
    document.getElementById('grid').textContent = output;
    setTimeout(() => {
      this.toggle.flash = false;
      this.draw(this.toggle.gameState, this.glob);
    }, 20); // flash for 150ms
  }
  deathScreen() {
    let output = '';
    output += this.topHUD();
    let n = Math.floor(this.SIZE / 2);
    
    for (let j = 0; j < n; j++) { // y rows
      
      output += txt('YOU DIED RIP', ' ', this.SIZE);
      
    }
    
    
    
    output += this.bottomHUD(0);
    document.getElementById('grid').textContent = output;
  }
  drawGame(coords) {
    let output = '';
    output += this.topHUD();
    let n = Math.floor(this.SIZE / 2); // formula to help determine the center of the grid
    for (let j = coords.y + n; j >= -1 * (n - coords.y); j--) { // y rows
      
      // put stuff here to display on the left side
      output += this.leftHUD();
      
      for (let i = coords.x - n; i <= n + coords.x; i++) { // x columns
        output += this.chooseChar(i,j, coords);
      }
      
      // put stuff here to display on the right side
      output += this.rightHUD();
      
      output += '\n';
    }
    output += this.bottomHUD(coords);
    document.getElementById('grid').textContent = output;
  }
  topHUD() { // add stuff here to display above viewport
    let output = '';
    if (this.toggle.gameState !== 'game') return output;
    
    output += txt('HEALTH', '\u2550', this.SIZE);
    
    let input = ''
    for (let i = 0; i < (this.player.health / this.player.maxHealth) * this.SIZE * 2; i++) {
      input += '\u2593';
    }
    
    output += txt(input, '\u2591', this.SIZE);
    
    
    
    return output;
  }
  bottomHUD(coords) { // add stuff here to display below viewport
    let output = ' ' + sym('\u2550', this.SIZE * 2) + ' \n'; // bottom bar
    if (this.toggle.debug) {
      output += 'Coords:' + coords.toString(); // global coords
      output += ' tick:' + this.toggle.tick + '\n';
      
      // toggles
      output += this.toggle.toString();
      
        
      output += '\n';
    }
    return output;
  }
  leftHUD() {
    return ' ';
  }
  rightHUD() {
    return ' ';
  }
  
  // passing coords here for debug mode
  drawMenu(coords) {
    let output = '';
    output += this.topHUD();
    
    output += this.toggle.currentMenu.render(this.SIZE, coords);
    
    output += this.bottomHUD(coords);
    
    document.getElementById('grid').textContent = output;
  }
  
  
  chooseChar(x, y, coords) {
    const key = `${x},${y}`;
    
    // render visuals
    if (this.effects.has(key)) {
      return this.effects.get(key).text;
    }
    
    // render player
    if (this.glob.x === x && this.glob.y === y) {
      return 'ii';
    }else if (coords.x === x && coords.y === y) {
      return '++';
    } 
    
    
    
    // add 'BANG' when a shot is fired
    // then add exposion noise around the player
    
    
    // Check if there is an entity at this location
    const entityAtCoords = this.entityHandler.entitiesArray.find(entity => entity.loc.x === x && entity.loc.y === y);
    if (entityAtCoords) {
      return entityAtCoords.render(); // Render entity
    }
    
    // render items
    if (this.items.has(key)) {
      return this.items.get(key);
    }
    
    
    // render map
    if (this.world.has(key)) {
        return this.world.get(key);
    }
    
    
    
    return '  '; // default return
  }
  
}