import Vector from "./Vector.js";
import Menu from "./Menu.js";
import { getRand, txt, sym } from './utils.js';




//////////////////////////////////////////////////GLOBAL VARS ETC

const SIZE = 15; // has to be odd
const WORLDMAPSIZE = 500;



const glob = new Vector(); // global coords
const world = new Map(); // world mapppp
const colMap = new Map(); // collision mapppppppppppppppppp

let gameState = 'game'; // game state to decide what key presses do and what to draw etc

// main menu class construct
const mainMenu = new Menu('MAIN MENU', ['SAVE', 'LOAD'], (action) => { 
    if (action === 'SAVE') save();
    if (action === 'LOAD') load();
});







///////////////////////////////////////////////////WORLD CREATION

// puts down random periods on gridspace
populate();





world.set('-3,-7', '\u2588\u2588');
// \x15 is a cool box btw

bd(new Vector(3,7));
bd(3,4);
bld(new Vector(-20,-20), new Vector(-20,-10));





// draws first frame
draw();







////////////////////////////////////////////////////////FUNCTIONS





function save() {
    localStorage.setItem('glob', JSON.stringify(glob)); // save position
    console.log('game saved');
}
function load() {
    glob.update(JSON.parse(localStorage.getItem('glob'))); // update position
    console.log('game loaded');
}









///////////////////////////////////////////////////DRAW FUNCTIONS
function draw() {
    if (gameState === 'game') {
        drawGame();
    } else if (gameState === 'mainMenu') {
        drawMainMenu();
    }
}
// this function will display the screen when called
function drawGame(output = '') {
    if (output === '') {
        output += topHUD();
        let n = Math.floor(SIZE / 2); // formula to help determine the center of the grid
        for (let j = glob.y + n; j >= -1 * (n - glob.y); j--) { // y rows
            
            // put stuff here to display on the left side
            output += leftHUD();
            
            for (let i = glob.x - n; i <= n + glob.x; i++) { // x columns
                output += chooseChar(i,j);
            }
            
            // put stuff here to display on the right side
            output += rightHUD();
            
            output += '\n';
        }
        output += bottomHUD();
        output += glob.toString();
    }
    document.getElementById('grid').textContent = output;
}
function topHUD() { // add stuff here to display above viewport
    return ' ' + sym('\u2550', SIZE * 2) + ' \n';
}
function bottomHUD() { // add stuff here to display below viewport
    return ' ' + sym('\u2550', SIZE * 2) + ' \n';
}
function leftHUD() {
    return '\u2551';
}
function rightHUD() {
    return '\u2551';
}

function drawMainMenu() {
    let output = '';
    output += topHUD();
    
    output += mainMenu.render(SIZE);
    
    output += bottomHUD();
    
    document.getElementById('grid').textContent = output;
}


// chooses what char for draw() to print based on xy coords
function chooseChar(x, y) {
    // // for debugging show all the coords
    // let result = '';
    // if (x >= 0) result += ' ';
    // result += x;
    // if (y >= 0) result += ' ';
    // result += y;
    // return result;
    
    // render character
    if (glob.x === x && glob.y === y) return 'ii';
    
    const key = `${x},${y}`;
    if (world.has(key)) {
        return world.get(key);
    }
    
    
    return '  '; // default return
}


// this updates the display every time a key is pressed
// also moves the coords accordingly
document.addEventListener('keydown', e => {
    console.log(e.key); // to check what key's pressed
    
    // make new vector and set it to the same coords as glob
    const v = new Vector();
    v.update(glob);
    switch (gameState) {
        
        ////// IN GAME WORLD
        case 'game':
            switch (e.key) {
        
                //////// MOVEMENT
                
                // MOVE UP
                case 'w':
                case 'ArrowUp':
                    move(v.add(0,1));
                    break;
                    
                // MOVE LEFT
                case 'a':
                case 'ArrowLeft':
                    move(v.add(-1,0));
                    break;
                    
                // MOVE DOWN
                case 's':
                case 'ArrowDown':
                    move(v.add(0,-1));
                    break;
                    
                // MOVE RIGHT
                case 'd':
                case 'ArrowRight':
                    move(v.add(1,0));
                    break;
                    
                
                ////// ESCAPE
                case 'Escape':
                    gameState = 'mainMenu';
                    break;
                    
                    
                // UNREGISTERED KEYPRESS
                default:
                    // console.log('error in keydown 'game' event listener');
                    break;
            }
            break;
            
        ////// IN MENU
        case 'mainMenu':
            switch(e.key) {
                // MOVE UP IN MENU
                case 'w':
                case 'ArrowUp':
                    mainMenu.navigate(-1);
                    break;
                        
                // MOVE DOWN IN MENU
                case 's':
                case 'ArrowDown':
                    mainMenu.navigate(1);
                    break;
                        
                // SELECT
                case 'Enter':
                case ' ':
                    // FIXME select menu option
                    mainMenu.select();
                    break;
                    
                // ESCAPE
                case 'Escape':
                    gameState = 'game';
                    break;
                    
                    
                // UNREGISTERED KEYPRESS
                default:
                    // console.log('error in keydown 'menu' event listener');
                    break;
            }    
            break;
            
    }
    
    draw();
});

// takes a vector and checks collision on that vector
function move(v) {
    if (!colMap.has(v.toString())) glob.update(v);
}




//////////////////////////////////////////////////BUILD FUNCTIONS

// build one block with collision
function bd(xOrVec, y) {
    if (xOrVec instanceof Vector) {
        world.set(xOrVec.toString(), '\u2588\u2588');
        colMap.set(xOrVec.toString(), true);
    } else {
        world.set(`${xOrVec},${y}`, '\u2588\u2588');
        colMap.set(`${xOrVec},${y}`, true);
    }
    
}
// build THE WHOLE THING BRO
// must go from a lower vector to a higher vector
function bld(v1, v2) {
    for (let y = v1.y; y <= v2.y; y++) {
        for (let x = v1.x; x <= v2.x; x++) {
            bd(x,y);
        }
    }
}

function populate() {
    // this randomly populates periods sparsely
    for (let i = -WORLDMAPSIZE; i < WORLDMAPSIZE; i++) {
        for (let o = -WORLDMAPSIZE; o < WORLDMAPSIZE; o++) {
            let char = getRand(1,40);
            if (char === 1) {
                char = '. ';
            } else if (char === 2) {
                char = ' .'
            } else {
                char = '  ';
            }
            
            
            world.set(`${i},${o}`, char);
        }
    }
}