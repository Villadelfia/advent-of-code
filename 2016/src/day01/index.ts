import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let heading = 0;
  let x = 0;
  let y = 0;
  for(const instruction of input.split(", ").map((inst) => inst.trim())) {
    const turn = instruction[0];
    const distance = Number(instruction.slice(1));
    if(turn === 'R') {
      heading++;
    } else {
      heading--;
    }

    if(heading === -1) {
      heading = 3;
    } else if(heading === 4) {
      heading = 0;
    }

    switch(heading) {
      case 0:
        y += distance;
        break;
      case 1:
        x += distance;
        break;
      case 2:
        y -= distance;
        break;
      case 3:
        x -= distance;
        break;
      default:
        throw new Error(`Invalid heading: ${heading}`);
    }
  }

  return Math.abs(x) + Math.abs(y);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let heading = 0;
  let x = 0;
  let y = 0;
  let visited = new Set(['0,0']);
  for(const instruction of input.split(", ").map((inst) => inst.trim())) {
    const turn = instruction[0];
    let distance = Number(instruction.slice(1));
    if(turn === 'R') {
      heading++;
    } else {
      heading--;
    }

    if(heading === -1) {
      heading = 3;
    } else if(heading === 4) {
      heading = 0;
    }

    switch(heading) {
      case 0:
        while(distance > 0) {
          distance--;
          y++;
          if(visited.has(`${x},${y}`)) {
            return Math.abs(x) + Math.abs(y);
          } else {
            visited.add(`${x},${y}`);
          }
        }
        break;
      case 1:
        while(distance > 0) {
          distance--;
          x++;
          if(visited.has(`${x},${y}`)) {
            return Math.abs(x) + Math.abs(y);
          } else {
            visited.add(`${x},${y}`);
          }
        }
        break;
      case 2:
        while(distance > 0) {
          distance--;
          y--;
          if(visited.has(`${x},${y}`)) {
            return Math.abs(x) + Math.abs(y);
          } else {
            visited.add(`${x},${y}`);
          }
        }
        break;
      case 3:
        while(distance > 0) {
          distance--;
          x--;
          if(visited.has(`${x},${y}`)) {
            return Math.abs(x) + Math.abs(y);
          } else {
            visited.add(`${x},${y}`);
          }
        }
        break;
      default:
        throw new Error(`Invalid heading: ${heading}`);
    }
  }
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
