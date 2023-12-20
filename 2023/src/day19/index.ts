import run from "aocrunner";

type Part = {
  x: number;
  m: number;
  a: number;
  s: number;
}

const parseInput = (rawInput: string) => {
  const sections = rawInput.split("\n\n").map((section) => section.trim());
  const flows = sections[0].split("\n").map((line) => line.trim());
  const parts = sections[1].split("\n").map((section) => section.trim());

  const parsedParts: Part[] = [];
  for(let line of parts) {
    const part: Part = {x:0, m:0, a:0, s:0};
    line = line.slice(1);
    line = line.slice(0, line.length - 1);
    for(const prop of line.split(",")) {
      const [key, value] = prop.split("=");
      part[key as "x" | "m" | "a" | "s"] = parseInt(value);
    }
    parsedParts.push(part);
  }

  let parsedFlows = new Map<string, string>();
  for(let line of flows) {
    const k = line.split("{")[0].trim();
    line = line.split("{")[1].trim();
    line = line.slice(0, line.length - 1);
    parsedFlows.set(k, line);
  }
  return {flows: parsedFlows, parts: parsedParts};
};

const checkRule = (rule: string, part: Part) => {
  let op = "";
  if(rule.includes(">")) op = ">";
  if(rule.includes("<")) op = "<";
  if(op === "") return rule;

  const potentialFlow = rule.split(":")[1].trim();
  const param = rule.split(op)[0].trim();
  const value = Number(rule.split(op)[1].split(":")[0].trim());
  const partValue = part[param as "x" | "m" | "a" | "s"];

  if(op === "<") {
    if(partValue < value) return potentialFlow;
  } else {
    if(partValue > value) return potentialFlow;
  }

  return "";
}

class Range {
  min: number;
  max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  public size() {
    return this.max - this.min + 1;
  }
}

type PartRange = {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
}

const checkRangeRule = (rule: string, part: PartRange) => {
  let A: PartRange | null = { ...part };
  let R: PartRange | null = { ...part };
  let op = "";
  if(rule.includes(">")) op = ">";
  if(rule.includes("<")) op = "<";
  if(op === "") return {fA: A, fR: null};

  const param = rule.split(op)[0].trim();
  const value = Number(rule.split(op)[1].split(":")[0].trim());
  const partValue = part[param as "x" | "m" | "a" | "s"];

  if(op === "<") {
    let accepted: Range | null = new Range(partValue.min, value - 1);
    let denied: Range | null = new Range(value, partValue.max);
    if(accepted.min > accepted.max) accepted = null;
    if(denied.min > denied.max) denied = null;
    accepted ? A[param as "x" | "m" | "a" | "s"] = accepted : A = null;
    denied ? R[param as "x" | "m" | "a" | "s"] = denied : R = null;
    return {fA: A, fR: R};
  } else {
    let accepted: Range | null = new Range(value + 1, partValue.max);
    let denied: Range | null = new Range(partValue.min, value);
    if(accepted.min > accepted.max) accepted = null;
    if(denied.min > denied.max) denied = null;
    accepted ? A[param as "x" | "m" | "a" | "s"] = accepted : A = null;
    denied ? R[param as "x" | "m" | "a" | "s"] = denied : R = null;
    return {fA: A, fR: R};
  }
}

const acceptedRanges = (flows: Map<string,string>, step: string, inp: PartRange) => {
  let A: PartRange[] = [];
  let part: PartRange = { ...inp };

  for(let rule of step.split(",")) {
    if(rule === "A") {
      A.push(part);
      break;
    }
    if(rule === "R") break;

    const {fA, fR} = checkRangeRule(rule, part);
    if(fA) {
      if(!rule.includes(":")) rule = ":" + rule;
      if(rule.split(":")[1].trim() === "A") {
        A.push(part);
      } else if(rule.split(":")[1].trim() !== "R") {
        const ranges = acceptedRanges(flows, flows.get(rule.split(":")[1].trim()) ?? "R", fA);
        if(ranges) A.push(...ranges);
      }
    }
    if(!fR) break;
    part = fR;
  }
  return A;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const A: Part[] = [];
  const R: Part[] = [];
  for(const part of input.parts) {
    let activeFlow = "in";
    while(activeFlow !== "") {
      const flow = input.flows.get(activeFlow);
      if(flow === undefined) {
        break;
      }
      for(const rule of flow.split(",")) {
        const result = checkRule(rule, part);
        if(result === "R") {
          R.push(part);
          activeFlow = "";
          break;
        } else if(result === "A") {
          A.push(part);
          activeFlow = "";
          break;
        } else if(result !== "") {
          activeFlow = result;
          break;
        }
      }
    }
  }
  let sum = 0;
  for(const part of A) {
    sum += part.x;
    sum += part.m;
    sum += part.a;
    sum += part.s;
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const ranges = acceptedRanges(input.flows, input.flows.get("in") ?? "R", {x: new Range(1, 4000), m: new Range(1, 4000), a: new Range(1, 4000), s: new Range(1, 4000)});
  return ranges.reduce((acc, part) => acc + part.x.size() + part.m.size() + part.a.size() + part.s.size(), 0);
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
