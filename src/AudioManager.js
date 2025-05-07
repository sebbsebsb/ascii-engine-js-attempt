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
  }
  
  play(soundName) {
    switch (soundName) {
      case 'footstep':
        this.playFootstep();
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
  play9mmGunshot() {
    const index = getRand(0, this.gunshotSounds9mm.length - 1);
    const sound = this.gunshotSounds9mm[index];
    sound.currentTime = 0;
    sound.play();
  }
}