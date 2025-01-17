/**
 * @description The webcomponent for the countdown timer.
 * @module my-countdown
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-countdown.css.js'
import { htmlTemplate } from './my-countdown.html.js'

customElements.define('my-countdown',
  /**
   * Creating the webcomponent for the countdown timer.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {number}
     * How long the time limit is.
     */
    #time = 20

    /**
     * @private
     * @type {number}
     * The timer ID.
     */
    #timer

    /**
     * @private
     * @type {number}
     * The total time elapsed.
     */
    #totalTime = 0

    /**
     * Creating the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.timerContainer = this.shadowRoot.querySelector('#timer')
      this.countdownDisplay = this.shadowRoot.querySelector('#countdownDisplay')
      this.totalTimeDisplay = this.shadowRoot.querySelector('#totalTimeDisplay')
    }

    /**
     * Observe changes in attributes.
     *
     * @returns {Array} - Returns the observed attributes
     */
    static get observedAttributes () {
      return ['time']
    }

    /**
     * When the attribute is changed the new value will replace the old value if the attribute is 'time'.
     *
     * @param {string }name - The attribute we want to change. Needs to be a positive value.
     * @param {number} oldValue - Our old value for this attribute.
     * @param {string } newValue - Our new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'time') {
        const parsedValue = parseInt(newValue, 10)

        if (Number.isInteger(parsedValue) && parsedValue > 0) {
          this.#time = parsedValue
        }
      }
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
    countDown () {
      if (this.#time <= 0) {
        this.stopCountDown()

        this.dispatchEvent(new CustomEvent('timesup', {
          detail: this.#totalTime,
          bubbles: true,
          composed: true
        }))
        return
      }

      if (this.#time <= 3) {
        this.timerContainer.classList.add('warning')
      }

      this.updateDisplay()
      this.#totalTime++
      this.#time--
      this.#timer = setTimeout(() => this.countDown(), 1000)
    }

    /**
     * Updates the timer display.
     *
     */
    updateDisplay () {
      this.countdownDisplay.textContent = this.#time
      this.totalTimeDisplay.textContent = this.#totalTime
    }

    /**
     * Stops the counter.
     */
    stopCountDown () {
      if (this.#timer) {
        clearTimeout(this.#timer)
        this.#timer = null
      }
      this.#time = null
      this.timerContainer.classList.remove('warning')
      this.updateDisplay()
    }

    /**
     * Rests the timer and counter for the elapsed time to default values.
     *
     */
    reset () {
      this.#totalTime = 0
      this.#time = 20
    }
  }
)
