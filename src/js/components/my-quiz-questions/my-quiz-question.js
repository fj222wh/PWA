/**
 * @description The webcomponent for presenting the quiz questions.
 * @module my-memory
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-quiz-question.css.js'
import { htmlTemplate } from './my-quiz-question.html.js'

customElements.define('my-quiz-question',
  /**
   *
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {object}
     * The abort controller object.
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

      this.question = this.shadowRoot.querySelector('#question')
      this.optionContainer = this.shadowRoot.querySelector('#option-container')
      this.submit = this.shadowRoot.querySelector('button[type="submit"]')

      this.#abortController = new AbortController()
    }

    /**
     * When the element is added to the DOM.
     */
    connectedCallback () {
      this.optionContainer.addEventListener('submit', (event) => {
        event.preventDefault()

        const textInput = this.shadowRoot.querySelector('input[type="text"]')

        console.log(textInput.value)
        const selectedEvent = new window.CustomEvent('answerSubmitted', {
          detail: {
            answer: textInput.value
          },
          bubbles: true,
          composed: false
        })

        this.dispatchEvent(selectedEvent)
      }, { signal: this.#abortController.signal })

      this.optionContainer.addEventListener('click', (event) => {
        if (event.target.type === 'radio') {
          // console.log(`Du valde: ${event.target.value}`)

          const selectedEvent = new window.CustomEvent('answerSubmitted', {
            detail: {
              answer: `${event.target.value}`
            },
            bubbles: true,
            composed: false
          })

          this.dispatchEvent(selectedEvent)
        }
      }, { signal: this.#abortController.signal })

      this.optionContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          if (event.target.type === 'radio' || event.target.type === 'text') {
            const selectedEvent = new window.CustomEvent('answerSubmitted', {
              detail: {
                answer: `${event.target.value}`
              },
              bubbles: true,
              composed: false
            })

            this.dispatchEvent(selectedEvent)
          }
        }

        const radios = Array.from(this.optionContainer.querySelectorAll('input[type="radio"]'))
        const currentIndex = radios.indexOf(event.target)

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          const nextIndex = (currentIndex + 1) % radios.length
          radios[nextIndex].focus()
          event.preventDefault()
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          const prevIndex = (currentIndex - 1 + radios.length) % radios.length
          radios[prevIndex].focus()
          event.preventDefault()
        }
      }, { signal: this.#abortController.signal })
    }

    /**
     * Remove eventlisteners when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Creates the input elements based on the question we got.
     *
     * @param {object} data - The data we got from the server
     */
    createInputElements (data) {
      const question = data.question

      this.question.textContent = question
      if ('alternatives' in data) {
        const alternatives = data.alternatives

        const alternativesValues = Object.values(alternatives)
        const alternativesKeys = Object.keys(alternatives)

        if (alternativesKeys < 2 || alternativesKeys > 10) {
          throw new Error('The number of alternatives has to be betwwen 2 and 10.')
        }

        // Loop through all of the options we got from the answer to create the input element for each option.

        for (let i = 0; i < alternativesValues.length; i++) {
          const label = document.createElement('label')
          label.classList.add('option')
          label.setAttribute('for', `alt${i + 1}`)

          const inputRadio = document.createElement('input')
          inputRadio.setAttribute('type', 'radio')
          inputRadio.setAttribute('name', 'options')
          inputRadio.setAttribute('tabindex', '0')
          inputRadio.setAttribute('id', `alt${i + 1}`)
          inputRadio.value = alternativesKeys[i]

          const altText = document.createTextNode(alternativesValues[i])

          label.append(inputRadio)
          label.appendChild(altText)
          this.optionContainer.append(label)

          if (i === 0) {
            setTimeout(() => { inputRadio.focus() }, 0)
          }
        }
      } else {
        const form = document.createElement('form')
        const textInput = document.createElement('input')
        textInput.setAttribute('type', 'text')
        textInput.setAttribute('required', '')
        textInput.setAttribute('tabIndex', '0')
        const submitButton = document.createElement('button')
        const submitButtonText = document.createTextNode('Submit Answer')
        submitButton.appendChild(submitButtonText)
        submitButton.setAttribute('type', 'submit')
        form.appendChild(textInput)
        form.appendChild(submitButton)
        this.optionContainer.appendChild(form)

        setTimeout(() => { textInput.focus() }, 0)
      }
    }

    /**
     * Clears all of the child elements in the option container.
     */
    clear () {
      while (this.optionContainer.firstChild) {
        this.optionContainer.removeChild(this.optionContainer.firstChild)
      }
    }
  }

)
