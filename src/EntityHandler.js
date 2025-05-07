export default class EntityHandler{
  constructor(entities, items, glob, player) {
    this.entities = entities || [];
    this.items = items;
    this.glob = glob;
    this.player = player;
  }
  // updates all entities
  update() {
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].health <= 0) {
        // dead entity, remove from the array
        this.items.set(this.entities[i].loc.toString(), 'XX');
        this.entities.splice(i, 1);
      } else {
        this.entities[i].decideMove();
        if(this.glob.equals(this.entities[i].loc)) {
          this.player.hurt(this.entities[i].damage);
          console.log('test');
        }
      }
    }
  }
  // gets nearest entity to target
  getNearestEntity(target) {
    let nearest = null;
    let minDist = Infinity;
    for (const entity of this.entities) {
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
    for (const entity of this.entities) {
      const dist = glob.distAvg(entity.loc);
      if (dist < minDist) {
        minDist = dist;
        nearest = entity;
      }
    }
    if (minDist <= gun.range) {
      nearest.health -= gun.damage;
      console.log(nearest.health);
    }
    return nearest;
  }
}