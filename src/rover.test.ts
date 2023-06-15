import { createRover,
  move,
  createPlateau,
  turnLeft,
  turnRight,
  instructionsRover,
  isRoverCollidingWithPoints,
          } from './rover';


describe('createPlateau', () => {
  it('should create a Plateau object with the correct width and depth', () => {
    const result = createPlateau('5 5');
    expect(result).toEqual({ width: 6, depth: 6 });
  });

  it('should return an error message if the input string is not in the correct format', () => {
    const result = createPlateau('55');
    expect(result).toEqual({ index: 1, userMessage: 'Invalid sizeString format. Expected format: "x y" where x and y are numbers.' });
  });
});

describe('Check Move is within Plateau', () => {
  it('Cancel move if outside Plateau', () => {
    const plateau = { width: 6, depth: 6 };
    let rover = { x: 0, y: 0, direction: 'W' };
    let resultRover = move(rover, 'M', plateau);

    expect(resultRover).toEqual({ index: 3, userMessage: "Rover@(0,0) not moved since out of bounds of plateau." });

  });
});

describe('createRover', () => {
  it('should be initialized with a starting position and direction', () => {
    let rover = createRover('0 0 N');
    expect(rover).toEqual({ x: 0, y: 0, direction: 'N' });

    rover = createRover('5 5 W');
    expect(rover).toEqual({ x: 5, y: 5, direction: 'W' });
  });

  it('should create a Rover object with the correct x, y, and direction values', () => {
    const result = createRover('1 2 N');
    expect(result).toEqual({ x: 1, y: 2, direction: 'N' });
  });

  it('should return an error message if the input string is not in the correct format', () => {
    const result = createRover('12N');
    expect(result).toEqual({ index: 2, userMessage: 'Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".' });
  });


  it('should move forward in the direction it is facing', () => {
    let plateau = createPlateau("5 5");
    if ('width' in plateau) {
      expect(plateau.width).toBe(6);
      expect(plateau.depth).toBe(6);
      let rover = createRover('0 0 N');
      if ('x' in rover) {
        rover = move(rover, 'M', plateau);
        if ('x' in rover) {
          expect(rover.x).toBe(0);
          expect(rover.y).toBe(1);
        }
      }
      rover = createRover('0 0 E');
      if ('x' in rover) {
        rover = move(rover, 'M', plateau);
        if ('x' in rover) {
          expect(rover.x).toBe(1);
          expect(rover.y).toBe(0);
        }
      }

      rover = createRover('5 5 S');
      if ('x' in rover) {
        rover = move(rover, 'M', plateau);
        if ('x' in rover) {
          expect(rover.x).toBe(5);
          expect(rover.y).toBe(4);
        }
      }

      rover = createRover('5 5 W');
      if ('x' in rover) {
        rover = move(rover, 'M', plateau);
        if ('x' in rover) {
          expect(rover.x).toBe(4);
          expect(rover.y).toBe(5);
        }
      }
    } else {
      expect(plateau.userMessage).toBe({ index: 1, userMessage: 'Invalid sizeString format. Expected format: "x y" where x and y are numbers.' });
    }

  });

  it('should turn Left if instructed', () => {
    let rover = createRover('0 0 N');
    if ('x' in rover) {
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(0);
      expect(rover.y).toBe(0);
      expect(rover.direction).toBe('W');
    }
    rover = createRover('3 4 E');
    if ('x' in rover) {
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(3);
      expect(rover.y).toBe(4);
      expect(rover.direction).toBe('N');
    }

    rover = createRover('5 6 S');
    if ('x' in rover) {
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(5);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('E');
    }

    rover = createRover('6 6 W');
    if ('x' in rover) {
      rover = turnLeft(rover, 'L');
      expect(rover.x).toBe(6);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('S');
    }
  });

  it('should turn Right if instructed', () => {
    let rover = createRover('0 0 N');
    if ('x' in rover) {
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(0);
      expect(rover.y).toBe(0);
      expect(rover.direction).toBe('E');
    }
    rover = createRover('3 4 E');
    if ('x' in rover) {
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(3);
      expect(rover.y).toBe(4);
      expect(rover.direction).toBe('S');
    }
    rover = createRover('5 6 S');
    if ('x' in rover) {
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(5);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('W');
    }
    rover = createRover('6 6 W');
    if ('x' in rover) {
      rover = turnRight(rover, 'R');
      expect(rover.x).toBe(6);
      expect(rover.y).toBe(6);
      expect(rover.direction).toBe('N');
    }
  });
});

