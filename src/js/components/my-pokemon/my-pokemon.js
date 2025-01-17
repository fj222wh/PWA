/**
 * @description This is the webcomponent for the window.
 * @module my-window
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */
import { cssTemplate } from './my-pokemon.css.js'
import { htmlTemplate } from './my-pokemon.html.js'

customElements.define('my-pokemon',

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
     * Creates an instance of my-window component.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      // Abortcontroller
      this.#abortController = new AbortController()

      this.button = this.shadowRoot.querySelector('#pokemonBtn')

      this.img = this.shadowRoot.querySelector('#pokemonSprite')

      this.input = this.shadowRoot.querySelector('#pokemonName')

      this.card = this.shadowRoot.querySelector('#card')

      this.dataHeight = this.shadowRoot.querySelector('#data-height')
      this.dataWeight = this.shadowRoot.querySelector('#data-weight')
      this.dataID = this.shadowRoot.querySelector('#data-id')
      this.dataXP = this.shadowRoot.querySelector('#data-xp')

      this.name = this.shadowRoot.querySelector('#name')

      this.instruction = this.shadowRoot.querySelector('#instruction')
    }

    /**
     * When the element is added to the DOM.
     */
    connectedCallback () {
      this.button.addEventListener('click', (event) => {
        this.fetchPokemon()
      })
    }

    /**
     * When the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Fetch the pokemons.
     */
    async fetchPokemon () {
      /**
       *
       */
      try {
        const pokemonName = this.input.value.toLowerCase()

        if (pokemonName === '') {
          alert('You have to enter a name!')
          return
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok) {
          alert('Something went wrong! You might have entered an incorrect name, try again!')
        }

        const data = await response.json()

        console.log(data)

        this.card.classList.remove('hidden')
        const pokemonSprite = data.sprites.front_default

        this.img.src = pokemonSprite
        this.img.style.display = 'block'
        this.img.style.width = '200px'

        this.dataWeight.textContent = data.weight
        this.dataHeight.textContent = data.height
        this.dataID.textContent = data.id
        this.dataXP.textContent = data.base_experience
        this.name.textContent = data.name

        this.instruction.classList.add('hidden')
      } catch (error) {
        console.error(error)
      }
    }
  })
