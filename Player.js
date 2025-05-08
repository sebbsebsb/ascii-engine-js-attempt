export default class Player{
  constructor(maxHealth, objectEquipped = null, health = maxHealth) {
    this.maxHealth = maxHealth;
    this.objectEquipped = objectEquipped;
    this.health = health;
  }
  equip(object) {
    this.objectEquipped = object;
  }
  unequip() {
    this.objectEquipped = null;
  }
  hurt(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      // game over or something
    }
  }
}