/**
 * @description This is the webcomponent for the desktop.
 * @module my-desktop
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-desktop.css.js'
import { htmlTemplate } from './my-desktop.html.js'

/**
 *
 */
customElements.define('my-desktop',
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
     * The last position of when a new subapp were created
     */
    #lastPosition
    /**
     * The constructor.
     */

    /**
     * Global z-index
     */
    #zIndex

    /**
     * Creates an instance of the desktop component.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      // Our apps
      this.customAppIcon = this.shadowRoot.querySelector('#app1')
      this.chatAppIcon = this.shadowRoot.querySelector('#app2')
      this.memoryAppIcon = this.shadowRoot.querySelector('#app3')
      this.calculatorAppIcon = this.shadowRoot.querySelector('#app4')

      this.desktop = this.shadowRoot.querySelector('#desktop')

      this.#abortController = new AbortController()

      this.#lastPosition = { x: 50, y: 70 }

      this.#zIndex = 100
    }

    /**
     * When the element is added to the DOM.
     */
    connectedCallback () {
      this.customAppIcon.addEventListener('click', (event) => {
        const app = document.createElement('my-app')
        this.openApp(app)
      }, { signal: this.#abortController.signal })

      this.chatAppIcon.addEventListener('click', (event) => {
        const app = document.createElement('my-chat')
        this.openApp(app)
      }, { signal: this.#abortController.signal })

      this.memoryAppIcon.addEventListener('click', (event) => {
        const app = document.createElement('my-memory')
        this.openApp(app)
      }, { signal: this.#abortController.signal })

      this.calculatorAppIcon.addEventListener('click', (event) => {
        const app = document.createElement('my-pokemon')
        this.openApp(app)
      }, { signal: this.#abortController.signal })

      this.desktop.addEventListener('windowActive', (event) => {
        // console.log('Vi har lyssnat på window active!!')
        this.focusOnWindow(event)
      })
    }

    /**
     * When the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Open an app.
     *
     * @param {Element} app - The element we want to slot to the window
     */
    openApp (app) {
      const window = document.createElement('my-window')

      if (this.desktop.childElementCount === 0) {
        this.#lastPosition.x = 70
        this.#lastPosition.y = 100
      } else {
        this.#lastPosition.x += 5
        this.#lastPosition.y += 5
      }

      window.style.position = 'absolute'
      window.style.left = `${this.#lastPosition.x}px`
      window.style.top = `${this.#lastPosition.y}px`

      const subApplication = app
      window.appendChild(subApplication)

      this.#zIndex++
      window.style.zIndex = this.#zIndex

      this.desktop.appendChild(window)
    }

    /**
     * Sets the focus when clicking on a window.
     *
     * @param {Event} event - The event triggering this
     */
    focusOnWindow (event) {
      const currentZindex = window.getComputedStyle(event.target).zIndex

      // console.log('det här är elementets z-index:' + currentZindex + 'och det här är det globala index:' + this.#zIndex)

      if (currentZindex !== this.#zIndex.toString()) {
        this.#zIndex++
        event.target.style.zIndex = this.#zIndex
      }
    }
  })
