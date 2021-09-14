class EntityPickupNailgun extends EntityPickup {
  _init() {
    super._init();
    this._texture = 12;
    this._model = model_pickup_nailgun;
  }

  _update() {
    this._yaw += 0.02;
    super._update();
  }

  _pickup() {
    audio_play(sfx_pickup);
    game_entity_player._weapon_index = game_entity_player._weapons.push(new WeaponNailgun()) - 1;
    this._kill();
  }
}
