
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


//declaring food variable, creating function that creates new food pixel
let currentFoodPosition = 0
const createFood = () => {
    gameBoardPixels[currentFoodPosition].classList.remove('food')
}

currentFoodPosition = Math.floor( Math.random() * totalPixelCount )