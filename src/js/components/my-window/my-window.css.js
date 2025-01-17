export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
    :host {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: fit-content;
        min-width: fit-content; 
        resize: auto; 
    }

    #window {
        position: absolute;
        border: solid 4px rgb(226, 226, 226);
        overflow: hidden;
        border-radius: 5px;
    }

    slot {
        width: 100%;
        height: 100%;
        flex-grow: 1;
    }

    p {
        margin: 0;
    }

    button {
        user-select: none;
        height: 20px;
        border: none;
        background-color: white;
        color: lightgrey;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    button:hover {
        background-color:rgb(220, 220, 220);
        color:rgb(255, 255, 255);
    }

    #title-bar {
        cursor: grab;
        display: flex;
        box-sizing: border-box;
        background-color:rgb(245, 245, 245);
        height: 30px;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        border-radius: 2px;
    }

    #title-bar > * {
        margin: 10px;
    }

   #content {
        box-sizing: border-box;
        pointer-events: auto;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    } 
</style>
`
