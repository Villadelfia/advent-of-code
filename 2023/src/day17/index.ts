import run from "aocrunner";
import { ICompare, PriorityQueue } from "@datastructures-js/priority-queue";

type Grid = number[][];
const parseInput = (rawInput: string): Grid => rawInput.split("\n").map((line) => line.trim().split("").map(Number));

type Queued = [
  heatLoss: number,
  y: number,
  x: number,
  dy: number,
  dx: number,
  steps: number
];

const compareQueued: ICompare<Queued> = (a: Queued, b: Queued) => {
  return a[0]-b[0];
}

const minimalHeatLossNormal = (grid: Grid): number => {
  const queue = new PriorityQueue<Queued>(compareQueued);
  queue.push([0, 0, 0, 0, 0, 0]);
  const seen = new Set<string>();

  while(queue.size() > 0) {
    const [heatLoss, y, x, dy, dx, steps] = queue.pop();
    if(y === grid.length - 1 && x === grid[0].length - 1) return heatLoss;

    const key = JSON.stringify([y, x, dy, dx, steps]);
    if(seen.has(key)) continue;
    seen.add(key);

    if(steps < 3 && ![dy, dx].every((d) => d === 0)) {
      const ny = y + dy;
      const nx = x + dx;

      if(0 <= ny && ny < grid.length && 0 <= nx && nx < grid[0].length) {
        queue.push([heatLoss+grid[ny][nx], ny, nx, dy, dx, steps+1]);
      }
    }

    for(const [ndy, ndx] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      if(JSON.stringify([ndy, ndx]) !== JSON.stringify([dy, dx]) && JSON.stringify([ndy, ndx]) !== JSON.stringify([-dy, -dx])) {
        const ny = y + ndy;
        const nx = x + ndx;

        if(0 <= ny && ny < grid.length && 0 <= nx && nx < grid[0].length) {
          queue.push([heatLoss+grid[ny][nx], ny, nx, ndy, ndx, 1]);
        }
      }
    }
  }

  return 0;
};

const minimalHeatLossUltra = (grid: Grid): number => {
  const queue = new PriorityQueue<Queued>(compareQueued);
  queue.push([0, 0, 0, 0, 0, 0]);
  const seen = new Set<string>();

  while(queue.size() > 0) {
    const [heatLoss, y, x, dy, dx, steps] = queue.pop();
    if(y === grid.length - 1 && x === grid[0].length - 1 && steps >= 4) return heatLoss;

    const key = JSON.stringify([y, x, dy, dx, steps]);
    if(seen.has(key)) continue;
    seen.add(key);

    if(steps < 10 && ![dy, dx].every((d) => d === 0)) {
      const ny = y + dy;
      const nx = x + dx;

      if(0 <= ny && ny < grid.length && 0 <= nx && nx < grid[0].length) {
        queue.push([heatLoss+grid[ny][nx], ny, nx, dy, dx, steps+1]);
      }
    }

    if(steps >= 4 || [dy, dx].every((d) => d === 0)) {
      for(const [ndy, ndx] of [[0,1],[1,0],[0,-1],[-1,0]]) {
        if(JSON.stringify([ndy, ndx]) !== JSON.stringify([dy, dx]) && JSON.stringify([ndy, ndx]) !== JSON.stringify([-dy, -dx])) {
          const ny = y + ndy;
          const nx = x + ndx;

          if(0 <= ny && ny < grid.length && 0 <= nx && nx < grid[0].length) {
            queue.push([heatLoss+grid[ny][nx], ny, nx, ndy, ndx, 1]);
          }
        }
      }
    }
  }

  return 0;
};


const part1 = (rawInput: string) => {
  return minimalHeatLossNormal(parseInput(rawInput));
};

const part2 = (rawInput: string) => {
  return minimalHeatLossUltra(parseInput(rawInput));
};

run({
  part1: {
    tests: [
      {
        input: `2413432311323
        3215453535623
        3255245654254
        3446585845452
        4546657867536
        1438598798454
        4457876987766
        3637877979653
        4654967986887
        4564679986453
        1224686865563
        2546548887735
        4322674655533`,
        expected: 102,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2413432311323
        3215453535623
        3255245654254
        3446585845452
        4546657867536
        1438598798454
        4457876987766
        3637877979653
        4654967986887
        4564679986453
        1224686865563
        2546548887735
        4322674655533`,
        expected: 94,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
