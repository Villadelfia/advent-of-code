import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.split(" "));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let x = 0;
  let y = 0;
  for(const line of input) {
    const command = line[0];
    const value = Number(line[1]);
    switch(command) {
      case 'forward':
        x += value;
        break;
      case 'up':
        y -= value;
        break;
      case 'down':
        y += value;
        break;
      default:
        throw new Error(`Unknown command ${command}`);
    }
  }
  return x * y;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let x = 0;
  let y = 0;
  let aim = 0;
  for(const line of input) {
    const command = line[0];
    const value = Number(line[1]);
    switch(command) {
      case 'forward':
        x += value;
        y += aim * value;
        break;
      case 'up':
        aim -= value;
        break;
      case 'down':
        aim += value;
        break;
      default:
        throw new Error(`Unknown command ${command}`);
    }
  }
  return x * y;
};

run({
  part1: {
    tests: [
      {
        input: `forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2`,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2`,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
