/**
 * @description This is the webcomponent for the desktop's status bar.
 * @module my-desktop-status-bar
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-desktop-status-bar.css.js'
import { htmlTemplate } from './my-desktop-status-bar.html.js'
/**
 *
 */
customElements.define('my-desktop-status-bar',

  /**
   *
   */
  class extends HTMLElement {
  /**
   * The constructor.
   */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.timeDisplay = this.shadowRoot.querySelector('#timeDisplay')
    }

    /**
     * What happens when the element is added to the DOM.
     */
    connectedCallback () {
      this.displayTime()
    }

    /**
     * Displays the time.
     */
    displayTime () {
      const time = new Date()
      this.timeDisplay.setAttribute('datetime', time.toISOString())

      const day = time.toLocaleString('en-US', { weekday: 'short' })

      const month = time.toLocaleString('en-US', { month: 'short' })
      this.timeDisplay.textContent = `${day} ${month} ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`

      setTimeout(() => this.displayTime(), 1000)
    }
  })
