export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
    :host {
      display: block;
      /* border: solid red 5px; */
      padding: 5px;
      width: 100%;
      box-sizing: border-box;
    }

    #answer-container {
      display: block;
      width: 100%;

    }

  .option {
    background-color: #f7a241;
    padding: 15px;
    margin: 10px 0;
    transition: 0.2s ease;
    color: white;
    width: 100%;
    display: block;
    box-sizing: border-box;
  }

  #option-container {
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
  }

  .option:hover {

    background-color: #ffc582;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  input[type="radio"]:focus + label {
  background-color: #ffc582;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 5px; /* Lägg till för att göra det mer visuellt */
}


  #question {
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 10px 0;
    padding: 0;

  }

  input[type="radio"] {
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    box-sizing: border-box;
  }


  label {
  display: block;
  width: 100%;
  padding: 5px;
  cursor: pointer;
}

input[type="text"] {
  padding: 10px;
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
    font-size: 0.7rem;
    margin: 10px;
  }

  button:hover {
    background-color: #ffc358 ;
    border-color: #ffc358 ;
}
</style>`
