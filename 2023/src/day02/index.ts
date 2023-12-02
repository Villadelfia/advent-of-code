import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rre = /(\d+) red/;
  const gre = /(\d+) green/;
  const bre = /(\d+) blue/;
  let sum = 0;
  for(const line of input) {
    const id = Number(line.split(":")[0].split(" ")[1]);
    let possible = true;
    for(const draw of line.split(":")[1].split(";")) {
      if(draw.match(rre)) {
        if(Number(draw.match(rre)?.[1]) > 12) {
          possible = false;
          break;
        }
      }
      if(draw.match(gre)) {
        if(Number(draw.match(gre)?.[1]) > 13) {
          possible = false;
          break;
        }
      }
      if(draw.match(bre)) {
        if(Number(draw.match(bre)?.[1]) > 14) {
          possible = false;
          break;
        }
      }
    }
    if(possible) {
      sum += id;
    }
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rre = /(\d+) red/;
  const gre = /(\d+) green/;
  const bre = /(\d+) blue/;
  let sum = 0;
  for(const line of input) {
    let minr = 0;
    let ming = 0;
    let minb = 0;
    for(const draw of line.split(":")[1].split(";")) {
      if(draw.match(rre)) minr = Math.max(minr, Number(draw.match(rre)?.[1]));
      if(draw.match(gre)) ming = Math.max(ming, Number(draw.match(gre)?.[1]));
      if(draw.match(bre)) minb = Math.max(minb, Number(draw.match(bre)?.[1]));
    }
    sum += minr * ming * minb;
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
