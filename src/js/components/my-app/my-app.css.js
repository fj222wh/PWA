export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
        :host {
            width: 500px;
            height: 410px;
            padding: 50px;
            background-color: white;
        }
        
        my-quiz-question {
          height: 340px;
          margin: auto;
        }

        my-nickname {
          margin: 150px auto 0;
          width: 100%;
          height: 100%;
        
        }

        .hidden {
          display: none;
        }
</style>`
