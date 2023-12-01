import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.trim());

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let filtered = input.map((line) => line.split('').filter((char) => char.match(/\d/)).join(''));
  let summed = filtered.reduce((acc, curr) => acc + Number(curr[0] + curr[curr.length-1]), 0);
  return summed;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let filtered = [];
  for(let line of input) {
    let processed = '';
    while(line.length > 0) {
      if(line[0].match(/\d/)) {
        processed += line[0];
      } else if(line.startsWith('one')) {
        processed += '1';
      } else if(line.startsWith('two')) {
        processed += '2';
      } else if(line.startsWith('three')) {
        processed += '3';
      } else if(line.startsWith('four')) {
        processed += '4';
      } else if(line.startsWith('five')) {
        processed += '5';
      } else if(line.startsWith('six')) {
        processed += '6';
      } else if(line.startsWith('seven')) {
        processed += '7';
      } else if(line.startsWith('eight')) {
        processed += '8';
      } else if(line.startsWith('nine')) {
        processed += '9';
      }
      line = line.slice(1);
    }
    filtered.push(processed);
  }
  let summed = filtered.reduce((acc, curr) => acc + Number(curr[0] + curr[curr.length-1]), 0);
  return summed;
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
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
