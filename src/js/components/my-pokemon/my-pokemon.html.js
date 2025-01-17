export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
 <div id="container">
    <div id="start">
        <h1>Pokéindex</h1>
        <input type="text" id="pokemonName" placeholder="Enter a pokemonname">
        <button id="pokemonBtn">Fetch Pokemon</button><br>
    </div>
        <div id="card" class="hidden">
          <h1 id="name"></h2>
          <img src="" alt="Pokemon" id="pokemonSprite" style="display: none;">

          <div id="data">
          <p>ID: <span id=data-id></span></p>
            <p>Height: <span id=data-height></span></p>
            <p>Weight: <span id=data-weight></span></p>
            <p>Base XP: <span id=data-xp></span></p>
          </div>  
        </div>

        <div id="instruction">
          <p>✨ Search for a pokémon by name or ID you'll recieve information about the chosen pokemon ✨</p>
          <br>
          <p>Example of pokémons:</p>

          <ul>
            <li>Pikachu</li>
            <li>Ditto</li>
            <li>Arcanine</li>
            <li>Jynx</li>
            <li>Jolteon</li>
            <li>Snorlax</li>
          </ul>
        </div>

  </div>
`
