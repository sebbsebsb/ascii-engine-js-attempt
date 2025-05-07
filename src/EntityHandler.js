export default class EntityHandler{
  constructor(entities) {
    this.entities = entities || [];
  }
  // updates all entities
  update() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].decideMove();
    }
  }
}