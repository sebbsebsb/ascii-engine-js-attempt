import Vector from "./Vector.js";
import Menu from "./Menu.js";
import WorldBuilder from "./WorldBuilder.js";
import Renderer from "./Renderer.js";
import KeyHandler from "./KeyHandler.js";
import Toggles from "./Toggles.js";
import Storage from "./Storage.js";
import MapLoader from "./MapLoader.js";
import AudioManager from "./AudioManager.js";
import Entity from "./Entity.js";
import EntityHandler from "./EntityHandler.js";
import Zombie from "./Zombie.js";
import Inventory from "./Inventory.js";
import Mag from "./Mag.js";
import Gun from "./Gun.js";
import Player from "./Player.js";
import CombatVisuals from "./CombatVisuals.js";




//////////////////////////////////////////////////GLOBAL VARS ETC

const SIZE = 25; // has to be odd
const WORLDMAPSIZE = 500; // this is only used for the populate() function

const {glob, FCglob, world, colMap, audio, storage, effects, toggle, items, player, combatVisuals} = initCore();

const entitiesArray = initEntities(); // array of entities

const {mainMenu, invArr, inventory, builder, loader} = initSecond();

const {renderer, keyHandler, entityHandler} = initThird();

const gunConfig = {player, audio, toggle};









// //////////////////////////////////////////////////////KEY HANDLER
document.addEventListener('keydown', e => keyHandler.handleKey(e.key));


///////////////////////////////////////////////////WORLD CREATION
initWorld(builder);

///////////////////////////////////////////////////////ITEMS INIT


// name, invArr, type, maxBullets, bulletsLeft
const testMag1 = new Mag(invArr, player, '9mm', 24);
const testMag2 = new Mag(invArr, player, '9mm', 12);

// name, invArr, {player, audio, toggle}, damage, range, magType, mag = null, bulletInChamber = false, equipped = false
const testGun = new Gun(invArr, gunConfig, 10, 5, '9mm', 5, testMag2, false, true);




////////////////////////////////////////////////////FUNCTIONS

async function initWorld(builder) {
  builder.populate();
  
  await loader.loadFromCSV('./MapStuff/coords.csv', WORLDMAPSIZE);

  // draws first frame
  renderer.draw(toggle.gameState, glob);
}

function initCore() {
  const glob = new Vector(); // global coords and where the player is
  const storage = new Storage(glob); // storage to save and load game
  const FCglob = new Vector(); //freecam coords
  const world = new Map(); // world mapppp
  const colMap = new Map(); // collision mapppppppppppppppppp
  const audio =  new AudioManager(); // audio
  const effects = new Map(); // effects map
  const combatVisuals = new CombatVisuals(glob, effects);
  const toggle = new Toggles(effects, combatVisuals, audio); // toggles like freecam and debug mode
  const items = new Map(); // items map
  
  // Character object
  const player = new Player(153, null, 140);
  
  return {glob, FCglob, world, colMap, audio, storage, effects, toggle, items, player, combatVisuals};
}

function initSecond() {
  
  // main menu class construct
  const mainMenu = new Menu('MAIN MENU', ['SAVE', 'LOAD'], (action) => { 
    if (action === 'SAVE') storage.save();
    else if (action === 'LOAD') storage.load();
  }, audio);
  
  const invArr = []; // inv array
  const inventory = new Inventory(invArr, audio); // inv object

  const builder = new WorldBuilder(world, colMap, WORLDMAPSIZE);
  const loader = new MapLoader(builder);


  
  
  
  
  
  return {mainMenu, invArr, inventory, builder, loader};
}

function initEntities() {
  ///////////////////////////////ENTITIES
  
  const entitiesArray = [];
  
  entitiesArray.push(new Entity(100, new Vector(3,3), colMap, 5));
  
  const zombiePositions = [
    [-10, -10], [10, 10], [-50, 50], [-50, -50], 
    [50, 50], [50, -50], [-50, 50], [50, 50], 
    [50, -50], [-50, -50]
  ]
  
  for (const [x, y] of zombiePositions) {
    entitiesArray.push(new Zombie(10, new Vector(x, y), colMap, glob, 10));
  }
  
  // const testEntity = new Entity(100, new Vector(3, 3), colMap, 5);
  
  // const testZombie1 = new Zombie(10, new Vector(-10,-10), colMap, glob, 10);
  // const testZombie2 = new Zombie(10, new Vector(10,10), colMap, glob, 10);
  // const testZombie3 = new Zombie(10, new Vector(-50,50), colMap, glob, 10);
  // const testZombie4 = new Zombie(10, new Vector(-50,-50), colMap, glob, 10);
  // const testZombie5 = new Zombie(10, new Vector(50,50), colMap, glob, 10);
  // const testZombie6 = new Zombie(10, new Vector(50,-50), colMap, glob, 10);
  // const testZombie7 = new Zombie(10, new Vector(-50,50), colMap, glob, 10);
  // const testZombie8 = new Zombie(10, new Vector(50,50), colMap, glob, 10);
  // const testZombie9 = new Zombie(10, new Vector(50,-50), colMap, glob, 10);
  // const testZombie10 = new Zombie(10, new Vector(-50,-50), colMap, glob, 10);
  
  

  

  return entitiesArray;
}

function initThird() {
  const entityHandler = new EntityHandler(entitiesArray, items, glob, player, combatVisuals);
  const renderer = new Renderer({
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
  }); // renderer
  const keyHandler = new KeyHandler({
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
  }); // key hander
  
  return {entityHandler, renderer, keyHandler}
}