import run from "aocrunner";
import _ from "lodash";

type Pattern = {
  rows: string[];
  cols: string[];
}

const parseInput = (rawInput: string) => {
  const patterns: Pattern[] = [];
  for(const section of rawInput.split("\n\n").map((row) => row.trim())) {
    const rows = section.split("\n").map((row) => row.trim());
    const cols = _.zip(...rows.map(r => r.split(""))).map(c => c.join(""));
    const pattern: Pattern = {
      rows: rows,
      cols: cols,
    };
    patterns.push(pattern);
  }
  return patterns;
}

const differences = (a: string, b: string) => {
  let sum = 0;
  for(let i = 0; i < a.length; i++) {
    if(a[i] !== b[i]) sum++;
  }
  return sum;
}

const findReflection = (pattern: Pattern) => {
  // Try horizontal reflection.
  for(let i = 0; i < pattern.rows.length-1; i++) {
    if(pattern.rows[i] === pattern.rows[i+1]) {
      let match = true;
      for(let j = i-1; j >= 0 && i+1+(i-j) < pattern.rows.length; j--) {
        if(pattern.rows[j] !== pattern.rows[i+1+(i-j)]) {
          match = false;
          break;
        }
      }
      if(match) return 100 * (i+1);
    }
  }

  // Try vertical reflection.
  for(let i = 0; i < pattern.cols.length-1; i++) {
    if(pattern.cols[i] === pattern.cols[i+1]) {
      let match = true;
      for(let j = i-1; j >= 0 && i+1+(i-j) < pattern.cols.length; j--) {
        if(pattern.cols[j] !== pattern.cols[i+1+(i-j)]) {
          match = false;
          break;
        }
      }
      if(match) return (i+1);
    }
  }

  return 0;
}

const findReflectionSmudge = (pattern: Pattern) => {
  // Try horizontal reflection.
  for(let i = 0; i < pattern.rows.length-1; i++) {
    if(pattern.rows[i] === pattern.rows[i+1] || differences(pattern.rows[i], pattern.rows[i+1]) === 1) {
      let match = true;
      let smudge = differences(pattern.rows[i], pattern.rows[i+1]) === 1 ? 0 : 1;
      for(let j = i-1; j >= 0 && i+1+(i-j) < pattern.rows.length; j--) {
        if(pattern.rows[j] !== pattern.rows[i+1+(i-j)]) {
          if(smudge === 1 && differences(pattern.rows[j], pattern.rows[i+1+(i-j)]) === 1) {
            smudge--;
          } else {
            match = false;
            break;
          }
        }
      }
      if(match && smudge === 0) return 100 * (i+1);
    }
  }

  // Try vertical reflection.
  for(let i = 0; i < pattern.cols.length-1; i++) {
    if(pattern.cols[i] === pattern.cols[i+1] || differences(pattern.cols[i], pattern.cols[i+1]) === 1) {
      let match = true;
      let smudge = differences(pattern.cols[i], pattern.cols[i+1]) === 1 ? 0 : 1;
      for(let j = i-1; j >= 0 && i+1+(i-j) < pattern.cols.length; j--) {
        if(pattern.cols[j] !== pattern.cols[i+1+(i-j)]) {
          if(smudge === 1 && differences(pattern.cols[j], pattern.cols[i+1+(i-j)]) === 1) {
            smudge--;
          } else {
            match = false;
            break;
          }
        }
      }
      if(match && smudge === 0) return (i+1);
    }
  }

  return 0;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(const pattern of input) {
    sum += findReflection(pattern);
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(const pattern of input) {
    sum += findReflectionSmudge(pattern);
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `#.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.

        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#
        `,
        expected: 405,
      },
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
