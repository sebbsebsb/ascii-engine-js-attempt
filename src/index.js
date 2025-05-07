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
import InventoryItem from "./InventoryItem.js";
import Clip from "./Clip.js";
import Gun from "./Gun.js";
import Player from "./Player.js";




//////////////////////////////////////////////////GLOBAL VARS ETC

const SIZE = 19; // has to be odd
const WORLDMAPSIZE = 500; // this is only used for the populate() function


const toggle = new Toggles();
const glob = new Vector(); // global coords and where the player is
const FCglob = new Vector(); //freecam coords
const world = new Map(); // world mapppp
const colMap = new Map(); // collision mapppppppppppppppppp
const audio =  new AudioManager(); // audio

const storage = new Storage(glob);
// main menu class construct
const mainMenu = new Menu('MAIN MENU', ['SAVE', 'LOAD'], (action) => { 
  if (action === 'SAVE') storage.save();
  if (action === 'LOAD') storage.load();
});
const invArr = []; // inv array
const inventory = new Inventory(invArr); // inv object

const builder = new WorldBuilder(world, colMap, WORLDMAPSIZE);
const loader = new MapLoader(builder);

///////////////////////////////ENTITIES
const player = new Player(100);
const testEntity = new Entity(100, new Vector(3, 3), colMap);
const testZombie = new Zombie(100, new Vector(-10,-10), colMap, glob);


// entity array used for locations and rendering
const entityHandler = new EntityHandler([testEntity, testZombie]);




const renderer = new Renderer({
  SIZE, 
  world, 
  colMap, 
  mainMenu, 
  toggle, 
  glob, 
  entityHandler, 
  inventory
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
  player
}); // key hander

// //////////////////////////////////////////////////////KEY HANDLER
document.addEventListener('keydown', e => keyHandler.handleKey(e.key));

///////////////////////////////////////////////////WORLD CREATION
initWorld(builder);

///////////////////////////////////////////////////////TESTING

// const vec1 = new Vector(-8, 3);
// const vec2 = new Vector(1, -2);
// console.log(vec1.distance(vec2).toString());
// console.log(vec1.distAvg(vec2));

const testClip = new Clip('Test Clip', invArr, player, '9mm', 12);
console.log(testClip);

const testGun = new Gun('Test Gun', invArr, player, audio, 10, 15, '9mm', testClip, false, true);
console.log(testGun);

console.log(invArr);

////////////////////////////////////////////////////FUNCTIONS

async function initWorld(builder) {
  builder.populate();
  
  await loader.loadFromCSV('./MapStuff/coords.csv', WORLDMAPSIZE);

  // draws first frame
  renderer.draw(toggle.gameState, glob);
}