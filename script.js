
//declaring global variables to track the game board size. maybe can use this with other gameboards?
const linePixelCount = 40
const totalPixelCount = linePixelCount**2
//declaring variables that track score to the user
let totalFoodEaten = 0
let totalDistanceTraveled = 0

//shortening reference to gameboard itself
const gameContainer = document.getElementById('gameContainer')

// function used for generating the gameboard
const createGameBoardPixels = () => {
    for (let i = 1; i <= totalPixelCount; i++){ //this loop creates a new element with the class and id of 'i'
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="${i}"></div>`
    }
}


//shortening reference to gamepixels
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel')


//first, declaring food variable position, then creating function that...
let currentFoodPosition = 0
const createFood = () => { //REMOVES the current position by removing its class
    gameBoardPixels[currentFoodPosition].classList.remove('food')

    //USES Math.random to randomly select a position on the board
currentFoodPosition = Math.floor( Math.random() * totalPixelCount )
    //ADDS the class 'food' to CREATE a new position on the board
gameBoardPixels[currentFoodPosition].classList.add('food')
}


//setting up snake user and snake behavior
//key values of arrow keys on keyboard
const leftDir = 37
const upDir = 38
const rightDir = 39
const downDir = 40

//defining current direction
let snakeCurrentDir = rightDir

let changeDirection = newDirectionCode => {
    if(newDirectionCode == snakeCurrentDir) return; // if new direction = same direction snake is currently moving, return aka do nothing

//these else if statements detect that the snakes movement, making sure its not already moving in its opposite direction
    if( newDirectionCode == leftDir && snakeCurrentDir !== rightDir ){ 
        snakeCurrentDir = newDirectionCode
    } else if(newDirectionCode == upDir && snakeCurrentDir !== downDir){
        snakeCurrentDir = newDirectionCode //if new wanted direction is up AND current direction is not down, change current direction
    } else if( newDirectionCode == rightDir && snakeCurrentDir !== leftDir){
        snakeCurrentDir = newDirectionCode
    } else if(newDirectionCode == downDir && snakeCurrentDir !== upDir){
        snakeCurrentDir = newDirectionCode
    }

}
//setting starting position for snake on load
let currentHeadPosition = totalPixelCount/2

//set initial length of snake 
let snakeLength = 200

//moving snake function and using switch/break to handle wrapping to the opposite side of the screen
const moveSnake = () => {
    switch(snakeCurrentDir){
        //when the snake moves all the way left, wrap back around to the right of the gameboard
        case leftDir: 
        --currentHeadPosition 
        const isHeadAtLeft = currentHeadPosition % linePixelCount ==
        linePixelCount -1 || currentHeadPosition < 0
        if (isHeadAtLeft){
            currentHeadPosition = currentHeadPosition + linePixelCount
        }
        break;
        //opposite
        case rightDir:
            ++currentHeadPosition
            const isHeadAtRight = currentHeadPosition % linePixelCount == 0
            if(isHeadAtRight) {
                currentHeadPosition = currentHeadPosition - linePixelCount
            }
        break;
        //when the snake moves all the way up, wrap back around to the bottom of the gameboard
        case upDir:
            currentHeadPosition = currentHeadPosition - linePixelCount
            const isHeadAtTop = currentHeadPosition < 0
            if(isHeadAtTop){
                currentHeadPosition = currentHeadPosition + totalPixelCount 
            }
        break;
            //opposite
            case downDir:
                currentHeadPosition = currentHeadPosition + linePixelCount
                  const isHeadAtBottom = currentHeadPosition > totalPixelCount -1; // this line 98 on codepen
                  if (isHeadAtBottom) {
                  currentHeadPosition = currentHeadPosition - totalPixelCount
                }
                break; 

        default:

         break;


    }
    //declaring the snake head's NEXT position
    let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition]
    //if/else statement to declare the game over with an ALERT when a snake eats itself.
    //if the snake head moves onto a pixel with the classlist of snakeBodyPixel, end game
    if( nextSnakeHeadPixel.classList.contains("snakeBodyPixel") ){
        console.log('this works')
        clearInterval(moveSnakeInterval)
        alert(`Game over. You have eaten ${totalFoodEaten} and you have 
        traveled ${totalDistanceTraveled}`);
        window.location.reload()
    }

    nextSnakeHeadPixel.classList.add('snakeBodyPixel')


    //remove snake styling to keep snake at appropriate length
    setTimeout( () => {
        nextSnakeHeadPixel.classList.remove('snakeBodyPixel')
    }, snakeLength)
//declaring what to do when a snake encounters a food pixel. aka when you score in snake
    if(currentHeadPosition == currentFoodPosition){
        totalFoodEaten++
        document.getElementById('pointsEarned').innerText = totalFoodEaten
        snakeLength = snakeLength + 100
        createFood()
    }
}
//calling initial function to begin game
createGameBoardPixels()
createFood()

//setting animation speed of snake
let moveSnakeInterval = setInterval(moveSnake, 50)
 

addEventListener('keydown', e => changeDirection(e.keyCode))
//adding variables for on-screen buttons. (linking HTML elements to JS)
const leftButton = document.getElementById('leftButton')
const rightButton = document.getElementById('rightButton')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')

//adding listeners for each arrow key
leftButton.onclick = () => changeDirection(leftDir)
rightButton.onclick = () => changeDirection(rightDir)
upButton.onclick = () => changeDirection(upDir)
downButton.onclick = () => changeDirection(downDir)