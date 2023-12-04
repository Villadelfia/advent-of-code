import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.trim());

const checkIfPart = (input: Array<string>, x: number, y: number): boolean => {
  const nomatch = "0123456789.";
  if(y > 0) {
    if(x > 0) {
      if(!nomatch.includes(input[y-1][x-1])) return true;
    }

    if(!nomatch.includes(input[y-1][x])) return true;

    if(x < input[y-1].length-1) {
      if(!nomatch.includes(input[y-1][x+1])) return true;
    }
  }

  if(x > 0) {
    if(!nomatch.includes(input[y][x-1])) return true;
  }

  if(x < input[y].length-1) {
    if(!nomatch.includes(input[y][x+1])) return true;
  }

  if(y < input.length-1) {
    if(x > 0) {
      if(!nomatch.includes(input[y+1][x-1])) return true;
    }

    if(!nomatch.includes(input[y+1][x])) return true;

    if(x < input[y+1].length-1) {
      if(!nomatch.includes(input[y+1][x+1])) return true;
    }
  }

  return false;
};

type NumDef = {
  n: number;
  x: number;
  y: number;
};

const addNumber = (input: Array<string>, x: number, y: number, numbers: Array<NumDef>) => {
  if(x > 0) {
    while(x > 0 && input[y][x-1].match(/\d/)) {
      x--;
    }
  }
  let startx = x;
  let worknum = "";
  while(input[y][x].match(/\d/)) {
    worknum += input[y][x];
    x++;
    if(x == input[y].length) {
      break;
    }
  }
  let def: NumDef = {
    n: Number(worknum),
    x: startx,
    y: y,
  }
  for(const num of numbers) {
    if(num.x == def.x && num.y == def.y) return;
  }
  numbers.push(def);
}

const adjacentNumbers = (input: Array<string>, x: number, y: number): Array<NumDef> => {
  if(input[y][x] != "*") return [];
  let numbers: Array<NumDef> = [];
  if(y > 0) {
    if(x > 0) {
      if(input[y-1][x-1].match(/\d/)) addNumber(input, x-1, y-1, numbers);
    }

    if(input[y-1][x].match(/\d/)) addNumber(input, x, y-1, numbers);

    if(x < input[y-1].length-1) {
      if(input[y-1][x+1].match(/\d/))  addNumber(input, x+1, y-1, numbers);
    }
  }

  if(x > 0) {
    if(input[y][x-1].match(/\d/)) addNumber(input, x-1, y, numbers);
  }

  if(x < input[y].length-1) {
    if(input[y][x+1].match(/\d/)) addNumber(input, x+1, y, numbers);
  }

  if(y < input.length-1) {
    if(x > 0) {
      if(input[y+1][x-1].match(/\d/)) addNumber(input, x-1, y+1, numbers);
    }

    if(input[y+1][x].match(/\d/)) addNumber(input, x, y+1, numbers);

    if(x < input[y+1].length-1) {
      if(input[y+1][x+1].match(/\d/)) addNumber(input, x+1, y+1, numbers);
    }
  }

  return numbers;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  let currentnumber = "";
  let currentnumberispart = false;
  for(let y = 0; y < input.length; ++y) {
    const line = input[y];

    if(currentnumberispart && currentnumber != "") {
      sum += Number(currentnumber);
    }
    currentnumber = "";
    currentnumberispart = false;

    for(let x = 0; x < line.length; ++x) {
      const char = line[x];

      if(currentnumber == "") {
        currentnumberispart = false;
        if(char.match(/\d/)) {
          currentnumber += char;
          if(!currentnumberispart && checkIfPart(input, x, y)) {
            currentnumberispart = true;
          }
        }
      } else {
        if(char.match(/\d/)) {
          currentnumber += char;
          if(!currentnumberispart && checkIfPart(input, x, y)) {
            currentnumberispart = true;
          }
        } else {
          if(currentnumberispart && currentnumber != "") {
            sum += Number(currentnumber);
          }
          currentnumber = "";
          currentnumberispart = false;
        }
      }
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for(let y = 0; y < input.length; ++y) {
    for(let x = 0; x < input[y].length; ++x) {
      const nums = adjacentNumbers(input, x, y);
      if(nums.length == 2) sum += nums[0].n * nums[1].n;
    }
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
