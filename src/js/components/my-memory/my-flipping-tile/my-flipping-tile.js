/**
 * @description This module defines a web component representing a flipping tile.
 */

import { cssTemplate } from './my-flipping-tile.css.js'
import { htmlTemplate } from './my-flipping-tile.html.js'

customElements.define('my-flipping-tile',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * AbortController instance.
     *
     * @type {AbortController}
     */
    #abortController

    /**
     * The element representing the tile.
     */
    #tile

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.#abortController = new AbortController()

      // Get the tile element in the shadow root.
      this.#tile = this.shadowRoot.querySelector('#tile')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.addEventListener('click', (event) => {
        if (event.button === 0 &&
              event.buttons < 2 &&
              !event.altKey &&
              !event.ctrlKey &&
              !event.metaKey &&
              !event.shiftKey) {
          this.#flip()
        }
      }, {
        signal: this.#abortController.signal
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if ((name === 'disabled' || name === 'hidden') &&
        oldValue !== newValue) {
        const isPresent = Boolean(newValue) || newValue === ''

        if (isPresent) {
          this.#tile.setAttribute('disabled', '')
          this.blur()
        } else {
          this.#tile.removeAttribute('disabled')
        }
      }
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['face-up', 'disabled', 'hidden']
    }

    /**
     * Flips the current instance, if it is not disabled.
     */
    #flip () {
      if (this.hasAttribute('disabled') ||
        this.hasAttribute('hidden')) {
        return
      }

      this.hasAttribute('face-up')
        ? this.removeAttribute('face-up')
        : this.setAttribute('face-up', '')
    }
  }
)
