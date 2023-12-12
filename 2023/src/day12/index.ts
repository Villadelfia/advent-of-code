import run from "aocrunner";
import _ from "lodash";

type SpringLine = {
  data: string;
  brokenSets: number[];
}

const parseInput = (rawInput: string) => {
  const springLines: SpringLine[] = [];
  for(const row of rawInput.split("\n").map((row) => row.trim().split(" "))) {
    const springLine: SpringLine = {
      data: row[0],
      brokenSets: row[1].split(",").map((num) => Number(num))
    };
    springLines.push(springLine);
  }
  return springLines;
}

const countSolutions = _.memoize((line: string, runs: number[]): number => {
  // Special cases.
  if(line.length === 0) {
    if(runs.length === 0) return 1;
    else                  return 0;
  }

  if(runs.length === 0) {
    for(let i = 0; i < line.length; i++) {
      if(line[i] === "#") return 0;
    }
    return 1;
  }
  
  if(line.length < _.sum(runs) + runs.length - 1) return 0;

  // General case.
  if(line[0] === ".") {
    return countSolutions(line.slice(1), runs);
  }

  if(line[0] === "#") {
    const [run, ...rest] = runs;
    for(let i = 0; i < run; i++) {
      if(line[i] === ".") return 0;
    }
    if(line[run] === "#") return 0;
    return countSolutions(line.slice(run + 1), rest);
  }

  return countSolutions("#" + line.slice(1), runs) + countSolutions("." + line.slice(1), runs);
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(const line of input) {
    sum += countSolutions(line.data, line.brokenSets);
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(const line of input) {
    sum += countSolutions(
      [line.data, line.data, line.data, line.data, line.data].join("?"), 
      [...line.brokenSets, ...line.brokenSets, ...line.brokenSets, ...line.brokenSets, ...line.brokenSets]
    );
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
