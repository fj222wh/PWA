export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
<div id="container">
  <p id="timer">Remaining time: <span id="countdownDisplay"></span></p>
  <p id="totalTime">Total time: <span id="totalTimeDisplay"></span></p>
</div>
`
