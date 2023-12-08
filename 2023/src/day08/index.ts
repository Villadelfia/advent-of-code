import run from "aocrunner";

type Node = {
  left: string;
  right: string;
}

type Tree = {
  directions: string;
  nodes: Map<string, Node>;
}

const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
const lcm = (a: number ,b: number): number => a * b / gcd(a, b);

const parseInput = (rawInput: string) => {
  const sections = rawInput.split("\n\n");
  const directions = sections[0].trim();
  const nodes = sections[1].trim().split("\n");
  let nodemap = new Map<string, Node>();
  for(const n of nodes) {
    const data = n.match(/(...) = \((...), (...)\)/) ?? ["???", "???", "???", "???"];
    nodemap.set(data[1], {left: data[2], right: data[3]});
  }
  return {
    directions: directions,
    nodes: nodemap
  } as Tree;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let location = 'AAA';
  let steps = 0;
  while(true) {
    for(const char of input.directions) {
      if(char === 'L') location = input.nodes.get(location)!.left;
      else             location = input.nodes.get(location)!.right;
      steps++;
      if(location === 'ZZZ') return steps;
    }
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let locations = Array.from(input.nodes.keys()).filter((l) => l.endsWith('A'));
  let cycles = [] as Array<number>;
  for(const location of locations) {
    let l = location;
    let steps = 0;
    let charidx = 0;
    while(!l.endsWith('Z')) {
      if(charidx === input.directions.length) charidx = 0;
      const char = input.directions[charidx];
      if(char === 'L') l = input.nodes.get(l)!.left;
      else             l = input.nodes.get(l)!.right;
      steps++;
      charidx++;
    }
    cycles.push(steps);
  }
  return cycles.reduce(lcm);
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
