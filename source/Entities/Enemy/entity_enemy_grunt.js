class EntityEnemyGrunt extends EntityEnemy {
  _init(patrol_dir) {
    super._init(patrol_dir);
    this._model = model_grunt;
    this._texture = 17;
    this._health = 40;
  }

  _attack() {
    this._play_sound(sfx_shotgun_shoot);
    game_spawn(EntityLight, vec3_add(this.p, vec3(0, 30, 0)), 10, 0xff)._die_at = game_time + 0.1;

    for (let i = 0; i < 3; i++) {
      this._spawn_projectile(EntityProjectileShell, 10000, Math.random() * 0.08 - 0.04, Math.random() * 0.08 - 0.04);
    }
  }
}
