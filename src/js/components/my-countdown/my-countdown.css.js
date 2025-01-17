export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
        :host {
          max-width: 700px;
          font-size: 0.8rem;
          padding: 5px 10px;
          font-family: 'Arial';
        }

        #container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        p {
          padding: 10px;
          width: 120px;
          margin: 5px;
          border: solid 2px orange;
        }

        #totalTime {
          background-color: lightgrey;
          color: white;
          border: none;
          border: solid 2px lightgrey;
        }

        .warning {
          color: red;
          border-color: red;
        }
</style>`
