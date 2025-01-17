/**
 * @file The HTML template for tile component
 * @module my-flipping-tile.html.js
 * @author Filippa Johansson
 */

// Define the HTML template.
export const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = `
  <button part="tile-main" id="tile">
    <div part="tile-front" id="front">
      <slot></slot>
    </div>
    <div part="tile-back" id="back"></div>
  </button>
`
