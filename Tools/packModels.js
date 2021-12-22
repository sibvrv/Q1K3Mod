#! /usr/bin/env node

const {readFileSync, writeFileSync} = require('fs');
const config = require('../models.json');

/**
 * Extract vertices and faces from OBJ
 * @param text
 * @return {{v, f}}
 */
const convertOBJ = (text) => {
  const v = text.match(/^v (.*?) (.*?) (.*?)$/gm).map(it => ((ret) => [+ret[1], +ret[2], +ret[3]])(/^v (.*?) (.*?) (.*?)$/.exec(it)));
  const f = text.match(/^f (\d+).*?(\d+).*?(\d+).*?$/gm).map(it => ((ret) => [ret[1] - 1, ret[2] - 1, ret[3] - 1])(/^f (\d+).*?(\d+).*?(\d+).*?$/.exec(it)));
  const vMax = v.map(it => Math.max(...it.map(cv => Math.abs(cv)))).reduce((a, b) => Math.max(a, b));
  return {v, f, vMax};
};

/**
 * Compile Models
 * @param model
 */
const compileModel = (model) => {
  const {files} = model;
  const data = files.map(filename => readFileSync(filename, {encoding: 'utf8'})).map(m => convertOBJ(m));
  const maxV = data.map(it => it.vMax).reduce((a, b) => Math.max(a, b));
  const buffer = [
    // Header
    data.length, // Frames
    data[0].v.length, // Vertices per Frame
    data[0].f.length, // Faces per Frame
  ];

  // Vertices
  data.forEach(frame => {
    frame.v.forEach(vert => {
      buffer.push(...vert.map(comp => Math.round(comp * 15 / maxV) + 15));
    });
  });

  let prevIndex = 0;
  data[0].f.forEach((face, index) => {

    const addressInc = face[0] - prevIndex;
    if (addressInc > 3) {
      throw new Error(`Face ${index} index a increment exceeds 2 bits (${addressInc})`);
    }
    prevIndex = face[0];

    if (Math.max(face) > 127) {
      throw new Error(`Face ${index} index exceeds 7 bits (${face.join(', ')})`);
    }

    buffer.push(addressInc, face[1], face[2]);
  });

  return buffer;
};

const output = Uint8Array.from([].concat(...config.models.map((files) => compileModel(files))));

writeFileSync(config.output, output);
