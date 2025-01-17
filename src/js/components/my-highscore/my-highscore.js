/**
 * @description The webcomponent for presenting the high score list.
 * @module my-highscore
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-highscore.css.js'
import { htmlTemplate } from './my-highscore.html.js'

customElements.define('my-highscore',
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
     * Creates the highscore element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.playAgainBtn = this.shadowRoot.querySelector('button')
      this.highScoreList = this.shadowRoot.querySelector('#highscorelist')

      this.#abortController = new AbortController()
    }

    /**
     * This will happen when the component is added to the DOM.
     */
    connectedCallback () {
      this.playAgainBtn.addEventListener('click', (event) => {
        const playAgainEvent = new CustomEvent('playAgain', {
          bubbles: true,
          composed: true
        })

        event.preventDefault()
        this.dispatchEvent(playAgainEvent)
      }, { signal: this.#abortController.signal })
    }

    /**
     * The eventlistener will be removed when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Presents the highscore list.
     *
     * @param {Array} highscore - The highscore list which should be rendered.
     */
    render (highscore) {
      this.highScoreList.replaceChildren()

      for (let i = 0; i < highscore.length; i++) {
        const player = highscore[i]

        const li = document.createElement('li')
        const text = document.createTextNode(`${player.nickname} (${player.score}s)`)
        li.appendChild(text)
        this.highScoreList.appendChild(li)
      }
    }
  }
)
