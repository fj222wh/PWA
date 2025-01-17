export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
    {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    :host {
        width: 100%;
        height: 100%;
    }

    #desktop {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: -10000;
    }

    #dock {
        margin: 0 auto;
        box-sizing: border-box;
        width: 80%;
        height: 80px;
        background: rgba(245, 245, 245, 0.58);
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        color: white;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 20px;
        border: solid 0.3px  rgba(239, 239, 239, 0.1);
        margin-bottom: 5px;
    }

    my-desktop-status-bar {
        position: absolute;
        top: 0;
        z-index: -1000;
        user-select: none;
        width: 100%;
    }

    .app {
        width: 60px;
        height: 60px;
        background-color: white;
        margin: 10px;
        border-radius: 10px;
        transition: all ease 0.2s;
        cursor: pointer;
        border: none;
    }

    .app:hover {
        box-shadow: 5px 5px 5px rgba(35, 35, 35, 0.31);

    } 

    #app1 {
        background-color: purple;
    }

    #app2 {
        background-color: pink;
    }

    #app3 {
        background-color: lightblue;
    }
</style>
`
