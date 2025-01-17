/**
 * @description This is the webcomponent for the chat application.
 * @module my-chat
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */
import { cssTemplate } from './my-chat.css.js'
import { htmlTemplate } from './my-chat.html.js'
import emojilib from 'emojilib'
/**
 *
 */
customElements.define('my-chat',

  /**
   *
   */
  class extends HTMLElement {
    #abortController
    #keyAPI = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    #channel = 'my, not so secret, channel'
    #id = '1ir3o2jio'
    /**
     * The constructor.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.sendBtn = this.shadowRoot.querySelector('#send-btn')

      this.chatDisplay = this.shadowRoot.querySelector('#chat-display')

      this.textArea = this.shadowRoot.querySelector('#textarea')
      this.sender = localStorage.getItem('username')

      this.submitUsernameBtn = this.shadowRoot.querySelector('#submitUsername')
      this.usernameInput = this.shadowRoot.querySelector('#username')

      this.form = this.shadowRoot.querySelector('#username-form')
      this.container = this.shadowRoot.querySelector('#container')

      this.emojiBtn = this.shadowRoot.querySelector('#emoji-btn')
      this.emojiContainer = this.shadowRoot.querySelector('#emoji-ul')

      this.#abortController = new AbortController()
    }

    /**
     * What happens when the element is added to the DOM.
     */
    connectedCallback () {
      this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      // Check if we have any saved sender from local storage or not, if don't have any sender we will show the user the form
      if (this.sender !== null) {
        this.form.classList.add('hidden')
        this.container.classList.remove('hidden')
        const h1 = this.shadowRoot.querySelector('#welcome')
        h1.textContent = `Welcome to the chat ${this.sender}!`
      }

      this.sendBtn.addEventListener('click', (event) => {
        if (this.textArea.value !== '') {
          this.sendBtn.disabled = true
          this.sendText()
        }
      }, { signal: this.#abortController.signal })

      this.textArea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          if (this.textArea.value === '') {
            event.preventDefault()
            return
          }
          event.preventDefault()
          // console.log('You clicked on the submit button!! from enter')
          this.sendText()
        }
      }, { signal: this.#abortController.signal })

      this.socket.addEventListener('message', (event) => {
        // console.log('this is the data we got!!!')
        // console.log(event.data)

        // Ignore messages with the type heartbeat
        const data = JSON.parse(event.data)
        if (data.type === 'heartbeat') {
          return
        }

        data.timestamp = new Date().toISOString()

        // console.log(data)

        const newMessage = document.createElement('p')

        if (data.id === this.#id) {
          newMessage.classList.add('message')
          newMessage.classList.add('messageSent')
        } else {
          if (data.username === 'The Server') {
            newMessage.classList.add('serverMessage')
          } else {
            newMessage.classList.add('message')
            newMessage.classList.add('messageRecieved')
          }
        }

        newMessage.textContent = `${data.username}: ${data.data}`

        this.chatDisplay.appendChild(newMessage)

        this.chatDisplay.scrollTop = this.chatDisplay.scrollHeight
      }, { signal: this.#abortController.signal })

      this.submitUsernameBtn.addEventListener('click', (event) => {
        event.preventDefault()

        const username = localStorage.getItem('username')

        if (username === null) {
          const username = this.usernameInput.value
          localStorage.setItem('username', username)
          this.sender = localStorage.getItem('username')

          // console.log('Saved the username in local storage!!')

          const h1 = this.shadowRoot.querySelector('#welcome')
          h1.textContent = `Welcome to the chat ${username}!`
          // Save the username to local storage.

          // Hide the form and show the chat...
          this.form.classList.add('hidden')
          this.container.classList.remove('hidden')
        }
      }, { signal: this.#abortController.signal })

      this.emojiBtn.addEventListener('click', (event) => {
        this.emojiContainer.classList.toggle('hidden')
      }, { signal: this.#abortController.signal })

      this.textArea.addEventListener('focus', (event) => {
        this.emojiContainer.classList.add('hidden')
      }, { signal: this.#abortController.signal })

      // this.renderEmojies()

      this.emojiContainer.addEventListener('click', (event) => {
        // console.log('Du klickade på emoji container!!')
        // console.log(event.target.textContent)
        if (event.target.tagName === 'LI') {
          this.textArea.value += event.target.textContent
        }
      }, { signal: this.#abortController.signal })

      this.renderEmojies()
    }

    /**
     * What happens when the element is removed to the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Renders the emojies we got.
     */
    renderEmojies () {
      // console.log('This is our array of emojis')
      // console.log(emojilib)

      const emojiList = Object.keys(emojilib)

      emojiList.forEach(emoji => {
        const newEmoji = document.createElement('li')
        newEmoji.textContent = emoji
        this.emojiContainer.appendChild(newEmoji)
      })
    }

    /**
     * Sends the text.
     */
    sendText () {
      if (this.textArea.value === '') {
        return
      }

      const data = {
        type: 'message',
        data: this.textArea.value,
        username: this.sender,
        channel: this.#channel,
        key: this.#keyAPI,
        timestamp: new Date().toISOString(),
        id: this.#id
      }

      // console.log('This is the data we sent:')
      // console.log(data)

      this.socket.send(JSON.stringify(data))

      this.textArea.value = ''
      this.chatDisplay.scrollTop = this.chatDisplay.scrollHeight
      this.textArea.focus()
      this.sendBtn.disabled = false
    }
  })
