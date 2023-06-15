export interface Rover {
  x: number;
  y: number;
  direction: string;
}

export interface Plateau {
  width: number;
  depth: number;
}

export interface ErrorMessage {
  index: number;
  userMessage: string;
}

export interface CollisionPoints {
  posX: number;
  posY: number;
}

export function createPlateau(sizeString: string): Plateau | ErrorMessage {
  if (sizeString.length !== 3 || isNaN(Number(sizeString[0])) || isNaN(Number(sizeString[2]))) {
    return { index: 1, userMessage: 'Invalid sizeString format. Expected format: "x y" where x and y are numbers.' };
  }
  let width = Number(sizeString[0]);
  let depth = Number(sizeString[2]);
  width++;
  depth++;
  return { width, depth };
}

export function createRover(roverString: string): Rover | ErrorMessage {
  if (roverString.length !== 5 || isNaN(Number(roverString[0])) || isNaN(Number(roverString[2])) || !['N', 'E', 'S', 'W'].includes(roverString[4])) {
    return { index: 2, userMessage: 'Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".' };
  }

  let x = Number(roverString[0]);
  let y = Number(roverString[2]);
  let direction = roverString[4];

  return { x, y, direction };
}

export function isRoverCollidingWithPoints(rover: Rover, points: CollisionPoints[]): boolean {
  return points.some(point => point.posX === rover.x && point.posY === rover.y);
}

export function move(rover: Rover, command: string, plateau: Plateau): Rover | ErrorMessage {
  let newX = rover.x;
  let newY = rover.y;
  if (command === 'M') {

    switch (rover.direction) {
      case 'N':
        newY = rover.y + 1;
        break;
      case 'E':
        newX = rover.x + 1;
        break;
      case 'S':
        newY = rover.y - 1;
        break;
      case 'W':
        newX = rover.x - 1;
        break;
    }
    if (newX >= 0 && newX < plateau.width && newY >= 0 && newY < plateau.depth) {
      return { ...rover, x: newX, y: newY };
    } else {
      return { index: 3, userMessage: `Rover@(${rover.x},${rover.y}) not moved since out of bounds of plateau.` };
    }
  } 
  return rover;
}


export function turnLeft(rover: Rover, command: string): Rover {
  if (command === 'L') {
    switch (rover.direction){
      case 'N':
        return { ...rover, direction: 'W' };
      case 'E':
        return { ...rover, direction: 'N' };
      case 'S':
        return { ...rover, direction: 'E' };
      case 'W':
        return { ...rover, direction: 'S' };
    }
  }
  return rover;
} 
export function turnRight(rover: Rover, command: string): Rover {
  if (command === 'R') {
    switch (rover.direction){
      case 'N':
        return { ...rover, direction: 'E' };
      case 'E':
        return { ...rover, direction: 'S' };
      case 'S':
        return { ...rover, direction: 'W' };
      case 'W':
        return { ...rover, direction: 'N' };
    }
  }
  return rover;
} 

export function instructionsRover(rover: Rover, plateau: Plateau, instructions: string, points: CollisionPoints[]): string | ErrorMessage {
  let result: Rover | ErrorMessage = rover;
  for (const value of instructions) {
    if ('userMessage' in result) {
      break;
    }
    switch (value) {
      case 'L':
        result = turnLeft(result as Rover, value);
        break;
      case 'R':
        result = turnRight(result as Rover, value);
        break;
      case 'M':
        result = move(result as Rover, value, plateau);
        if ('x' in result && isRoverCollidingWithPoints(result as Rover, points)) {
          result = { index: 4, userMessage: `Collision detected between rover@(${result.x},${result.y}) and collision point.` };
          break;
        }
    }
  }
  if ('userMessage' in result) {
    return ""+result.userMessage;
  } else {
    points.push({ posX: result.x, posY: result.y });
    return `${result.x} ${result.y} ${result.direction}`;
  }
}