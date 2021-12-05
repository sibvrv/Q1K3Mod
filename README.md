# :godmode: Q1K3 - A JS13k GAME

My entry for the 2021 [js13k](https://js13kgames.com/) competition.

### Quick start
```
npm i
npm run build
npm run start
```

### Demo

Play here: https://sibvrv.github.io/Q1K3Mod/

### Controls
- Movement: WASD or Arrow Keys
- Attack: Left Mouse Button
- Jump: Space or Right Mouse Button
- Switch Weapon: Q/E or Mousewheel

### Features
- 2 Levels
- 5 Types of enemies
- 3 Weapons
- 30 different textures
- Music from Andy Lösch: [no-fate](http://no-fate.net/)
- Dynamic lighting
- Doors(!)
- Somewhat robust collision detection, even for fast moving objects
- Enemy AI with line of sight checks. No pathfinding, but still does a reasonable job following the player
- "Spacial" Audio (Stero separation and falloff by distance)
- Maps build with [TrenchBroom](https://trenchbroom.github.io/)
- A map compiler written in C (used during build)

### Libs used
- [Tiny Texture Tumbler](https://github.com/phoboslab/ttt) for texture generation
- A minified fork of [Sonant-X](https://github.com/nicolas-van/sonant-x) for sounds and music
- [UglifyJS3](https://www.npmjs.com/package/uglify-js) to minify the source
- [Roadroller](https://github.com/lifthrasiir/roadroller/) for further source compression


### License
MIT Licensed

Please be aware that this projects makes use of Sonant-X (albeit heavily modified) 
which is published under the zlib license.
