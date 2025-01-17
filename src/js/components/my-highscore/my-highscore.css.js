export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
    /* Flexbox för att centrera allt inom webkomponenten */
    :host {
        display: flex;
        flex-direction: column;
        align-items: center; 
        font-size: 16px;
    }

    ol {
        display: block;
        width: 100%;
        padding: 0;
        margin: 0;
        list-style-position: inside;
    }
    li {
        margin: 7px;
        padding: 10px 20px;
        border-radius: 20px;
    }

    button {
        align-self: flex-end;
        margin: 10px 20px;
        padding: 10px;
        color: white;
        background-color: orange;
        border: none;
        transition: ease 0.2s;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.7rem;
    }

    button:hover {
        background-color: #ffc358;
    }

    h1 {
      margin-bottom: 10px;
      padding: 0;
    }

    h2 {
      margin: 0 0 20px 0;
      font-weight: 200;
      padding: 0;
      font-size: 0.9rem; 

    }
</style>`
