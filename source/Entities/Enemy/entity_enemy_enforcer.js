class EntityEnemyEnforcer extends EntityEnemy {
  _init(patrol_dir) {
    super._init(patrol_dir);
    this._model = model_enforcer;
    this._texture = 19;
    this._health = 80;
    this.s = vec3(14, 44, 14);
  }

  _attack() {
    this._play_sound(sfx_plasma_shoot);
    this._spawn_projectile(EntityProjectilePlasma, 800, 0, 0);
  }
}
