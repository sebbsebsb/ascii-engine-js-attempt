import Vector from "./Vector.js";


export default class KeyHandler {
  //////////////////////////////////////////////////////KEY HANDLER
  
  constructor({
    glob, 
    FCglob, 
    colMap, 
    renderer, 
    toggle, 
    mainMenu, 
    audio, 
    entityHandler, 
    inventory, 
    player
  }) {
    this.glob = glob;
    this.FCglob = FCglob;
    this.colMap = colMap;
    this.renderer = renderer;
    this.toggle = toggle;
    this.mainMenu = mainMenu;
    this.audio = audio;
    this.entityHandler = entityHandler;
    this.inventory = inventory;
    this.player = player;
  }
  
  
  handleKey(key) {
    // this is the only place where tick is updated
    this.toggle.update();
    
    
    // console.log(key);
    
    if (this.toggle.gameState === 'game' && this.toggle.freeCam) this.handleFreeCamInput(key);
    else if (this.toggle.gameState === 'game') this.handleGameInput(key);
    else if (this.toggle.gameState === 'mainMenu') this.handleMainMenuInput(key);
    else if (this.toggle.gameState === 'inventory') this.handleInvInput(key);
    
    
    // im sending it because it doesnt need to be changed in renderer
    let coords = new Vector();
    // use freecam coords or use global coords depending on if freecam is on
    coords = this.toggle.freeCam ? coords.update(this.FCglob) : coords.update(this.glob);
    
    // update entities
    this.entityHandler.update();
    // next frame
    this.renderer.draw(this.toggle.gameState, coords);
  }
  handleFreeCamInput(key) {
    this.handleBasics(key, this.FCglob);
    switch (key) {
          
      case '2':
        this.toggle.freeCam = false;
        break;
          
      // UNREGISTERED KEYPRESS
      default:
        // console.log('error in keydown 'game' event listener');
        break;    
    }
  }
  handleGameInput(key) {
    this.handleBasics(key, this.glob, this.colMap);
    switch (key) {
      case 'F':
        console.log(this.player.objectEquipped.fire());
        break;
        
      case 'E':
        console.log(this.player.objectEquipped.eject());
        break;
      
      ////// ESCAPE
      case 'Escape':
        this.toggle.gameState = 'mainMenu';
        break;
        
      case 'e':
        this.toggle.gameState = 'inventory';
        break;
          
      ////// FREECAM
      case '2':
        this.toggle.freeCam = true;
        this.FCglob.update(this.glob);
        break;
          
          
      // UNREGISTERED KEYPRESS
      default:
        // console.log('error in keydown 'game' event listener');
        break;    
    }
  }
  handleMainMenuInput(key) {
    this.toggle.pause = true;
    ////// IN MENU
    switch(key) {
      // MOVE UP IN MENU
      case 'w':
      case 'ArrowUp':
        this.mainMenu.navigate(-1);
        break;
              
      // MOVE DOWN IN MENU
      case 's':
      case 'ArrowDown':
        this.mainMenu.navigate(1);
        break;
              
      // SELECT
      case 'Enter':
      case ' ':
        this.mainMenu.select();
        break;
          
      // ESCAPE
      case 'Escape':
        this.toggle.gameState = 'game';
        this.toggle.pause = false;
        break;
          
          
      // UNREGISTERED KEYPRESS
      default:
        // console.log('error in keydown 'menu' event listener');
        break;
    }    
  }
  handleInvInput(key) {
    ////// IN INVENTORY
    switch(key) {
      // MOVE UP IN MENU
      case 'w':
      case 'ArrowUp':
        this.inventory.menu.navigate(-1);
        break;
              
      // MOVE DOWN IN MENU
      case 's':
      case 'ArrowDown':
        this.inventory.menu.navigate(1);
        break;
              
      // SELECT
      case 'Enter':
      case ' ':
        this.inventory.menu.select();
        break;
          
      // ESCAPE
      case 'Escape':
      case 'e':
        this.toggle.gameState = 'game';
        break;
          
          
      // UNREGISTERED KEYPRESS
      default:
        // console.log('error in keydown 'menu' event listener');
        break;
    }
  }
  handleBasics(key, glob, colMap) {
    this.handleMovement(key, glob, colMap);
    switch (key) {
      // DEBUG MODE
      case '1':
        this.toggle.debug = !this.toggle.debug;
        break;
        
      // case: '2' freecam is handled in handleFreeCamInput() and handleGameInput()
        
      // PAUSE DA GAME
      case '3':
        this.toggle.pause = !this.toggle.pause;
        break;
        
      // 100 blocks each move
      case '4':
        this.toggle.superSpeed = !this.toggle.superSpeed;
        break;
      
      default:
        // go to original function, check for the non basic keypresses
        break;    
    }
  }
  handleMovement(key, glob, colMap) {
    const moveSpeed = this.toggle.superSpeed ? 100 : 1;
    let moved = false;
    switch (key) {
      //////// MOVEMENT
      
      // MOVE UP
      case 'w':
      case 'ArrowUp':
        moved = glob.tryMove(new Vector(0, moveSpeed), colMap); 
        break;
          
      // MOVE LEFT
      case 'a':
      case 'ArrowLeft':
        moved = glob.tryMove(new Vector(-moveSpeed, 0), colMap);
        break;
          
      // MOVE DOWN
      case 's':
      case 'ArrowDown':
        moved = glob.tryMove(new Vector(0, -moveSpeed), colMap);
        break;
          
      // MOVE RIGHT
      case 'd':
      case 'ArrowRight':
        moved = glob.tryMove(new Vector(moveSpeed, 0), colMap);
        break;
          
      default:
        // go back to handleBasics() check toggles etc
        break;
    }
    if (moved && !this.toggle.freeCam) this.audio.play('footstep');
  }
}