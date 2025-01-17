export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
<div id="container">
    <div id="start">
        <h1>Welcome to the memory game!</h1>
        <p id="rules">Select difficulty level below, then start flipping the tiles to find matching pairs. Try to solve the puzzle with the fewest moves and in the shortest time possible. Have fun and good luck!</p>
        <div id="game-options">
            <button id="easy">Easy</button>
            <button id="medium">Medium</button>
            <button id="hard">Hard</button>
        </div>
    </div>

    <div id="gameboard" class="hidden">
        <button id="backToStart">menu</button>
        <div id="memoryGame"></div>
        <div id="stats">
         <p id="totalTime">Total time: <span id="totalTimeDisplay"></span></p>
            <p id="p-moves">Total Moves: <span id="totalMoves"></span></p>
        </div>

    </div>

    <div id="end" class="hidden">
        <h1>This is the end of the game</h1>

        <p id="winnerMessage">Det tog så här lång tid för dig att klara spelet!</p>

        <div id="endGameBtns">
            <button id="playAgain">Play Again!</button>
            <button id="changeLevel">Change Level!</button>
        </div>
    </div>
</div>
`
