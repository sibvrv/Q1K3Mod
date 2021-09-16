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

function generateMap() {
  const maze_width = 8;
  const maze_height = 8;

  const maze = makeMaze(maze_width, maze_height);
  let maze_data = displayMaze(maze, maze_width, maze_height);
  for (let i = 2; --i >= 0;) {
    maze_data = extendMaze(maze_data.map(it => it === 2 ? 0 : Math.min(1, it)), maze_width * 2 + 1, maze_height * 2 + 1);
  }

  const row = [];
  for (let y = 0; y < maze_height * 2 + 1; y++) {
    for (let x = 0; x < maze_width * 2 + 1; x++) {
      let c: any = maze_data[y * (maze_width * 2 + 1) + x];
      if (!c) c = ' ';
      if (c === 2) c = '·';
      if (c > 0) c = '█';
      row.push(c);
    }
    row.push('\n');
  }
  console.log(row.join(''));

  let mw = maze_width * 2 + 1;

  const b = [255, 1, 0, 0, 0, 128, 1, 128]

  maze_data.forEach((it, index) => {
    const _x = ~~(index / mw);
    const _y = index % mw;

    if (it) {
      if (Math.random() > 0.8) {
        b.push(255, 1 + ~~(Math.random() * 8));
      }

      b.push(_x * 4, 1, _y * 4, 4, 8 + ~~(Math.random() * 32), 4);
    }
  });

  return b;
}
