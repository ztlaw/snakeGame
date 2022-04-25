const linePixelCount = 40
const totalPixelCount = linePixelCount**2

let totalFoodEaten = 0
let totalDistanceTraveled = 0

const gameContainer = document.getElementById('gameContainer')


const createGameBoardPixels = () => {
    for (let i = 1; i <= totalPixelCount; i++){ //this loop creates a new element with the class and id of 'i'
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="${i}"></div>`
    }
}