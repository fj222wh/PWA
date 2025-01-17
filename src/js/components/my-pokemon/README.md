# `<my-window>`

A web component representing a draggable and interactive window with a close button.

## Attributes

This component does not define any custom attributes.

## Events

| Event Name    | Fired When                                       |
| ------------- | ------------------------------------------------ |
| `windowActive`| The window is clicked, signaling it has become active. |

## Methods

This component does not expose public methods directly.

## Behavior

- **Draggable**: The window can be dragged by clicking and holding on the title bar.
- **Closable**: The window can be closed by clicking the close button.

## Styling with CSS

The following parts can be styled to customize the component:

| Part Name       | Description                  |
| --------------- | ---------------------------- |
| `title-bar`     | The draggable title bar of the window. |
| `close-btn`     | The close button of the window. |

## Example

```html
<my-window>
  <div slot="content">This is the content of the window.</div>
</my-window>
