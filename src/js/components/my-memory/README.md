# `<my-memory>`

A web component that implements a memory game, where players need to match pairs of tiles within a grid.

## Attributes

This component does not define any custom attributes.

## Events

| Event Name    | Fired When                                       |
| ------------- | ------------------------------------------------ |
| `youWon`      | Fired when the player successfully matches all pairs and wins the game. |

## Methods

This component does not expose public methods directly.

## Behavior

- **Game Modes**: The component allows the user to choose from three difficulty levels: Easy, Medium, and Hard.
- **Tile Flipping**: Players can click on tiles to flip them and try to match pairs.
- **Timer**: Tracks the time taken to complete the game.
- **Moves Counter**: Displays the number of moves made by the player.
- **Win Condition**: The game ends when all pairs are successfully matched.
- **Replay**: After winning, the player can choose to play again.
- **Change Level**: The player can change the game difficulty at any time during the game.

## Example

```html
<my-memory>
  <!-- This will render the memory game inside your page -->
</my-memory>
