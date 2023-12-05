import run from "aocrunner";

const parseInput = (rawInput: string) => {
  let mode = 0;
  let data = {
    seeds: [] as Array<number>,
    seedToSoilMap: new Map<Array<number>, number>(),
    soilToFertilizerMap: new Map<Array<number>, number>(),
    fertilizerToWaterMap: new Map<Array<number>, number>(),
    waterToLightMap: new Map<Array<number>, number>(),
    lightToTemperatureMap: new Map<Array<number>, number>(),
    temperatureToHumidityMap: new Map<Array<number>, number>(),
    humidityToLocationMap: new Map<Array<number>, number>(),
  };

  for(const line of rawInput.split("\n").map((line) => line.trim())) {
    if(line.startsWith("seeds:")) {
      mode = 0;
    } else if(line.startsWith("seed-to-soil map:")) {
      mode = 1;
      continue;
    } else if(line.startsWith("soil-to-fertilizer map:")) {
      mode = 2;
      continue;
    } else if(line.startsWith("fertilizer-to-water map:")) {
      mode = 3;
      continue;
    } else if(line.startsWith("water-to-light map:")) {
      mode = 4;
      continue;
    } else if(line.startsWith("light-to-temperature map:")) {
      mode = 5;
      continue;
    } else if(line.startsWith("temperature-to-humidity map:")) {
      mode = 6;
      continue;
    } else if(line.startsWith("humidity-to-location map:")) {
      mode = 7;
      continue;
    } else if(line.trim() === "") {
      continue;
    }

    if(mode === 0) {
      data.seeds = line.split(":")?.[1].trim().split(" ").map((seed) => Number(seed));
    } else {
      const [to, from, count] = line.split(" ").map((item) => Number(item));
      if(mode === 1) data.seedToSoilMap.set([from, from+count], to);
      if(mode === 2) data.soilToFertilizerMap.set([from, from+count], to);
      if(mode === 3) data.fertilizerToWaterMap.set([from, from+count], to);
      if(mode === 4) data.waterToLightMap.set([from, from+count], to);
      if(mode === 5) data.lightToTemperatureMap.set([from, from+count], to);
      if(mode === 6) data.temperatureToHumidityMap.set([from, from+count], to);
      if(mode === 7) data.humidityToLocationMap.set([from, from+count], to);
    }
  }

  return data;
}

const followMap = (map: Map<Array<number>, number>, what: number) => {
  for(const [from, to] of map.entries()) {
    if(from[0] <= what && from[1] >= what) {
      return (what-from[0]) + to;
    }
  }
  return what;
}

const followMapRange = (map: Map<Array<number>, number>, ranges: Array<Array<number>>) => {
  let ret = [] as Array<Array<number>>;
  for(const [from, to] of map.entries()) {
    const fromstart = from[0];
    const fromend = from[1];
    let newRanges = [] as Array<Array<number>>;
    while(ranges.length > 0) {
      const [start, end] = ranges.shift() as Array<number>;
      const beforeStart = start;
      const beforeEnd = Math.min(end, fromstart);
      const interStart = Math.max(start, fromstart);
      const interEnd = Math.min(end, fromend);
      const afterStart = Math.max(start, fromend);
      const afterEnd = end;
      if(beforeEnd > beforeStart) {
        newRanges.push([beforeStart, beforeEnd]);
      }
      if(interEnd > interStart) {
        ret.push([interStart-fromstart+to, interEnd-fromstart+to]);
      }
      if(afterEnd > afterStart) {
        newRanges.push([afterStart, afterEnd]);
      }
    }
    ranges = newRanges;
  }
  ret.push(...ranges);
  return ret;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let lowestLocation = Number.POSITIVE_INFINITY;
  for(const seed of input.seeds) {
    const soil = followMap(input.seedToSoilMap, seed);
    const fertilizer = followMap(input.soilToFertilizerMap, soil);
    const water = followMap(input.fertilizerToWaterMap, fertilizer);
    const light = followMap(input.waterToLightMap, water);
    const temperature = followMap(input.lightToTemperatureMap, light);
    const humidity = followMap(input.temperatureToHumidityMap, temperature);
    const location = followMap(input.humidityToLocationMap, humidity);

    if(location < lowestLocation) {
      lowestLocation = location;
    }
  }

  return lowestLocation;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let lowestLocation = Number.POSITIVE_INFINITY;
  let ranges = [];
  for(let i = 0; i < input.seeds.length; i+=2) {
    const seedstart = input.seeds[i];
    const seedend = seedstart + input.seeds[i+1];
    ranges.push([seedstart, seedend]);
  }

  ranges = followMapRange(input.seedToSoilMap, ranges);
  ranges = followMapRange(input.soilToFertilizerMap, ranges);
  ranges = followMapRange(input.fertilizerToWaterMap, ranges);
  ranges = followMapRange(input.waterToLightMap, ranges);
  ranges = followMapRange(input.lightToTemperatureMap, ranges);
  ranges = followMapRange(input.temperatureToHumidityMap, ranges);
  ranges = followMapRange(input.humidityToLocationMap, ranges);

  for(const [start, end] of ranges) {
    if(start < lowestLocation) {
      lowestLocation = start;
    }
  }

  return lowestLocation;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48

        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15

        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4

        water-to-light map:
        88 18 7
        18 25 70

        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13

        temperature-to-humidity map:
        0 69 1
        1 0 69

        humidity-to-location map:
        60 56 37
        56 93 4`,
        expected: 35,
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
