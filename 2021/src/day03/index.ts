import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const digits = input[0].length;
  let gamma = 0;
  let epsilon = 0;
  for(let i = 0; i < digits; i++) {
    const zeroes = input.filter((line) => line[i] === '0').length;
    const ones = input.length - zeroes;
    if(ones > zeroes) {
      gamma += 1 << (digits - i - 1);
    } else {
      epsilon += 1 << (digits - i - 1);
    }
  }
  return gamma * epsilon;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const digits = input[0].length;
  let filtered = input;
  let i = 0;
  while(filtered.length > 1) {
    const zeroes = filtered.filter((line) => line[i] === '0').length;
    const ones = filtered.length - zeroes;
    if(ones >= zeroes) filtered = filtered.filter((line) => line[i] === '1');
    else               filtered = filtered.filter((line) => line[i] === '0');
    i++;
  }
  const oxygen = Number('0b' + filtered[0]);
  filtered = input;
  i = 0;
  while(filtered.length > 1) {
    const zeroes = filtered.filter((line) => line[i] === '0').length;
    const ones = filtered.length - zeroes;
    if(zeroes <= ones) filtered = filtered.filter((line) => line[i] === '0');
    else               filtered = filtered.filter((line) => line[i] === '1');
    i++;
  }
  const co2 = Number('0b' + filtered[0]);
  return oxygen * co2;
};

run({
  part1: {
    tests: [
      {
        input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`,
        expected: 198,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`,
        expected: 230,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
