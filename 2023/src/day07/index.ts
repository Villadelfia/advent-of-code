import run from "aocrunner";

type Hand = {
  cards: string;
  bid: number;
}

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => {
    const els = line.trim().split(" ");
    return {
      cards: els[0],
      bid: Number(els[1])
    }
  }) as Array<Hand>;
};

const typeOfHand = (hand: string) => {
  let freq = new Map<string, number>();
  for(const card of hand) {
    freq.set(card, (freq.get(card) ?? 0) + 1);
  }

  let pairs = 0;
  let triples = 0;

  for(const [k, v] of freq.entries()) {
    if(v === 5) return 0; // five of a kind
    if(v === 4) return 1; // four of a kind
    if(v === 3) triples++;
    if(v === 2) pairs++;
  }

  if(triples === 1) {
    if(pairs === 1) return 2; // full house
    else            return 3; // three of a kind
  }

  if(pairs === 2) return 4; // two pairs
  if(pairs === 1) return 5; // one pair

  return 6; // high card
};

const typeOfHandJ = (hand: string) => {
  let freq = new Map<string, number>();
  for(const card of hand) {
    freq.set(card, (freq.get(card) ?? 0) + 1);
  }

  let jokers = freq.get("J") ?? 0;
  let pairs = 0;
  let triples = 0;

  for(const [k, v] of freq.entries()) {
    if(k === "J") continue;
    if(v === 5) return 0; // five of a kind
    if(v === 4) {
      if(jokers === 0) return 1; // four of a kind
      else             return 0; // upgrade to five of a kind!
    }
    if(v === 3) triples++;
    if(v === 2) pairs++;
  }

  if(triples === 1) {
    if(jokers === 0) {
      if(pairs === 1) return 2; // full house
      else            return 3; // three of a kind
    } else if(jokers === 1) {
      return 1; // upgrade to four of a kind!
    } else {
      return 0; // upgrade to five of a kind!
    }
  }

  if(pairs === 2) {
    if(jokers === 0) {
      return 4; // two pairs
    } else {
      return 2; // upgrade to full house!
    }
  }

  if(pairs === 1) {
    if(jokers === 0) {
      return 5; // one pair
    } else if(jokers === 1) {
      return 3; // upgrade to three of a kind!
    } else if(jokers === 2) {
      return 1; // upgrade to four of a kind!
    } else {
      return 0; // upgrade to five of a kind!
    }
  }

  if(jokers === 0) {
    return 6; // high card
  } else if(jokers === 1) {
    return 5; // upgrade to one pair!
  } else if(jokers === 2) {
    return 3; // upgrade to three of a kind!
  } else if(jokers === 3) {
    return 1; // upgrade to four of a kind!
  } else {
    return 0; // upgrade to five of a kind!
  }
};

const tieBreaker = (hand1: string, hand2: string) => {
  const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
  for(let i = 0; i < hand1.length; ++i) {
    if(hand1[i] !== hand2[i]) {
      if(cards.indexOf(hand1[i]) < cards.indexOf(hand2[i])) return -1;
      else                                                  return 1;
    }
  }
  return 0;
};

const tieBreakerJ = (hand1: string, hand2: string) => {
  const cards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
  for(let i = 0; i < hand1.length; ++i) {
    if(hand1[i] !== hand2[i]) {
      if(cards.indexOf(hand1[i]) < cards.indexOf(hand2[i])) return -1;
      else                                                  return 1;
    }
  }
  return 0;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  input.sort((a, b) => {
    const atype = typeOfHand(a.cards);
    const btype = typeOfHand(b.cards);
    if(atype !== btype) {
      return atype - btype;
    } else {
      return tieBreaker(a.cards, b.cards);
    }
  });
  let sum = 0;
  for(let i = 0; i < input.length; ++i) {
    const rank = input.length - i;
    sum += rank * input[i].bid;
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  input.sort((a, b) => {
    const atype = typeOfHandJ(a.cards);
    const btype = typeOfHandJ(b.cards);
    if(atype !== btype) {
      return atype - btype;
    } else {
      return tieBreakerJ(a.cards, b.cards);
    }
  });
  console.log(input);
  let sum = 0;
  for(let i = 0; i < input.length; ++i) {
    const rank = input.length - i;
    sum += rank * input[i].bid;
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 5905,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
