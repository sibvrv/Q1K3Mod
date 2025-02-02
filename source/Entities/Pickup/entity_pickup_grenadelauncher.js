class EntityPickupGrenadelauncher extends EntityPickup {
  _init() {
    super._init();
    this._texture = 21;
    this._model = model_pickup_grenadelauncher;
  }

  _update() {
    this._yaw += 0.02;
    super._update();
  }

  _pickup() {
    audio_play(sfx_pickup);
    game_entity_player._weapon_index = game_entity_player._weapons.push(new WeaponGrenadeLauncher()) - 1;
    this._kill();
  }
}
