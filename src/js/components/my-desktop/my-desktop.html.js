export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
    <div id="desktop" part="desktop-background">
    <my-desktop-status-bar id="status-bar"></my-desktop-status-bar>

    <div id="dock">
        <button class="app" id="app1" part="app1"></button>
        <button class="app" id="app2" part="app2"></button>
        <button class="app" id="app3" part="app3"></button>
        <button class="app" id="app4" part="app4"></button>
    </div>
</div>

`
