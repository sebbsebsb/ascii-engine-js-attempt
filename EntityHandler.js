export default class EntityHandler{
  constructor(entitiesArray, items, glob, player, combatVisuals) {
    this.entitiesArray = entitiesArray || [];
    this.items = items;
    this.glob = glob;
    this.player = player;
    this.combatVisuals = combatVisuals;
  }
  // updates all entities
  update() {
    for (let i = this.entitiesArray.length - 1; i >= 0; i--) {
      const entity = this.entitiesArray[i];
      if (entity.health <= 0) {
        // dead entity, remove from the array
        this.items.set(entity.loc.toString(), 'XX');
        this.entitiesArray.splice(i, 1);
      } else {
        this.entitiesArray[i].decideMove();
        if(this.glob.equals(entity.loc)) {
          this.player.hurt(entity.damage);
        }
      }
    }
  }
  // gets nearest entity to target
  getNearestEntity(target) {
    let nearest = null;
    let minDist = Infinity;
    for (const entity of this.entitiesArray) {
      const dist = target.loc.distAvg(entity.loc);
      if (dist < minDist) {
        minDist = dist;
        nearest = entity;
      }
    }
    return nearest;
  }
  // uses passed gun to shoot nearest entity, takes location
  shootNearestEntity(glob, gun) {
    let nearest = null;
    let minDist = Infinity;
    for (const entity of this.entitiesArray) {
      const dist = glob.distAvg(entity.loc);
      if (dist < minDist) {
        minDist = dist;
        nearest = entity;
      }
    }
    if (minDist <= gun.range) {
      nearest.health -= gun.damage;
      this.combatVisuals.shootEntityVisuals(nearest);
      console.log(nearest.health);
      return nearest;
    } else {
      this.combatVisuals.shootEntityVisuals();
      return null;
    }
  }
}