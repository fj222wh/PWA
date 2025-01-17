export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :host {
        background-color:rgb(32, 32, 32);
        display: flex;
        width: 500px;
        height: 400px;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        user-select: none;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    #container {
        width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        padding: 12px;
        position: relative;
        background-color:rgb(249, 249, 249);
    }


    #chat-display {
        background-color: white;
        flex-grow: 1;
        height: 100%;
        min-height: 200px;
        overflow-y: auto;
        border-radius: 5px;
    }

    #textarea-container {
        display: flex;
        margin-top: 10px;
    }

    textarea {
        width: 100%;
        border: none;
        overflow-y: scroll;
        resize: none;
        background-color:rgb(255, 255, 255);
        border-radius: 10px;
        line-height: 1.4;
        padding: 10px;
        font-family: Arial;
        font-size: 0.8rem;
    }

    textarea::placeholder {
        color: grey;
        font-family: Arial;
        font-size: 0.8rem;
    }

    button {
        margin-left: 5px;
        height: 40px;
        align-self: center;
        border-radius: 5px;
        border: none;
        transition: all 0.2s ease;
        cursor: pointer;
        text-transform: uppercase;
        color: white;
        font-weight: 900;
    }

    .message {
        align-self: right;
        background-color:#1198f3;
        border-radius: 20px;
        padding: 7px 12px;
        color: white;
        font-family: Arial;
        font-size: 0.9rem;
        position: relative;
        flex-wrap: wrap;
        max-width: 65%;
        width: fit-content;
        margin: 12px;
    }

    .messageSent::after {
        content: "";
        position: absolute;
        bottom: -5px; 
        right: 10px;  
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 1px solid transparent;
        border-top: 7px solid rgb(66, 129, 255);
    }

    .messageRecieved::after {
        content: "";
        position: absolute;
        bottom: -5px; 
        left: 10px;  
        width: 0;
        height: 0;
        border-left: 1px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid rgb(239, 239, 239);
    }

    .messageSent {
        background-color: rgb(66, 129, 255);
        margin-left: auto;

    }

    .messageRecieved {
        background-color: rgb(239, 239, 239);
        margin-right: auto;
        color: black;
    }

    .hidden {
        display: none !important;
    }

    #username-form {
        margin: 20px;
        background-color:pink;
        padding: 40px;
        border-radius: 20px;
    }

    .serverMessage {
        margin: 10px;
        background-color: none;
        color: #bebebebe;
        font-size: 0.7rem;
        font-family: Arial;
    }

    #buttons {
        display: flex;
        margin: 5px;

    }

    #send-btn {
        padding: 10px;
        background-color:rgb(164, 164, 164);
        transition: all ease 0.2s;
        background-color: rgb(255, 168, 184);
    }

    #send-btn:hover {
        background-color: pink;
    }

    #emoji-btn {
        width: fit-content;
        background-color: none;
        font-size: 1.2rem;
        padding: 0 5px;
        margin: auto;
    }

    #emoji-ul {
        list-style: none;
        background-color:rgb(241, 241, 241);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        position: absolute;
        bottom: 85px;
        right: 19px;
        width: 260px;
        height: 200px;
        padding: 10px;
        border-radius: 10px;
        overflow-y: auto;
        justify-content: center;
        user-select: none;
    }

    #emoji-btn:hover {
        background-color:rgb(225, 225, 225);
    }

    #emoji-ul li {
        display: block;
        font-size: 1.2rem;
        width: fit-content;
        padding: 2px 5px;
        border-radius: 10px;
        transition: all ease 0.2s;
    }

    #emoji-ul li:hover {
        background-color:rgba(184, 184, 184, 0.45);
    }

    .hidden {
        display: none;
    }
</style>
`
