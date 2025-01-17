# `<my-chat>`

A web component that provides a fully functional chat application with support for real-time messaging, emoji selection, and customizable usernames.

## Attributes

This component does not expose any public attributes.

## Events

This component does not fire any custom events directly.

## Features

- **Real-time Messaging:** Supports WebSocket communication for sending and receiving messages in real time.
- **User Management:** Allows users to set their username, stored locally in `localStorage`.
- **Emoji Support:** Includes a button to toggle an emoji selector and add emojis to messages.
- **Message Display:** Differentiates between sent, received, and server messages with distinct styles.

## Methods

### `renderEmojies()`

Renders a list of available emojis in the emoji container.

- **Description:** Fetches a list of emojis from the `emojilib` library and creates an emoji selector.

### `sendText()`

Sends the content of the text area as a message through the WebSocket.

- **Description:** Prepares a message object with user data, channel, and content, then sends it via WebSocket.

## Example

```html
<my-chat></my-chat>
