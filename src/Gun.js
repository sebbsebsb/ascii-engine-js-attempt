import InventoryItem from "./InventoryItem.js";

export default class Gun extends InventoryItem{
  constructor(name, invArr, player, audio, damage, range, clipType, clip = null, bulletInChamber = false, equipped = false) {
    super(name, invArr, player);
    this.audio = audio;
    this.damage = damage;
    this.range = range;
    this.clipType = clipType;
    this.clip = clip;
    this.bulletInChamber = bulletInChamber;
    this.equipped = equipped;
    if (this.equipped) this.player.equip(this);
  }
  
  toString() {
    let output = '';
    output += this.name + ' Gun class\n';
    output += `damage:${this.damage} range:${this.range} clipType:${this.clipType} clip:${this.clip} bulletInChamber:${this.bulletInChamber}`;
    return output;
  }
  
  fire() {
    let output = false;
    if (this.clip && this.bulletInChamber) {
      this.bulletInChamber = false;
      this.audio.playGunshot(this.clipType);
      output = true;
      if (this.clip.loadBullet()) {
        this.bulletInChamber = true;
      }
    }
    return output;
  }
  // returns true if it got a bullet in the chamber
  eject() {
    this.bulletInChamber = false;
    if (this.clip){
      if (this.clip.loadBullet()) {
        this.bulletInChamber = true;
        return true;
      }
    }
    return false;
  }
}