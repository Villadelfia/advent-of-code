import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.trim());

const pad = (x: number, y: number) => {
  if(x == -1) {
    if(y == -1) return 1;
    if(y == 0)  return 4;
    if(y == 1)  return 7;
  }
  if(x == 0) {
    if(y == -1) return 2;
    if(y == 0)  return 5;
    if(y == 1)  return 8;
  }
  if(x == 1) {
    if(y == -1) return 3;
    if(y == 0)  return 6;
    if(y == 1)  return 9;
  }
}

const pad2 = `.......
...1...
..234..
.56789.
..ABC..
...D...
.......`.split("\n").map((line) => line.trim().split(""));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let code = "";
  for(const line of input) {
    let x = 0;
    let y = 0;
    for(const instruction of line) {
      switch(instruction) {
        case 'U':
          if(y > -1) y--;
          break;
        case 'D':
          if(y < 1) y++;
          break;
        case 'L':
          if(x > -1) x--;
          break;
        case 'R':
          if(x < 1) x++;
          break;
      }
    }
    code += pad(x, y);
  }
  return code;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let code = "";
  for(const line of input) {
    let x = 1;
    let y = 3;
    for(const instruction of line) {
      switch(instruction) {
        case 'U':
          if(pad2[y-1][x] !== '.') y--;
          break;
        case 'D':
          if(pad2[y+1][x] !== '.') y++;
          break;
        case 'L':
          if(pad2[y][x-1] !== '.') x--;
          break;
        case 'R':
          if(pad2[y][x+1] !== '.') x++;
          break;
      }
    }
    code += pad2[y][x];
  }
  return code;
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
