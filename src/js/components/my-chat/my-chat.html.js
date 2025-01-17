export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
<div id="username-form">
    <form>
        <label for="username">Enter your username:
        <input type="text" id="username">
        <button type="submit" id="submitUsername">Log In</button>
    </form>
</div>

<div id="container" class="hidden">
    <h1 id="welcome">Welcome to the chat</h1>

    <!-- The messages will be displayed here: -->
    <div id="chat-display">

    </div>

    <!-- Here is the textarea -->
    <div id="textarea-container">
        <textarea name="textarea" id="textarea" placeholder="Write your message here..." required></textarea>
        <ul id="emoji-ul" class="hidden"></ul>
        <div id="buttons">
            <button id="emoji-btn">😀</button>
            <button type="submit" id="send-btn">Send</button>
        </div>
    </div>  
</div>
`
