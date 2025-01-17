/**
 * @description The webcomponent for the nickname.
 * @module my-nickname
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-nickname.css.js'
import { htmlTemplate } from './my-nickname.html.js'

customElements.define('my-nickname',
  /**
   * The webcomponent for the nickname input.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {object}
     * The abortcontroller object.
     */
    #abortController
    /**
     * Creates the custom element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.submitButton = this.shadowRoot.querySelector('#submit')
      this.nickname = this.shadowRoot.querySelector('#nicknameInput')

      this.form = this.shadowRoot.querySelector('form')

      this.#abortController = new AbortController()
    }

    /**
     * What will happen when this element is added to the DOM.
     */
    connectedCallback () {
      this.form.addEventListener('submit', (event) => {
        event.preventDefault()

        const nicknameSubmittedEvent = new window.CustomEvent('nicknameSubmitted', {
          detail: { nickname: this.nickname.value },
          bubbles: true,
          composed: false
        })
        this.dispatchEvent(nicknameSubmittedEvent)

        this.nickname.value = ''
      }, { signal: this.#abortController.signal })
    }

    /**
     * Remove the eventlistener when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }
  }
)
