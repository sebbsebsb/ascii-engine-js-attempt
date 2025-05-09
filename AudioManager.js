import { getRand } from './utils.js';

export default class AudioManager {
  constructor() {
    this.footstepSounds = [
      new Audio('./Sounds/footstepSound1.mp3'),
      new Audio('./Sounds/footstepSound2.mp3'),
      new Audio('./Sounds/footstepSound3.mp3'),
      new Audio('./Sounds/footstepSound4.mp3'),
      new Audio('./Sounds/footstepSound5.mp3')
    ];
    this.footstepSounds.forEach(sound => sound.volume = 0.3);
    
    this.gunshotSounds9mm = [
      new Audio('./Sounds/gunshotSound9mm1.mp3'),
      new Audio('./Sounds/gunshotSound9mm2.mp3'),
      new Audio('./Sounds/gunshotSound9mm3.mp3'),
      new Audio('./Sounds/gunshotSound9mm4.mp3'),
    ];
    this.gunshotSounds9mm.forEach(sound => sound.volume = 0.5);
    
    this.reloadSounds9mm = [
      new Audio('./Sounds/ejectSound9mm1.mp3'),
      new Audio('./Sounds/ejectSound9mm2.mp3')
    ];
    this.reloadSounds9mm.forEach(sound => sound.volume = 0.5);
    
    this.ejectSounds9mm = [
      new Audio('./Sounds/ejectSound9mm3.mp3'),
      new Audio('./Sounds/ejectSound9mm4.mp3'),
    ];
    this.ejectSounds9mm.forEach(sound => sound.volume = 0.5);
    
    this.clickSound9mm = new Audio('./Sounds/click9mm1.mp3');
    this.clickSound9mm.volume = 0.3;
    
    this.menuSelect = new Audio('./Sounds/click4.mp3');
    this.menuSelect.volume = 1;
    
    this.menuMove = new Audio('./Sounds/click5.mp3');
    this.menuMove.volume = 0.4;
    
  }
  
  play(soundName) {
    switch (soundName) {
      case 'footstep':
        this.playFootstep();
        break;
        
      case 'menuSelect':
        this.menuSelect.currentTime = 0;
        this.menuSelect.play();
        break;
      
      case 'menuMove':
        this.menuMove.currentTime = 0;
        this.menuMove.play();
        break;
        
      default:
        console.warn(`unknown sound: ${soundName}`);
        break;
    }
  }
  playFootstep() {
    const index = getRand(0, this.footstepSounds.length - 1);
    const sound = this.footstepSounds[index];
    sound.currentTime = 0;
    sound.play();
  }
  playGunshot(gunType) {
    switch (gunType) {
      case '9mm':
        this.play9mmGunshot();
        break;
      
      default:
        console.warn('unknown gun type');
        break;
    }
  }
  playEject(gunType) {
    switch (gunType) {
      case '9mm':
        this.play9mmEject();
        break;
      
      default:
        console.warn('unknown gun type');
        break;
    }
  }
  playClick(gunType) {
    switch (gunType) {
      case '9mm':
        this.play9mmClick();
        break;
      
      default:
        console.warn('unknown gun type');
        break;
    }
  }
  playReload(gunType) {
    switch (gunType) {
      case '9mm':
        this.play9mmReload();
        break;
        
      default:
        console.warn('unknown gun type');
        break;
    }
  }
  play9mmGunshot() {
    const index = getRand(0, this.gunshotSounds9mm.length - 1);
    const sound = this.gunshotSounds9mm[index];
    sound.currentTime = 0;
    sound.play();
  }
  play9mmEject() {
    this.ejectSounds9mm.forEach(sound => sound.currentTime = 0);
    
    this.ejectSounds9mm[0].play();
    setTimeout(() => {
      this.ejectSounds9mm[1].play();
    }, 200); // 100ms flash
  }
  play9mmClick() {
    this.clickSound9mm.currentTime = 0;
    this.clickSound9mm.play();
  }
  play9mmReload() {
    const index = getRand(0, this.reloadSounds9mm.length - 1);
    const sound = this.reloadSounds9mm[index];
    sound.currentTime = 0;
    sound.play();
  }
}