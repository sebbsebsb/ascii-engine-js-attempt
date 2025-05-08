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
    player,
    effects,
    combatVisuals
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
    this.effects = effects;
    this.combatVisuals = combatVisuals;
  }
  
  
  // i want to combine all the menus together
  
  handleKey(key) {
    // this is the only place where tick is updated
    this.toggle.update();
    
    
    const gameState = this.toggle.gameState;
    if (gameState === 'game') {
      // this.toggle.pause = false;
      
      if (this.toggle.freeCam) {
        this.handleFreeCamInput(key)
      } else {
        this.handleGameInput(key);
      }
      
    } else if (gameState === 'mainMenu') {
      this.toggle.pause = true;
      
      this.handleMenuInput(key);
    } else if (gameState === 'inventory') {
      this.toggle.pause = false;
      
      this.handleMenuInput(key);
    } else if (gameState === 'inventory sub-menu') {
      this.handleMenuInput(key);
    }
    
    // im sending it because it doesnt need to be changed in renderer
    const coords = new Vector();
    // use freecam coords or use global coords depending on if freecam is on
    this.toggle.freeCam ? coords.update(this.FCglob) : coords.update(this.glob);
    
    // update entities
    this.entityHandler.update();
    // next frame
    this.renderer.draw(this.toggle.gameState, coords);
  }
  handleFreeCamInput(key) {
    this.handleBasics(key, this.FCglob);
    switch (key) {
          
      case 'v':
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
    if (this.player.objectEquipped) {
      this.handleGun(key);
    }
    switch (key) {
      
        
      ////// ESCAPE
      case 'Escape':
        this.toggle.gameState = 'mainMenu';
        break;
        
      case 'e':
        this.toggle.gameState = 'inventory';
        break;
          
      ////// FREECAM
      case 'v':
        this.toggle.freeCam = true;
        this.FCglob.update(this.glob);
        break;
          
          
      // UNREGISTERED KEYPRESS
      default:
        // console.log('error in keydown 'game' event listener');
        break;    
    }
  }
  handleGun(key) {
    switch(key) {
      case 'F':
        if (this.player.objectEquipped.fire()) {
          if (this.entityHandler.shootNearestEntity(this.glob, this.player.objectEquipped)) {
            for (let i = 0; i < 1000; i++) {
              this.toggle.flash = true;
            }
          } 
        } else {
          this.combatVisuals.click();
        }
        break;
        
      case 'E':
        if (this.player.objectEquipped.eject()) {
          this.combatVisuals.eject();
        }
        break;
        
      case 'R':
        if (this.player.objectEquipped.reload()) {
          this.combatVisuals.reload();
        }
        break;
    }
  }
  handleMenuInput(key) {
    ////// IN MENU
    switch(key) {
      // MOVE UP IN MENU
      case 'w':
      case 'ArrowUp':
        this.toggle.currentMenu.navigate(-1);
        break;
              
      // MOVE DOWN IN MENU
      case 's':
      case 'ArrowDown':
        this.toggle.currentMenu.navigate(1);
        break;
              
      // SELECT
      case 'Enter':
      case ' ':
        this.toggle.currentMenu.select();
        break;
          
      // ESCAPE
      case 'Escape':
      case 'e':
        if (this.toggle.gameState === 'inventory sub-menu') {
          this.toggle.gameState = 'inventory';
        } else {
          this.toggle.gameState = 'game';
        }
        this.toggle.pause = false;
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