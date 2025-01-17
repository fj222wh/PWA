/**
 * @description This is the webcomponent for the memory game.
 * @module my-memory
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-memory.css.js'
import { htmlTemplate } from './my-memory.html.js'

/**
 *
 */
customElements.define('my-memory',

  /**
   *
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {object}
     * The abortcontroller object.
     */
    #abortController

    /**
     * The size of the game board in width and height
     */
    #gameboardSize

    /**
     * The number of tiles we got correct
     */
    #correctTiles = 0

    /**
     * The total number of tiles on the gameboard.
     */
    #totalTiles

    /**
     * The amount of moves used to solve this game
     */
    #totalMoves = 0

    /**
     * The number of flipped tiles.
     */
    #flippedTiles = []

    /**
     * The number of pairs
     */
    #pairs

    /**
     * The timer ID
     */
    #timer

    /**
     * The total time elapsed
     */
    #totalTime = 0
    /**
     * The constructor.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.#abortController = new AbortController()

      // HTML Elements
      this.tilesContainer = this.shadowRoot.querySelector('#memoryGame')
      this.gameboard = this.shadowRoot.querySelector('#gameboard')
      this.startDisplay = this.shadowRoot.querySelector('#start')
      this.endDisplay = this.shadowRoot.querySelector('#end')
      this.totalMovesDisplay = this.shadowRoot.querySelector('#totalMoves')
      this.winnerMessage = this.shadowRoot.querySelector('#winnerMessage')

      // Buttons
      this.easyModeBtn = this.shadowRoot.querySelector('#easy')
      this.mediumModeBtn = this.shadowRoot.querySelector('#medium')
      this.hardModeBtn = this.shadowRoot.querySelector('#hard')
      this.playAgainBtn = this.shadowRoot.querySelector('#playAgain')
      this.changeLevelBtn = this.shadowRoot.querySelector('#changeLevel')
      this.backToStartBtn = this.shadowRoot.querySelector('#backToStart')

      this.totalTimeDisplay = this.shadowRoot.querySelector('#totalTimeDisplay')

      // Data
      this.#gameboardSize = {
        width: 4,
        height: 4
      }
      this.#totalTiles = this.#gameboardSize.width * this.#gameboardSize.height
    }

    /**
     * What happens when the element is added to the DOM.
     */
    connectedCallback () {
      this.easyModeBtn.addEventListener('click', (event) => {
        this.removeAllTiles()
        this.startGame(2, 2)
      }, { signal: this.#abortController.signal })

      this.mediumModeBtn.addEventListener('click', (event) => {
        this.removeAllTiles()
        this.startGame(2, 4)
      }, { signal: this.#abortController.signal })

      this.hardModeBtn.addEventListener('click', (event) => {
        this.removeAllTiles()
        this.startGame(4, 4)
      }, { signal: this.#abortController.signal })

      this.gameboard.addEventListener('click', (event) => {
        if (event.target.tagName === 'MY-FLIPPING-TILE' &&
          !event.target.hasAttribute('disabled') &&
          !event.target.hasAttribute('hidden')) {
          event.target.disabled = true
          this.tileLogic(event.target)
        }
      }, { signal: this.#abortController.signal })

      this.addEventListener('youWon', (event) => {
        this.youWon()
      })

      this.playAgainBtn.addEventListener('click', (event) => {
        event.target.disabled = true
        this.playAgain()
      })

      this.changeLevelBtn.addEventListener('click', (event) => {
        this.resetGame()
        this.changeLevel()
      })

      this.backToStartBtn.addEventListener('click', (event) => {
        this.resetGame()
        this.startDisplay.classList.remove('hidden')
        this.gameboard.classList.add('hidden')
      })
    }

    /**
     * What happens when the element is removed to the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Sets the new values for height and width to the gameboard and starts the game.
     *
     * @param {number} newWidth - The width
     * @param {number} newHeight - The height
     */
    startGame (newWidth, newHeight) {
      this.startDisplay.classList.add('hidden')
      this.gameboard.classList.remove('hidden')
      if (newHeight === 2 && newHeight === 2) {
        this.tilesContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'
      } else {
        this.tilesContainer.style.gridTemplateColumns = 'repeat(4, 1fr)'
      }
      this.#gameboardSize.width = newWidth
      this.#gameboardSize.height = newHeight

      this.#totalTiles = this.#gameboardSize.width * this.#gameboardSize.height
      this.#pairs = Array.from(this.#totalTiles / 2)
      this.renderTiles()
    }

    /**
     * The logic behind the game.
     *
     * @param {Element} tile - The tile we clicked on
     */
    tileLogic (tile) {
      console.log(`This is the tiles in flipped tiles: ${this.#flippedTiles}`)
      console.log(this.#flippedTiles)
      if (this.#flippedTiles.length === 2 && this.#flippedTiles.includes(tile.j)) {
        return
      }

      this.#flippedTiles.push(tile)

      this.#totalMoves++
      this.renderMoves()

      if (this.#flippedTiles.length === 2) {
        // Check if there are two fliipped tiles, if there is disable the rest of the buttons to be non-clickable. Then check if these two tiles match.
        Array.from(this.tilesContainer.children).forEach(tile => {
          tile.setAttribute('disabled', 'true')
        })
        this.checkMatch(this.#flippedTiles[0], this.#flippedTiles[1])
      }
    }

    /**
     * Checks if the revealed tiles matches.
     *
     * @param {Element} tile1 - The element for the first tile.
     * @param {Element} tile2 - The element for the second tile.
     */
    checkMatch (tile1, tile2) {
      const id1 = tile1.getAttribute('id')
      const id2 = tile2.getAttribute('id')

      if (id1 === id2) {
        this.#correctTiles += 2

        if (this.#correctTiles === this.#totalTiles) {
          this.stopTimer()
          const youWonEvent = new CustomEvent('youWon')
          this.dispatchEvent(youWonEvent)
        }

        setTimeout(() => {
          Array.from(this.tilesContainer.children).forEach(tile => {
            tile.removeAttribute('disabled')
          })

          // Set the matched tiles to hidden and disabled
          tile1.setAttribute('hidden', true)
          tile2.setAttribute('hidden', true)
          tile1.setAttribute('disabled', true)
          tile2.setAttribute('disabled', true)
          this.#flippedTiles = []
        }, 2000)
      } else {
        setTimeout(() => {
          tile1.removeAttribute('face-up')
          tile2.removeAttribute('face-up')
          Array.from(this.tilesContainer.children).forEach(tile => {
            tile.removeAttribute('disabled', 'false')
          })
          this.#flippedTiles = []
        }, 2000)
      }
    }

    /**
     * Renders the tiles.
     */
    renderTiles () {
      this.#pairs = this.#totalTiles / 2

      const uniqueTiles = []
      for (let i = 1; i < (this.#pairs + 1); i++) {
        uniqueTiles.push(i)
      }

      const URLnumber = [...uniqueTiles, ...uniqueTiles]
      const shuffledArray = this.shuffleTiles(URLnumber)

      // Get an array containing as many numbers as tiles. We need to multiply it by two since we need two of each cards. Then we shuffle the order of the array to get a random order of the tiles, then we loop through this shuffled array to render every tile.

      // We save the index of URLnumber to match it with the corresponding image. Append the image to the tile and then append the tile to the gameboard.

      const tileID = [1, 2, 3, 4, 5, 6, 7, 8]

      for (let i = 0; i < shuffledArray.length; i++) {
        const tileElement = document.createElement('my-flipping-tile')
        const pathToModule = `${new URL('../', import.meta.url)}/my-memory`
        const image = document.createElement('img')
        const imgURL = `${pathToModule}/images/${URLnumber[i]}.png`
        image.setAttribute('src', imgURL)

        console.log(pathToModule)

        tileElement.appendChild(image)
        tileElement.setAttribute('id', `img${imgURL}`)
        tileElement.setAttribute('tileNumber', `${tileID[i]}`)
        this.tilesContainer.appendChild(tileElement)
      }

      this.startTimer()
    }

    /**
     * Shuffle the tiles with fisher yates.
     *
     * @param {Array} arr - The array we want to shuffle.
     * @returns {Array} Returns the shuffled array.
     */
    shuffleTiles (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }

    /**
     * When the player wins.
     */
    youWon () {
      this.winnerMessage.textContent = `Yayy!! Well done! You solved this memory in ${this.#totalTime} seconds and with ${this.#totalMoves} moves!`
      setTimeout(() => {
        this.playAgainBtn.disabled = false
        this.gameboard.classList.add('hidden')
        this.endDisplay.classList.remove('hidden')
      }, 800)
    }

    /**
     * Play again with the current settings.
     */
    playAgain () {
      this.endDisplay.classList.add('hidden')
      this.gameboard.classList.remove('hidden')
      this.resetGame()
      this.renderTiles()
    }

    /**
     * Change the level of the game.
     */
    changeLevel () {
      this.startDisplay.classList.remove('hidden')
      this.endDisplay.classList.add('hidden')
    }

    /**
     * Resets the game after each round.
     */
    resetGame () {
      this.stopTimer()
      this.removeAllTiles()
      this.#flippedTiles = []
      this.#totalMoves = 0
      this.#correctTiles = 0
      this.renderMoves()
      this.resetTimer()
    }

    /**
     * Removes all of the tiles.
     */
    removeAllTiles () {
      while (this.tilesContainer.firstChild) {
        this.tilesContainer.removeChild(this.tilesContainer.firstChild)
      }
    }

    /**
     * Renders the moves played.
     */
    renderMoves () {
      this.totalMovesDisplay.textContent = this.#totalMoves
    }

    /**
     * Returns the total time.
     *
     * @returns {number} The total time elapsed.
     */
    get totalTime () {
      return this.#totalTime
    }

    /**
     * Starts the countdown timer.
     */
    startTimer () {
      this.updateTimerDisplay()
      this.#totalTime++
      this.#timer = setTimeout(() => this.startTimer(), 1000)
    }

    /**
     * Updates the timer display.
     *
     */
    updateTimerDisplay () {
      this.totalTimeDisplay.textContent = this.#totalTime
    }

    /**
     * Stops the counter.
     */
    stopTimer () {
      if (this.#timer) {
        clearTimeout(this.#timer)
        this.#timer = null
      }
      this.updateTimerDisplay()
    }

    /**
     * Rests the timer and counter for the elapsed time to default values.
     *
     */
    resetTimer () {
      this.#totalTime = 0
      this.updateTimerDisplay()
    }
  })
