class EntityParticle extends Entity {
  _init() {
    this._bounciness = 0.5;
    this.f = 0.1;
  }

  _update() {
    this._yaw += this.v.y * 0.001;
    this._pitch += this.v.x * 0.001;
    this._update_physics();
    this._draw_model();
  }
}
