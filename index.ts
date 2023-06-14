import { createRover,
    createPlateau,
    instructionsRover,
    Rover,
    Plateau,
    ErrorMessage,
    CollisionPoints,
            } from './src/rover';
  
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rovers: Rover[] = [];
let messages: string[] = [];
let collisionPoints: CollisionPoints[] = [{ posX: -1, posY: -1}];

rl.question('Enter plateau size: ', (answer) => {
    
    let ans = createPlateau(answer);

    function addRover() {
        let roverCount = 0;
        rl.question('Enter rover starting position and direction: ', (roverInput) => {
            let rover = createRover(roverInput);
            if ('x' in rover) 
                rovers.push(rover);
            else
                messages.push(rover.userMessage);

            rl.question('Enter instructions: ', (instructions) => {
                if ('x' in rover  && 'width' in ans){
                    
                    let newPosition = instructionsRover(rover, ans, instructions,[{posX:-1,posY:-1}]);
                    roverCount++;
                    console.log(newPosition);
                }
                rl.question('Add another rover? (y/n): ', (addAnother) => {
                    if (addAnother.toLowerCase() === 'y') {
                        if(roverCount > 0 && 'x' in rover){
                            collisionPoints.push({posX:rover.x,posY:rover.y});
                        }
                        addRover();
                    } else {
                        rl.close();
                    }
                });
            });
        });
    }

    addRover();
});
