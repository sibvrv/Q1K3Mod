let game_tick = 0;
let game_time = 0.016;
let game_real_time_last;
let game_message_timeout = 0;
let game_entities;
let game_entities_enemies;
let game_entities_friendly;
let game_entity_player;
let game_map_index;
let game_jump_to_next_level;
let game_stats_time = 0;

let game_init = (map_index) => {
  ts.className = 'le';
  ts.style.display = 'none';

  game_entities = [];
  game_entities_enemies = [];
  game_entities_friendly = [];

  game_map_index = map_index;
  map_init(map_data[game_map_index]);
};

let game_next_level = (total_time) => {
  game_stats_time = ~~total_time;
  game_jump_to_next_level = 1;
};

let game_spawn = (type, pos, p1, p2) => {
  let entity = new type(pos, p1, p2);
  game_entities.push(entity);
  return entity;
};

let game_show_message = (text) => {
  msg.textContent = text;
  msg.style.display = 'block';
  clearTimeout(game_message_timeout);
  game_message_timeout = setTimeout(() => (msg.style.display = 'none'), 2000);
};

let title_show_message = (msg, sub = '') => {
  ts.innerHTML = '<h1>' + msg + '</h1>' + sub;
  ts.style.display = 'block';
};

let game_run = (time_now) => {
  requestAnimationFrame(game_run);

  time_now *= 0.001;
  game_tick = Math.min(time_now - (game_real_time_last || time_now), 0.05);
  game_real_time_last = time_now;
  game_time += game_tick;

  r_prepare_frame(0.1, 0.2, 0.5);

  // Update and render entities
  let alive_entities = [];
  for (let entity of game_entities) {
    if (!entity._dead) {
      entity._update();
      alive_entities.push(entity);
    }
  }
  game_entities = alive_entities;

  map_draw();
  r_end_frame();

  // Reset mouse movement and buttons that should be pressed, not held.
  mouse_x = mouse_y = 0;
  keys[key_next] = keys[key_prev] = 0;

  if (game_jump_to_next_level) {
    game_jump_to_next_level = 0;
    game_map_index++;

    game_entity_player._dead = 1;

    title_show_message('COMPLETED', 'Time: ' + ~~(game_stats_time / 60) + ':' + ('0' + game_stats_time % 60).slice(-2));

    // Set camera position for end screen
    if (game_map_index == 1) {
      r_camera = vec3(1944, 352, 1539);
      r_camera_yaw = -3.14;
      r_camera_pitch = -0.1;
    } else if (game_map_index == 2) {
      r_camera = vec3(1856, 784, 2272);
      r_camera_yaw = 0;
      r_camera_pitch = 0.5;
    }

    setTimeout(() => {
      if (game_map_index == 2) {
        ts.className = 'lc';
        title_show_message('THE END', 'THANKS FOR PLAYING ❤');
        h.textContent = a.textContent = '';
      } else {
        game_init(game_map_index);
      }
    }, 3000);
  }
};
