import run from "aocrunner";

type Race = {
  time: number;
  record: number;
}

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");
  const raceTimes = lines[0].split(":")[1].trim().replace(/ +/g, " ").split(" ").map((i) => Number(i));
  const raceRecords = lines[1].split(":")[1].trim().replace(/ +/g, " ").split(" ").map((i) => Number(i));
  let races = [] as Array<Race>;
  for(let i = 0; i < raceTimes.length; ++i) {
    races.push({
      time: raceTimes[i],
      record: raceRecords[i]
    });
  }
  return races;
}

const parseInput2 = (rawInput: string) => {
  const lines = rawInput.split("\n");
  return {
    time: Number(lines[0].split(":")[1].replace(/ +/g, "")),
    record: Number(lines[1].split(":")[1].replace(/ +/g, ""))
  } as Race;
}

const distance = (time: number, speed: number) => (time-speed)*speed;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let results = [] as Array<number>;

  for(const race of input) {
    const timeLimit = race.time;
    const distanceRecord = race.record;

    // Find lowest input that wins.
    let lowestWinTime = 0;
    for(let mmpms = 0; mmpms < timeLimit; mmpms++) {
      if(distance(timeLimit, mmpms) > distanceRecord) {
        lowestWinTime = mmpms;
        break;
      }
    }

    // Find highest input that wins.
    let highestWinTime = lowestWinTime;
    for(let mmpms = timeLimit-1; mmpms > 0; mmpms--) {
      if(distance(timeLimit, mmpms) > distanceRecord) {
        highestWinTime = mmpms;
        break;
      }
    }

    results.push(highestWinTime-lowestWinTime+1);
  }
  return results.reduce((a, b) => a*b);
};

const part2 = (rawInput: string) => {
  const race = parseInput2(rawInput);
  const timeLimit = race.time;
  const distanceRecord = race.record;

  // Find lowest input that wins.
  let lowestWinTime = 0;
  for(let mmpms = 0; mmpms < timeLimit; mmpms++) {
    if(distance(timeLimit, mmpms) > distanceRecord) {
      lowestWinTime = mmpms;
      break;
    }
  }

  // Find highest input that wins.
  let highestWinTime = lowestWinTime;
  for(let mmpms = timeLimit-1; mmpms > 0; mmpms--) {
    if(distance(timeLimit, mmpms) > distanceRecord) {
      highestWinTime = mmpms;
      break;
    }
  }
  return highestWinTime-lowestWinTime+1;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
        Distance:  9  40  200`,
        expected: 288,
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
