import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => Number(line));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let increases = 0;
  let last = null;
  for(let i = 0; i < input.length; i++) {
    let current = input[i];
    if(last && current > last) increases++;
    last = current;
  }
  return increases;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let increases = 0;
  let last = null;
  for(let i = 0; i < input.length - 2; i++) {
    let current = input[i] + input[i + 1] + input[i + 2];
    if(last && current > last) increases++;
    last = current;
  }
  return increases;
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
