export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
<form>
  <label for="nicknameInput">Enter your username: </label>
  <input type="text" placeholder="Your username" id="nicknameInput" required autofocus>
  <button type="submit" id="submit">Start</button>
</form>
`
