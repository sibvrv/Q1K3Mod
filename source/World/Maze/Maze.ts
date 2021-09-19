interface MazeNode {
  right: boolean;
  bottom: boolean;
  parent: MazeNode;
}

function shuffle<T>(array: T[]) {
  for (let i = array.length; --i >= 0;) {
    const j = Math.floor(Math.random() * (i + 1));
    const tempi = array[i];
    array[i] = array[j];
    array[j] = tempi;
  }
}

const getRoot = (node: MazeNode): MazeNode => node.parent ? getRoot(node.parent) : node;

const check_wall = (first: MazeNode, second: MazeNode) => {
  const first_root = getRoot(first);
  const second_root = getRoot(second);
  if (first_root === second_root) {
    return true;
  }
  first_root.parent = second_root;
  return false;
};

const makeMaze = (width: number, height: number) => {
  const sets: MazeNode[] = [];
  const order = [];
  const total = width * height;

  for (let i = total * 2; --i >= 0;) {
    order.push(i);
    sets.push({} as any);
  }
  sets.length = total;
  shuffle(order);

  order.forEach((i) => {
    let first, second;
    if (i >= total) {
      first = sets[i - total];
      if (i % width === width - 1) {
        first.right = true;
        return;
      }
      second = sets[i - total + 1];
      first.right = check_wall(first, second);
    } else {
      first = sets[i];
      if (Math.floor(i / width) === height - 1) {
        first.bottom = true;
        return;
      }
      second = sets[i + width];
      first.bottom = check_wall(first, second);
    }
  });
  return sets;
};

const displayMaze = (sets: MazeNode[], width: number, height: number) => {
  let x, y, item;
  const grid = [];
  for (x = 0; x < width * 2 + 1; x++) {
    grid.push(1);
  }

  for (y = 0; y < height; y++) {
    grid.push(1);
    for (x = 0; x < width; x++) {
      item = sets[y * width + x];
      grid.push(0);
      grid.push(item.right ? 1 : 0);
    }

    grid.push(1);
    for (x = 0; x < width; x++) {
      item = sets[y * width + x];
      var itemr = sets[y * width + x + 1];
      var itemb = sets[y * width + x + width];
      grid.push(item.bottom ? 1 : 0);
      grid.push((item.right || item.bottom || itemr.bottom || itemb.right) ? 1 : 0);
    }
  }
  return grid;
};

const extendMaze = (data: number[], w: number, h: number): number[] => {
  let result = data.slice();
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const index = y * w + x;
      if (result[index]) {
        result[index] = 1 +
          data[index - 1] + data[index + 1] +
          data[index - w] + data[index + w];
      }
    }
  }
  return result;
};

const
  rndi = (size: number) => ~~(Math.random() * size),
  fill = <T>(count: number, value: T): T[] => Array(count).fill(value);

const wall = (segments: number) => fill(segments, [0, 0]).map(() => [rndi(2), 2 + rndi(8)]);

function generateMap() {
  const maze_width = 8;
  const maze_height = 8;

  const maze = makeMaze(maze_width, maze_height);
  let maze_data = displayMaze(maze, maze_width, maze_height);
  for (let i = 3; --i >= 0;) {
    maze_data = extendMaze(maze_data.map(it => it === 2 ? 0 : Math.min(1, it)), maze_width * 2 + 1, maze_height * 2 + 1);
  }

  let mw = maze_width * 2 + 1;

  const b = [255, 1, 0, 0, 0, 128, 1, 128];

  maze_data.forEach((it, index) => {
    const _x = ~~(index / mw);
    const _y = index % mw;

    if (it) {
      if (Math.random() > 0.8) {
        b.push(255, 1 + ~~(Math.random() * 8));
      }

      const wl = wall(4);

      let dy = 1;
      for (let i = wl.length; --i >= 0;) {
        const it = wl[i];
        b.push(
          _x * 6 - it[0],
          dy,
          _y * 6 - it[0],
          6 + it[0] * 2,
          it[1],//8 + ~~(Math.random() * 32),
          6 + it[0] * 2,
        );
        dy += it[1];
      }
    }
  });

  let e: number[] = [
    // Player start
    0, 1 * 6 + 3, 49 + 1, 1 * 6 + 3, 0, 0,
    12, maze_width * 12 - 6, 8, maze_height * 12 - 6, 10, 7,
    13, maze_width * 12 - 6, 2, maze_height * 12 - 6, 10, 7,
  ];

  for (let dy = maze_height; --dy >= 0;) {
    for (let dx = maze_width; --dx >= 0;) {
      if (dx == 0 && dy == 0) {
        continue;
      }

      if (dx === maze_width - 1 && dy === maze_height - 1) {
        continue;
      }

      e.push(12,
        6 + dx * 12 + 2,
        8 + ~~(Math.random() * 5),
        6 + dy * 12 + 2,
        10, 246);
      e.push(8,
        6 + dx * 12 + 2,
        8,
        6 + dy * 12 + 2,
        0, 0);

    }
  }

  return {b, e};
}
