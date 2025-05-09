import InventoryItem from "./InventoryItem.js";
import Mag from "./Mag.js";
import Menu from "./Menu.js";


export default class Gun extends InventoryItem{
  constructor(invArr, {player, audio, toggle}, damage, range, magType, reloadTime, mag = null, bulletInChamber = false, equipped = false) {
    super(invArr, player);
    this.audio = audio;
    this.toggle = toggle;
    this.damage = damage;
    this.range = range;
    this.magType = magType;
    this.mag = mag;
    this.bulletInChamber = bulletInChamber;
    this.equipped = equipped;
    this.player = player;
    this.reloadTime = reloadTime;
    
    if (this.equipped) this.player.equip(this);
    
    this.menu = new Menu(
      () => this.toString(), 
      () => [
        this.equipped ? 'UNEQUIP' : 'EQUIP', 
        'INSTALL MAG', 
        'EJECT MAG', 
        'EJECT BULLET'
      ], 
      this.handleOptionSelect.bind(this), 
      this.audio
    );
  }
  
  toString() {
    let output = '';
    output += `GUN ${this.magType} DAM:${this.damage} RAN:${this.range} MAG:${
      this.mag ? 'YES' : 'NO'
    } CHAMBERED:${
      this.bulletInChamber ? 'YES' : 'NO'
    }`;
    return output;
  }
  
  fire() {
    let output = false;
    if (this.mag && this.bulletInChamber) {
      this.bulletInChamber = false;
      this.audio.playGunshot(this.magType);
      output = true; // gun fired a shot
      
      if (this.mag.loadBullet()) {
        this.bulletInChamber = true; // gun has another bullet in the chamber
      }
    } else {
      this.audio.playClick(this.magType);
    }
    return output;
  }
  // returns true if it got a bullet in the chamber
  eject() {
    this.bulletInChamber = false;
    if (this.mag){
      if (this.mag.loadBullet()) {
        this.bulletInChamber = true;
        this.audio.playEject(this.magType);
        return true;
      }
    }
    return false;
  }
  select() {
    this.toggle.currentMenu = this.menu;
    this.toggle.gameState = 'inventory sub-menu';
  }
  handleOptionSelect(option) {
    if (option === (this.equipped ? 'UNEQUIP' : 'EQUIP')) {
      this.equipUnequip();
    } else if (option === 'INSTALL MAG') {
      this.installMag();
    } else if (option === 'EJECT MAG') {
      this.mag = null;
    } else if (option === 'EJECT BULLET') {
      this.eject();
    }
  }
  equipUnequip() {
    this.equipped = !this.equipped;
    if (this.equipped) {
      this.player.equip(this);
    } else {
      this.player.unequip();
    }
    console.log(this.equipped);
  }
  installMag() {
    const validMags = this.getValidMags();
    
    if (validMags.length === 0) {
      console.log('no valid mags');
      return;
    }
    
    const magMenu = new Menu(
      'SELECT MAG',
      validMags,
      (selectedMag) => {
        this.reload(selectedMag);
        // this.audio.play('reload');
        this.toggle.currentMenu = this.menu;
      },
      this.audio
    );
    
    this.toggle.currentMenu = magMenu;
  }
  getValidMags() {
    return this.invArr.filter(item => item instanceof Mag && item.type === this.magType && this.mag !== item && item.bulletsLeft);
  }
  reload(mag = null) {
    if (mag) {
      this.mag = mag;
      this.toggle.startReload(this.reloadTime, this.magType);
      return true;
    } else {
      if (!this.mag.bulletsLeft) {
          const validMags = this.getValidMags();
        if (validMags.length) {
          this.mag = validMags[0];
          this.toggle.startReload(this.reloadTime, this.magType);
          return true;
        }
      }
    }
    return false;
  }
  
}