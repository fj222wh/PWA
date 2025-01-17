export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>

    :host {
        width: 100vh;
        font-size: 16px;
        height: 100vw;
        overflow: hidden;
    }

    #status-bar {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom: solid 0.5px rgb(130, 130, 130);
        top: 0;
        right: 0;
        left: 0;
        position: absolute;
    
    }

    #apple-icon {
        font-size: 1rem;
    }

    #status-bar > div {
        display: flex;
    }

    #status-bar > :first-child > p {
        cursor: pointer;
        padding: 4px 12px;
    }

    #status-bar > :first-child > p:hover {
        background-color:rgb(234, 234, 234);
        border-radius: 5px;
    } 

    p {
        margin: 0;
        font-family: 'Arial';
        font-weight: 100;
        font-size: 0.9rem;

    }

    #status-bar div > * {
        padding: 0 12px 0 12px;
    }

    @media screen and (max-width: 600px) {

        #status-bar {
            justify-content: flex-end;
        }
        #status-bar #status-bar-options {
            display: none;
        }
    }
</style>
`
