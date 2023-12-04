import run from "aocrunner";

type Card = {
  id: number;
  winningNumbers: number[];
  myNumbers: number[];
  matches: number;
};

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.trim()).map((line) => {
  const parts = line.split(/[:|]/);
  const id = Number(parts[0].trim().replace(/ +/g, ' ').split(" ")[1]);
  const winningNumbers = parts[1].trim().replace(/ +/g, ' ').split(" ").map((n) => Number(n.trim()));
  const myNumbers = parts[2].trim().replace(/ +/g, ' ').split(" ").map((n) => Number(n.trim()));
  const matches = myNumbers.filter((n) => winningNumbers.includes(n)).length;
  return {id: id, winningNumbers: winningNumbers, myNumbers: myNumbers, matches: matches} as Card;
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let points = 0;
  for(const card of input) {
    let value = 0;
    for(const number of card.winningNumbers) {
      if(card.myNumbers.includes(number)) {
        if(value === 0) value = 1;
        else            value *= 2;
      }
    }
    points += value;
  }
  return points;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let cardcount = 0;
  for(let i = input.length - 1; i >= 0; i--) {
    cardcount++;
    const card = input[i];
    if(card.matches === 0) continue;
    let toProcess: Card[] = [];
    let matches = card.matches;
    while(matches > 0) {
      const card = input[i + matches];
      toProcess.push(card);
      matches--;
    }

    while(toProcess.length > 0) {
      const card = toProcess.pop() as Card;
      cardcount++;
      if(card.matches === 0) continue;
      let matches = card.matches;
      while(matches > 0) {
        const reward = input[card.id - 1 + matches];
        toProcess.push(reward);
        matches--;
      }
    }
  }

  return cardcount;
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
