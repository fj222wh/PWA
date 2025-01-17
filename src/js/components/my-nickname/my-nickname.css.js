export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  label {
    display: block;
    margin-bottom: 20px;
  }

  input {
    padding: 10px;
    border: lightgrey 1px solid;
  }

  button {
    padding: 10px 15px;
    background-color: orange;
    border: orange 1px solid;
    text-transform: uppercase;
    color: white;
    font-weight: 600;
    transition: ease 0.2s;
    cursor: pointer;
  }

  button:hover {
    background-color: #ffc358 ;
    border-color: #ffc358 ;
}
</style>`
