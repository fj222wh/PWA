export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :host {
        user-select: none;
    }


    h1 {
        color: pink;
    }
    #start {
        background-color: white;
        display: block;
        width: 600px;
        height: 450px;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #game-options {
        margin-top: 10px;
        width: fit-content;
    }

    /** All of the buttons */
    button {
        margin: 10px;
        border: none;
        border-radius: 20px;
        transition: all ease 0.5s;
        text-transform: uppercase;
        font-size: 0.7rem;
        font-weight: 600;
        padding: 10px;
        cursor: pointer;
    }

    button:hover {
        color: white;
    }

    #easy:hover {
        background-color: green;
    }

    #medium:hover {
        background-color: #ffbb33;
    }

    #hard:hover {
        background-color: #da0404;
    }

    #endGameBtns {
        margin: 20px;
    }

    #playAgain:hover {
        background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%);
    }

    #changeLevel:hover {
        background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%);
    }

    #backToStart {
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 900;
        font-size: 0.7rem;
        padding: 5px 15px;
        letter-spacing: 2px;
        border-radius: 1px;
    }

    #backToStart:hover {
        background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%);
    }


    #gameboard {
        background-color: white;
        width: 600px;
        height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }


    #game-options button {
        padding: 10px 20px;
        font-size: 1rem;
        padding: 10px 30px;
    }

    #memoryGame {
        width: fit-content;
        height: fit-content;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
        gap: 10px;
    }

    #stats {
        display: flex;
        flex-wrap: wrap;
    }

    #stats p {
        font-family: Arial;
        color: pink;
        padding: 10px;
        width: 150px;
        border: 2px solid pink;
        margin: 5px;
    }

    #end {
        width: 600px;
        height: 450px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .hidden {
        display: none !important;
    }

    #rules {
        margin: 20px;
        text-align: center;
        font-family: Arial;
        font-size: 0.9rem;
    }


</style>
`
