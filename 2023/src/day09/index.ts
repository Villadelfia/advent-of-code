import run from "aocrunner";

type Oasis = {
  reductions: Array<Array<number>>;
}

const parseInput = (rawInput: string) => {
  const inputs = rawInput.split("\n").map((x) => x.trim());
  let output = [] as Oasis[];
  for(const input of inputs) {
    const data = {reductions: []} as Oasis;
    data.reductions.push(input.split(" ").map((x) => Number(x)));
    // Loop until all numbers are 0 and append reductions.
    while(data.reductions[data.reductions.length - 1].filter((x) => x === 0).length !== data.reductions[data.reductions.length - 1].length) {
      const last = data.reductions[data.reductions.length - 1];
      const next = [];
      for(let i = 1; i < last.length; i++) {
        next.push(last[i]-last[i-1]);
      }
      data.reductions.push(next);
    }

    // Propagate reductions.
    let toAdd = 0;
    for(let i = data.reductions.length - 1; i >= 0; i--) {
      const last = data.reductions[i][data.reductions[i].length-1];
      data.reductions[i].push(last + toAdd);
      toAdd = last + toAdd;
    }

    // And in the other direction.
    let toSub = 0;
    for(let i = data.reductions.length - 1; i >= 0; i--) {
      const first = data.reductions[i][0];
      data.reductions[i].unshift(first - toSub);
      toSub = first - toSub;
    }

    output.push(data);
  }
  return output;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(const oasis of input) {
    sum += oasis.reductions[0][oasis.reductions[0].length-1];
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(const oasis of input) {
    sum += oasis.reductions[0][0];
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
