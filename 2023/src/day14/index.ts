import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => line.trim().split(""));
};

const rollNorth = (data: string[][], x: number, y: number) => {
  if(y === 0) return;
  if(data[y][x] !== "O") return;
  let newY = y - 1;
  while(newY >= 0 && data[newY][x] === ".") {
    data[newY][x] = "O";
    data[newY + 1][x] = ".";
    newY--;
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const y = input.length;
  const x = input[0].length;
  for(let i = 0; i < x; i++) {
    for(let j = 0; j < y; j++) {
      rollNorth(input, i, j);
    }
  }
  
  let sum = 0;
  for(let i = 0; i < x; i++) {
    for(let j = 0; j < y; j++) {
      if(input[j][i] === "O") {
        sum += y - j;
      }
    }
  }

  return sum;
};

const rollRocksNorth = _.memoize((data: string) => {
  let lines = data.split("\n").map((line) => line.split(""));
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "O") {
        let dy = y;
        while (dy > 0 && lines[dy - 1][x] === ".") {
          lines[dy - 1][x] = "O";
          lines[dy][x] = ".";
          dy--;
        }
      }
    }
  }
  return lines.map((line) => line.join("")).join("\n");
});

const rollRocksSouth = _.memoize((data: string) => {
  let lines = data.split("\n").map((line) => line.split(""));
  for (let y = lines.length - 1; y >= 0; y--) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "O") {
        let dy = y;
        while (dy < lines.length - 1 && lines[dy + 1][x] === ".") {
          lines[dy + 1][x] = "O";
          lines[dy][x] = ".";
          dy++;
        }
      }
    }
  }
  return lines.map((line) => line.join("")).join("\n");
});

const rollRocksWest = _.memoize((data: string) => {
  let lines = data.split("\n").map((line) => line.split(""));
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "O") {
        let dx = x;
        while (dx > 0 && lines[y][dx - 1] === ".") {
          lines[y][dx - 1] = "O";
          lines[y][dx] = ".";
          dx--;
        }
      }
    }
  }
  return lines.map((line) => line.join("")).join("\n");
});

const rollRocksEast = _.memoize((data: string) => {
  let lines = data.split("\n").map((line) => line.split(""));
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = line.length - 1; x >= 0; x--) {
      const char = line[x];
      if (char === "O") {
        let dx = x;
        while (dx < lines[y].length - 1 && lines[y][dx + 1] === ".") {
          lines[y][dx + 1] = "O";
          lines[y][dx] = ".";
          dx++;
        }
      }
    }
  }
  return lines.map((line) => line.join("")).join("\n");
});

const rollRocks = _.memoize((data: string) => {
  data = rollRocksNorth(data);
  data = rollRocksWest(data);
  data = rollRocksSouth(data);
  data = rollRocksEast(data);
  return data;
});

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput).map((line) => line.join("")).join("\n");

  // Better.
  const seen = new Map<string, number>();
  while(true) {
    input = rollRocks(input);

    if(seen.has(input)) {
      if(seen.get(input) === 2) {
        break;
      }
      seen.set(input, 2);
    } else {
      seen.set(input, 1);
    }
  }

  const cycleMaps = [];
  for (const [map, count] of seen) {
    if(count === 2) {
      cycleMaps.push(map);
    }
  }

  const offset = seen.size - cycleMaps.length;
  const index = (1000000000 - offset) % cycleMaps.length;

  let result = cycleMaps[index - 1].split("\n").map((line) => line.split(""));
  const y = result.length;
  const x = result[0].length;
  let sum = 0;
  for(let i = 0; i < x; i++) {
    for(let j = 0; j < y; j++) {
      if(result[j][i] === "O") {
        sum += y - j;
      }
    }
  }

  return sum;

  // Lol. Memoization works too. But it's slow.
  // for(let i = 0; i < 1000000000; i++) {
  //   input = rollRocks(input);
  // }

  // let result = input.split("\n").map((line) => line.split(""));
  // const y = result.length;
  // const x = result[0].length;
  // let sum = 0;
  // for(let i = 0; i < x; i++) {
  //   for(let j = 0; j < y; j++) {
  //     if(result[j][i] === "O") {
  //       sum += y - j;
  //     }
  //   }
  // }

  // return sum;

};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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