export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #start {
    padding: 10px 10px 0 10px;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    box-sizing: border-box;
  }

  #start h1 {
    margin: 10px 0;
  }

  #container {
    width: 400px;
    height: 550px;
    background-color: white;
  }

  button {
    margin-top: 5px;
    background-color: pink;
    padding: 5px;
    transition: all ease 0.5s;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
  }

  input {
    padding: 5px;
  }

  button:hover {
    box-shadow: 3px 3px 3px grey;
  }

  #card {
    margin-top: 20px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
  }

  img {
    align-self: center;
  }

  #name {
    align-self: center;
  }

  .hidden {
    display: none !important;
  }

  #data {
    margin-left: 40px;
    font-family: Arial;
  }

  #data p {
    font-weight: 900;
  }

  span {
    font-weight: 400;
  }

  #instruction {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 400px;
    padding: 20px 60px;
    font-family: Arial;
  }

  #instruction p {
    text-align: center;
  }

  #instruction ul {
    padding: 20px;
    background-color:rgb(242, 242, 242);
    margin: 20px;
  }

  #instruction ul li {
    margin: 10px;
  }




</style>
`
