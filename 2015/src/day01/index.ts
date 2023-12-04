import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let floor = 0;
  for(const char of input) {
    switch(char) {
      case '(':
        floor++;
        break;
      case ')':
        floor--;
        break;
    }
  }
  return floor;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let floor = 0;
  for (const { index, value } of input.split('').map((value, index) => ({ index, value }))) {
    switch(value) {
      case '(':
        floor++;
        break;
      case ')':
        floor--;
        break;
    }
    if(floor < 0) {
      return index+1;
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
