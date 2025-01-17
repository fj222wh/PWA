/**
 * @description This is the webcomponent for the window.
 * @module my-window
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */
import { cssTemplate } from './my-window.css.js'
import { htmlTemplate } from './my-window.html.js'

customElements.define('my-window',

  /**
   *
   */
  class extends HTMLElement {
    #zIndex = 1000
    /**
     * @private
     * @type {object}
     * The abortcontroller object.
     */
    #abortController
    /**
     * Creates an instance of my-window component.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      // Abortcontroller
      this.#abortController = new AbortController()

      // HTML Element
      this.closeBtn = this.shadowRoot.querySelector('#close-btn')
      this.titleBar = this.shadowRoot.querySelector('#title-bar')
    }

    /**
     * When the element is added to the DOM.
     */
    connectedCallback () {
      this.closeBtn.addEventListener('click', (event) => {
        event.stopPropagation()
        this.remove()
      }, { signal: this.#abortController.signal })

      this.addEventListener('click', (event) => {
        const windowActive = new CustomEvent('windowActive', {
          bubbles: true,
          detail: { element: event.target }
        })
        this.dispatchEvent(windowActive)
      }, { signal: this.#abortController.signal })

      // Draggable window
      this.titleBar.addEventListener('mousedown', (event) => {
        const parentElement = this.shadowRoot.getElementById('window')

        // The inital top and left positions of the window.
        const startLeft = parseInt(window.getComputedStyle(parentElement).left, 10) || 0
        const startTop = parseInt(window.getComputedStyle(parentElement).top, 10) || 0

        // The mouse start position.
        const startX = event.clientX
        const startY = event.clientY

        /**
         * Update the elements positon.
         *
         * @param {MouseEvent} event - The.
         */
        function moveElement (event) {
          // Caculate the distance the mouse has moved, both in X and Y. The distance it has moved is the distance the element will move, and we will be able to set a new left and top to the window-element since it has a position of absolute.
          const pixelsMovedX = event.clientX - startX
          const pixelsMovedY = event.clientY - startY

          const newLeftPosition = startLeft + pixelsMovedX
          const newTopPosition = startTop + pixelsMovedY

          parentElement.style.left = `${newLeftPosition}px`
          parentElement.style.top = `${newTopPosition}px`
        }

        /**
         * Stop moving.
         */
        function stopMovingElement () {
          window.removeEventListener('mousemove', moveElement)
          window.removeEventListener('mouseup', stopMovingElement)
        }

        window.addEventListener('mousemove', moveElement)
        window.addEventListener('mouseup', stopMovingElement)

        event.preventDefault()
      }, { signal: this.#abortController.signal })
    }

    /**
     * When the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }
  })
