# `<my-flipping-tile>`

A web component representing a flipping tile, typically used in memory games. It handles flipping interactions and state management.

## Attributes

| Attribute  | Description                                   |
| ---------- | --------------------------------------------- |
| `face-up`  | Indicates if the tile is flipped to show its front. |
| `disabled` | Prevents the tile from being interacted with. |
| `hidden`   | Hides the tile from view.                     |

## Events

| Event Name           | Fired When                            |
| -------------------- | ------------------------------------- |
| `my-flipping-tile:flip` | The tile is flipped. The event includes a `detail` object with a `faceUp` property indicating the tile's state. |

## Methods

This component does not expose public methods directly.

## Behavior

- **Flipping**: Tiles can be flipped when clicked, toggling the `face-up` attribute.  
- **State Control**: Attributes like `disabled` and `hidden` control whether the tile can be flipped or is visible.  

## Styling with CSS

The following parts can be styled to customize the component:

| Part Name   | Description                          |
| ----------- | ------------------------------------ |
| `tile`      | The tile container element.          |

## Example

```html
<my-flipping-tile id="tile1"></my-flipping-tile>
