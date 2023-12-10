import run from "aocrunner";

// For my input the "S" is a "|". This can be automated, but meh.

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.trim().split(""));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let start = {
    x: 0,
    y: 0
  };
  for(let y = 0; y < input.length; ++y) {
    const line = input[y];
    for(let x = 0; x < line.length; ++x) {
      if(line[x] === "S") {
        start.x = x;
        start.y = y;
      }
    }
  }
  input[start.y][start.x] = "|";

  let x = start.x;
  let y = start.y;
  let visited = new Set<string>(`${x},${y}`);
  let first = true;
  let steps = 0;
  while(first || (x !== start.x || y !== start.y)) {
    steps++;
    first = false;
    const char = input[y][x];

    // Try down.
    if("|F7".includes(char)) {
      if(!visited.has(`${x},${y+1}`)) {
        y = y+1;
        visited.add(`${x},${y}`);
        continue;
      }
    }

    // Try left.
    if("-J7".includes(char)) {
      if(!visited.has(`${x-1},${y}`)) {
        x = x-1;
        visited.add(`${x},${y}`);
        continue;
      }
    }

    // Try up.
    if("|JL".includes(char)) {
      if(!visited.has(`${x},${y-1}`)) {
        y = y-1;
        visited.add(`${x},${y}`);
        continue;
      }
    }

    // Try right.
    if("-FL".includes(char)) {
      if(!visited.has(`${x+1},${y}`)) {
        x = x+1;
        visited.add(`${x},${y}`);
        continue;
      }
    }
  }
  return steps/2;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // First we redo part 1 and get the loop.
  let start = {
    x: 0,
    y: 0
  };
  for(let y = 0; y < input.length; ++y) {
    const line = input[y];
    for(let x = 0; x < line.length; ++x) {
      if(line[x] === "S") {
        start.x = x;
        start.y = y;
      }
    }
  }
  input[start.y][start.x] = "|";
  let x = start.x;
  let y = start.y;
  let visited = new Set<string>(`${x},${y}`);
  let first = true;
  while(first || (x !== start.x || y !== start.y)) {
    first = false;
    const char = input[y][x];

    // Try down.
    if("|F7".includes(char)) {
      if(!visited.has(`${x},${y+1}`)) {
        y = y+1;
        visited.add(`${x},${y}`);
        continue;
      }
    }

    // Try left.
    if("-J7".includes(char)) {
      if(!visited.has(`${x-1},${y}`)) {
        x = x-1;
        visited.add(`${x},${y}`);
        continue;
      }
    }

    // Try up.
    if("|JL".includes(char)) {
      if(!visited.has(`${x},${y-1}`)) {
        y = y-1;
        visited.add(`${x},${y}`);
        continue;
      }
    }

    // Try right.
    if("-FL".includes(char)) {
      if(!visited.has(`${x+1},${y}`)) {
        x = x+1;
        visited.add(`${x},${y}`);
        continue;
      }
    }
  }

  // We can now use parity per row.
  let sum = 0;
  for(let y = 0; y < input.length; ++y) {
    let parity = 0;
    let corner = '';
    for(let x = 0; x < input[y].length; ++x) {
      if(visited.has(`${x},${y}`)) {
        const char = input[y][x];
        if(char === "|") {
          parity++;
        } else if(char !== '-') {
          if(corner !== '') {
            if(corner === "L" && char === "7") {
              parity++;
            } else if(corner === "F" && char === "J") {
              parity++;
            }
            corner = '';
          } else {
            corner = char;
          }
        }
      } else if(parity % 2 === 1) {
        sum++;
      }
    }
  }
  return sum;
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
