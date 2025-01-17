export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
  <div id="window">
    <div id="title-bar">
      <button id="close-btn" class="close">X</button>
    </div>
    <div id="content">
      <slot></slot>
    </div>
  </div>
`
