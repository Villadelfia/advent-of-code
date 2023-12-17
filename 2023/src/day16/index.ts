import run from "aocrunner";
import _ from "lodash";

type Point = {
  x: number;
  y: number;
};

type Action = {
  position: Point;
  direction: Point;
}

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.trim().split(""));

const addPoints = (a: Point, b: Point) => {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  } as Point;
};

const rotateBackSlash = (direction: Point) => {
  if(direction.x === 1) {
    return {
      x: 0,
      y: 1
    } as Point;
  } else if(direction.x === -1) {
    return {
      x: 0,
      y: -1
    } as Point;
  } else if(direction.y === 1) {
    return {
      x: 1,
      y: 0
    } as Point;
  } else if(direction.y === -1) {
    return {
      x: -1,
      y: 0
    } as Point;
  }

  throw new Error("What?");
};

const rotateSlash = (direction: Point) => {
  if(direction.x === 1) {
    return {
      x: 0,
      y: -1
    } as Point;
  } else if(direction.x === -1) {
    return {
      x: 0,
      y: 1
    } as Point;
  } else if(direction.y === 1) {
    return {
      x: -1,
      y: 0
    } as Point;
  } else if(direction.y === -1) {
    return {
      x: 1,
      y: 0
    } as Point;
  }

  throw new Error("What?");
}

const isOob = (p: Point, x: number, y: number) => {
  return p.x < 0 || p.x >= x || p.y < 0 || p.y >= y;
};

const checkAndAdd = (a: Action, seen: Map<string, Point[]>) => {
  if(seen.has(`${a.position.x}_${a.position.y}`)) {
    const v = seen.get(`${a.position.x}_${a.position.y}`) as Point[];
    if(v.filter((p) => p.x === a.direction.x && p.y === a.direction.y).length === 0) {
      seen.set(`${a.position.x}_${a.position.y}`, [a.direction, ...v]);
      return true;
    } else {
      return false;
    }
  } else {
    seen.set(`${a.position.x}_${a.position.y}`, [a.direction]);
    return true;
  }
}

const getEnergized = (input: string[][], startPt: Point, startHeading: Point): number => {
  const visited = new Map<string, Point[]>();
  visited.set(`${startPt.x}_${startPt.y}`, [startHeading]);
  let doing = [{
    position: startPt,
    direction: startHeading
  }] as Action[];
  const maxY = input.length;
  const maxX = input[0].length;

  while(doing.length > 0) {
    const newDoing = [] as Action[];
    for(const action of doing) {
      const char = input[action.position.y][action.position.x];
      switch(char) {
        case '.': {
          const newAction = {
            position: addPoints(action.position, action.direction),
            direction: action.direction
          };

          if(!isOob(newAction.position, maxX, maxY)) {
            if(checkAndAdd(newAction, visited)) {
              newDoing.push(newAction);
            }
          }

          break;
        }

        case '|': {
          if(action.direction.y === 0) {
            const newAction1 = {
              position: addPoints(action.position, {x: 0, y: -1}),
              direction: {x: 0, y: -1}
            };

            const newAction2 = {
              position: addPoints(action.position, {x: 0, y: 1}),
              direction: {x: 0, y: 1}
            };

            if(!isOob(newAction1.position, maxX, maxY)) {
              if(checkAndAdd(newAction1, visited)) {
                newDoing.push(newAction1);
              }
            }

            if(!isOob(newAction2.position, maxX, maxY)) {
              if(checkAndAdd(newAction2, visited)) {
                newDoing.push(newAction2);
              }
            }
          } else {
            const newAction = {
              position: addPoints(action.position, action.direction),
              direction: action.direction
            };

            if(!isOob(newAction.position, maxX, maxY)) {
              if(checkAndAdd(newAction, visited)) {
                newDoing.push(newAction);
              }
            }
          }

          break;
        }


        case '-': {
          if(action.direction.x === 0) {
            const newAction1 = {
              position: addPoints(action.position, {x: -1, y: 0}),
              direction: {x: -1, y: 0}
            };

            const newAction2 = {
              position: addPoints(action.position, {x: 1, y: 0}),
              direction: {x: 1, y: 0}
            };

            if(!isOob(newAction1.position, maxX, maxY)) {
              if(checkAndAdd(newAction1, visited)) {
                newDoing.push(newAction1);
              }
            }

            if(!isOob(newAction2.position, maxX, maxY)) {
              if(checkAndAdd(newAction2, visited)) {
                newDoing.push(newAction2);
              }
            }
          } else {
            const newAction = {
              position: addPoints(action.position, action.direction),
              direction: action.direction
            };

            if(!isOob(newAction.position, maxX, maxY)) {
              if(checkAndAdd(newAction, visited)) {
                newDoing.push(newAction);
              }
            }
          }

          break;
        }


        case '/': {
          const newAction = {
            position: addPoints(action.position, rotateSlash(action.direction)),
            direction: rotateSlash(action.direction)
          };

          if(!isOob(newAction.position, maxX, maxY)) {
            if(checkAndAdd(newAction, visited)) {
              newDoing.push(newAction);
            }
          }

          break;
        }


        case '\\': {
          const newAction = {
            position: addPoints(action.position, rotateBackSlash(action.direction)),
            direction: rotateBackSlash(action.direction)
          };

          if(!isOob(newAction.position, maxX, maxY)) {
            if(checkAndAdd(newAction, visited)) {
              newDoing.push(newAction);
            }
          }

          break;
        }

        default:
          throw new Error("This is impossiburu");
      }
    }

    doing = newDoing;
  }

  return visited.size;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getEnergized(input, {x: 0, y: 0}, {x: 1, y: 0});
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const maxY = input.length;
  const maxX = input[0].length;
  let max = 0;
  for(let x = 0; x < maxX; ++x) {
    for(let y = 0; y < maxY; ++ y) {
      for(const heading of [{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}]) {
        const nrg = getEnergized(input, {x: x, y: y}, heading);
        if(nrg > max) max = nrg;
      }
    }
  }
  return max;
};

run({
  part1: {
    tests: [
      {
        input: `.|...\\....
        |.-.\\.....
        .....|-...
        ........|.
        ..........
        .........\\
        ..../.\\\\..
        .-.-/..|..
        .|....-|.\\
        ..//.|....`,
        expected: 46,
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
