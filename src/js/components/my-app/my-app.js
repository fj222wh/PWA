/**
 * @description This is the webcomponent for the quiz application.
 * @module my-app
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-app.css.js'
import { htmlTemplate } from './my-app.html.js'

customElements.define('my-app',
  /**
   * The webcomponent for the quiz application.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {string}
     * The URL we will get the fetch from.
     */
    #nextURL = 'https://courselab.lnu.se/quiz/question/1'

    /**
     * @private
     * @type {object}
     * The abortcontroller object.
     */
    #abortController

    /**
     * The constructor for creating this element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.appContainer = this.shadowRoot.querySelector('#container')
      this.quizContainer = this.shadowRoot.querySelector('#quiz')
      this.quizQuestion = this.shadowRoot.querySelector('#quiz-question')
      this.nickname = this.shadowRoot.querySelector('my-nickname')
      this.timer = this.shadowRoot.querySelector('my-countdown')
      this.highscore = this.shadowRoot.querySelector('my-highscore')

      this.question = this.shadowRoot.querySelector('my-question')

      this.#abortController = new AbortController()
    }

    /**
     * What happens when the element is added to the DOM.
     */
    connectedCallback () {
      this.nickname.addEventListener('nicknameSubmitted', (event) => {
        const nickname = event.detail.nickname
        sessionStorage.setItem('nickname', JSON.stringify(nickname))

        this.nickname.classList.add('hidden')
        this.fetchQuestions()
      }, { signal: this.#abortController.signal })

      // Send the data from the alternative we chose when answering the questions and send that data to the method 'postData' to send our answer to the server
      this.quizQuestion.addEventListener('answerSubmitted', (event) => {
        this.timer.stopCountDown()
        this.postAnswer(this.#nextURL, event.detail)
        this.quizQuestion.clear()
      }, { signal: this.#abortController.signal })

      // If we answered the question correctly we will fetch the next question.clear
      this.addEventListener('correctAnswer', (event) => {
        this.fetchQuestions()
      }, { signal: this.#abortController.signal })

      // If we got the wrong answer the quiz will finish.
      this.addEventListener('wrongAnswer', (event) => {
        alert('Wrong answer! Try again!')
        this.endQuiz()
      })

      // If the times's up we'll lose.
      this.addEventListener('timesup', (event) => {
        alert('You lose, time\'s up! Try again!')
        this.endQuiz()
      }, { signal: this.#abortController.signal })

      // If the player gets all of the questions correctly.
      this.addEventListener('youWon', (event) => {
        alert(`Congratulations ${JSON.parse(sessionStorage.getItem('nickname'))}! You got all questions right, you're amazing!`)
        this.saveWinner()
        this.endQuiz()
      }, { signal: this.#abortController.signal })

      // If we want to play again. Reset the game and start over with fetching the questions.
      this.addEventListener('playAgain', (event) => {
        this.reset()
        this.fetchQuestions()
      }, { signal: this.#abortController.signal })
    }

    /**
     * What will happen when the element is removed from the DOM. Remove all event listeners.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Ends the quiz. Stops the countdown and hides everything except the highscore list.
     */
    endQuiz () {
      this.timer.stopCountDown()
      this.renderHS()
      this.nickname.classList.add('hidden')
      this.quizContainer.classList.add('hidden')
      this.highscore.classList.remove('hidden')
      this.quizQuestion.clear()
    }

    /**
     * Fetch the data from the server.
     *
     * @returns {URL} - Returns the URL for the next question.
     */
    async fetchQuestions () {
      try {
        const response = await fetch(this.#nextURL)
        const data = await response.json()

        this.#nextURL = data.nextURL
        this.quizQuestion.createInputElements(data) // Sends the data we got from the fetch to be rendered by the component quiz-questions

        const timeLimit = data.limit || 20
        this.timer.setAttribute('time', timeLimit)

        this.quizContainer.classList.remove('hidden')
        this.timer.countDown()
      } catch (error) {
        console.error('Fetch failed:', error)
      }
    }

    /**
     * Posts the answer to the server and check if the user got the answers correct or wrong.
     *
     * @param {string } url - The URL where to send our answers.
     * @param {object} data - The data we want to send to the server for validation.
     */
    async postAnswer (url, data = {}) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if (!response.ok && !('nextURL' in data)) {
          const wrongAnswer = new CustomEvent('wrongAnswer') // Wrong answer. Quit the game.
          this.dispatchEvent(wrongAnswer)
          this.endQuiz()
        } else if (response.ok) {
          const responseData = await response.json()

          if (!('nextURL' in responseData)) { // If the response was ok and we still didn't get any new URL means that we won.
            const youWonEvent = new CustomEvent('youWon')
            this.dispatchEvent(youWonEvent)

            // If the response is OK and we still didn't get any new URL --> you won. Else show the next question.
          } else if ('nextURL' in responseData) {
            this.#nextURL = responseData.nextURL
            const correctAnswer = new CustomEvent('correctAnswer')
            this.dispatchEvent(correctAnswer)
          }
        }
      } catch (error) {
        console.error('Sorry! Something went wrong:', error)
        this.endQuiz()
      }
    }

    /**
     * Resets the game.
     */
    reset () {
      this.timer.reset()
      this.#nextURL = 'https://courselab.lnu.se/quiz/question/1'
      this.highscore.classList.add('hidden')
      this.quizContainer.classList.remove('hidden')
      this.timer.setAttribute('time', 20)
    }

    /**
     * Saves the player to the highscore list.
     */
    saveWinner () {
      const highscore = JSON.parse(localStorage.getItem('highscore')) || []

      const player = {
        nickname: JSON.parse(sessionStorage.getItem('nickname')),
        score: this.timer.totalTime
      }

      highscore.push(player)

      highscore.sort((a, b) => a.score - b.score)
      highscore.splice(5)
      localStorage.setItem('highscore', JSON.stringify(highscore))
    }

    /**
     * Render the HS list with the top 5 players.
     */
    renderHS () {
      const highscorelist = JSON.parse(localStorage.getItem('highscore')) || []
      this.highscore.render(highscorelist)
    }
  })
