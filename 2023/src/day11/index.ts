import run from "aocrunner";

type Universe = {
  maxx: number;
  maxy: number;
  galaxies: Galaxy[];
}

type Galaxy = {
  x: number;
  y: number;
}

const parseInput = (rawInput: string) => {
  const data = rawInput.split("\n").map((row) => row.trim().split(""));
  const universe: Universe = {
    maxx: data[0].length,
    maxy: data.length,
    galaxies: [],
  };
  data.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === "#") {
        if(x > universe.maxx) universe.maxx = x;
        if(y > universe.maxy) universe.maxy = y;
        universe.galaxies.push({ x, y });
      }
    });
  });
  return universe;
}

const findEmptyX = (universe: Universe) => {
  const emptyx: number[] = [];
  for(let x = 0; x < universe.maxx; x++) {
    if(!universe.galaxies.find(galaxy => galaxy.x === x)) {
      emptyx.push(x);
    }
  }
  return emptyx;
};

const findEmptyY = (universe: Universe) => {
  const emptyy: number[] = [];
  for(let y = 0; y < universe.maxy; y++) {
    if(!universe.galaxies.find(galaxy => galaxy.y === y)) {
      emptyy.push(y);
    }
  }
  return emptyy;
};

const expandUniverse = (universe: Universe) => {
  const emptyx = findEmptyX(universe).sort((a, b) => a - b);
  const emptyy = findEmptyY(universe).sort((a, b) => a - b);
  for(const galaxy of universe.galaxies) {
    const left = emptyx.filter(x => x < galaxy.x).length;
    const up = emptyy.filter(y => y < galaxy.y).length;
    galaxy.x += left;
    galaxy.y += up;
  }
};

const expandUniverseBeeeg = (universe: Universe) => {
  const emptyx = findEmptyX(universe).sort((a, b) => a - b);
  const emptyy = findEmptyY(universe).sort((a, b) => a - b);
  for(const galaxy of universe.galaxies) {
    const left = emptyx.filter(x => x < galaxy.x).length;
    const up = emptyy.filter(y => y < galaxy.y).length;
    galaxy.x += left * 999999;
    galaxy.y += up * 999999;
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  expandUniverse(input);
  let sum = 0;
  for(let i = 0; i < input.galaxies.length; i++) {
    const galaxy1 = input.galaxies[i];
    for(let j = i+1; j < input.galaxies.length; j++) {
      const galaxy2 = input.galaxies[j];
      sum += Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
    }
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  expandUniverseBeeeg(input);
  let sum = 0;
  for(let i = 0; i < input.galaxies.length; i++) {
    const galaxy1 = input.galaxies[i];
    for(let j = i+1; j < input.galaxies.length; j++) {
      const galaxy2 = input.galaxies[j];
      sum += Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
    }
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
