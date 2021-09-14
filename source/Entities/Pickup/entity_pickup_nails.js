class EntityPickupNails extends EntityPickup {
  _init() {
    super._init();
    this._texture = 24;
  }

  _pickup() {
    for (let w of game_entity_player._weapons) {
      if (w instanceof WeaponNailgun) {
        w._ammo += 50;
        audio_play(sfx_pickup);
        this._kill();
      }
    }
  }
}
