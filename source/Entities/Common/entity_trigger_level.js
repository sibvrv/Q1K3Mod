class EntityTriggerLevel extends Entity {
  _init() {
    this._start_at = game_time;
  }

  _update() {
    if (!this._dead && vec3_dist(this.p, game_entity_player.p) < 64) {
      game_next_level(game_time - this._start_at);
      this._dead = 1;
    }
  }
}
