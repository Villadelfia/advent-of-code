import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput.trim().split(",");

const doHash = (input: string) => {
  let cur = 0;
  for(let i = 0; i < input.length; i++) {
    cur += input.charCodeAt(i);
    cur *= 17;
    cur %= 256;
  }
  return cur;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(const cmd of input) {
    sum += doHash(cmd);
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const table = Array(256).fill(null).map(_ => new Map<string, number>());
  for(const cmd of input) {
    const label = cmd.split(/-|=/)[0];
    const hash = doHash(label);
    if(cmd.includes("=")) {
      const value = Number(cmd.split("=")[1]);
      table[hash].set(label, value);
    } else {
      table[hash].delete(label);
    }
  }

  let sum = 0;
  for(let i = 0; i < table.length; i++) {
    const map = table[i];
    if(map.size === 0) continue;
    let idx = 0;
    for(const [key, value] of map) {
      sum += (i+1) * (idx+1) * value;
      idx++;
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
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
