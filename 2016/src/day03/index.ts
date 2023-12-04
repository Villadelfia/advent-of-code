import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput
  .split("\n")
  .map((line) => line
    .replace(/ +(?= )/g,'')
    .trim()
    .split(" ")
    .map((side) => Number(side)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let possible = 0;
  for(const line of input) {
    const sides = line.sort((a, b) => a - b);
    if(sides[0] + sides[1] > sides[2]) {
      possible++;
    }
  }
  return possible;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let possible = 0;
  for(let i = 0; i < input.length; i += 3) {
    for(let j = 0; j < 3; j++) {
      const sides = [input[i][j], input[i+1][j], input[i+2][j]].sort((a, b) => a - b);
      if(sides[0] + sides[1] > sides[2]) {
        possible++;
      }
    }
  }
  return possible;
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
