import run from "aocrunner";

type Instruction = {
  direction: "U" | "D" | "L" | "R";
  steps: number;
  direction2: "U" | "D" | "L" | "R";
  steps2: number;
};

type Point = {
  x: number;
  y: number;
};

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n").map((line) => line.trim());
  const instructions: Instruction[] = [];
  for(const line of lines) {
    const [direction, steps, color] = line.split(" ");
    const steps2 = parseInt(color.slice(2, 7), 16);
    let direction2 = color.slice(7, 8);
    if(direction2 === "0") {
      direction2 = "R";
    } else if(direction2 === "1") {
      direction2 = "D";
    } else if(direction2 === "2") {
      direction2 = "L";
    } else if(direction2 === "3") {
      direction2 = "U";
    }
    instructions.push({
      direction: direction as "U" | "D" | "L" | "R",
      steps: Number(steps),
      direction2: direction2 as "U" | "D" | "L" | "R",
      steps2: steps2
    });
  }
  return instructions;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let x = 0;
  let y = 0;
  let area2 = 0;
  let perimeter = 0;

  for(const instruction of input) {
    const {direction, steps} = instruction;
    const x0 = x;
    const y0 = y;
    switch(direction) {
      case "U":
        y -= steps;
        break;
      case "D":
        y += steps;
        break;
      case "L":
        x -= steps;
        break;
      case "R":
        x += steps;
        break;
    }
    area2 += (x0 * y) - (y0 * x);
    perimeter += steps;
  }
  return Math.abs(area2 / 2) + perimeter / 2 + 1;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let x = 0;
  let y = 0;
  let area2 = 0;
  let perimeter = 0;

  for(const instruction of input) {
    const {direction, steps, direction2, steps2} = instruction;
    const x0 = x;
    const y0 = y;
    switch(direction2) {
      case "U":
        y -= steps2;
        break;
      case "D":
        y += steps2;
        break;
      case "L":
        x -= steps2;
        break;
      case "R":
        x += steps2;
        break;
    }
    area2 += (x0 * y) - (y0 * x);
    perimeter += steps2;
  }
  return Math.abs(area2 / 2) + perimeter / 2 + 1;
};

run({
  part1: {
    tests: [
      // {
      //   input: `R 6 (#70c710)
      //   D 5 (#0dc571)
      //   L 2 (#5713f0)
      //   D 2 (#d2c081)
      //   R 2 (#59c680)
      //   D 2 (#411b91)
      //   L 5 (#8ceee2)
      //   U 2 (#caa173)
      //   L 1 (#1b58a2)
      //   U 2 (#caa171)
      //   R 2 (#7807d2)
      //   U 3 (#a77fa3)
      //   L 2 (#015232)
      //   U 2 (#7a21e3)`,
      //   expected: 62,
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