describe('move', () => {
  it('should move the rover one unit forward in its current direction if the command is "M"', () => {
    const rover = { x: 1, y: 2, direction: 'N' };
    const plateau = { width: 6, depth: 6 };
    const result = move(rover, 'M', plateau);
    expect(result).toEqual({ x: 1, y: 3, direction: 'N' });
  });

  it('should return an error message if the new position is out of bounds', () => {
    const rover = { x: 5, y: 5, direction: 'N' };
    const plateau = { width: 6, depth: 6 };
    const result = move(rover, 'M', plateau);
    expect(result).toEqual({ index: 3, userMessage: 'Rover@(5,5) not moved since out of bounds of plateau.' });
  });
});

describe('Input to 2 rovers and their output', () => {
  it('test for plateau 6x6 and 2 rover moves', () => {
    let plateau = createPlateau("5 5");

    if ('width' in plateau) {
      // plateau is of type Plateau
      expect(plateau.width).toBe(6);
      expect(plateau.depth).toBe(6);
      let rover1 = createRover('1 2 N');
      if ('x' in rover1) {
        let points = [{ posX: -1, posY: -1 }];
        let execute = instructionsRover(rover1, plateau, "LMLMLMLMM", points);
        expect(execute).toBe("1 3 N");
      } else {
        expect(rover1.userMessage).toBe('Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".');
      }
      let rover2 = createRover('3 3 E');
      let points = [{ posX: 1, posY: 2 }];
      if ('x' in rover2) {
        expect(instructionsRover(rover2, plateau, "MMRMMRMRRM", points)).toBe("5 1 E");
      } else {
        expect(rover2.userMessage).toBe('Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".');
      }
      let rover3 = createRover('3 4 E');
      points.push({ posX: 5, posY: 1 });
      if ('x' in rover3) {
        let execute = instructionsRover(rover3, plateau, "MMMMMMMM", points);
        expect(execute).toEqual('Rover@(5,4) not moved since out of bounds of plateau.');
      } else {
        expect(rover3.userMessage).toBe('Invalid roverString format. Expected format: "x y d" where x and y are numbers and d is one of "N", "E", "S", "W".');
      }
    } else {
      expect(plateau.userMessage).toBe('Invalid sizeString format. Expected format: "x y" where x and y are numbers.');
    };
  });
});

describe('isRoverCollidingWithPoints', () => {
  it('should return true if the rover collides with any of the points in the array', () => {
    const rover = { x: 1, y: 2, direction: 'N' };
    const points = [{ posX: 1, posY: 2 }];
    const result = isRoverCollidingWithPoints(rover, points);
    expect(result).toBe(true);
  });

  it('should return false if the rover does not collide with any of the points in the array', () => {
    const rover = { x: 1, y: 2, direction: 'N' };
    const points = [{ posX: 3, posY: 4 }];
    const result = isRoverCollidingWithPoints(rover, points);
    expect(result).toBe(false);
  });
});

describe('instructionsRover', () => {
  it('should return an error message if a collision is detected between the rover and any of the collision points', () => {
    const rover = { x: 1, y: 2, direction: 'N' };
    const plateau = { width: 6, depth: 6 };
    const points = [{ posX: 1, posY: 3 }];
    const result = instructionsRover(rover, plateau, 'M', points);
    expect(result).toEqual('Collision detected between rover@(1,3) and collision point.');
  });
});
