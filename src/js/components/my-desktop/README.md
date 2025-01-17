# `<my-desktop>`

A web component that represents a desktop environment, managing multiple applications and their respective windows.

## Attributes

This component does not expose any public attributes.

## Events

| Event Name    | Fired When                                 |
| ------------- | ------------------------------------------ |
| `windowActive`| A window is clicked and becomes active.    |

## Methods

### `openApp(app: Element)`

Opens a new app within a window on the desktop.

- **Parameters:**
  - `app`: The custom element to be displayed in a new window.

### `focusOnWindow(event: Event)`

Handles the focus of a window when clicked, ensuring it comes to the front by updating its `z-index`.

- **Parameters:**
  - `event`: The event triggered when a window is clicked.

## Features

- **Dynamic Window Creation:** 
  - Automatically positions new windows slightly offset from the previous one.
  - Manages a global `z-index` to keep windows in the correct stacking order.

- **Application Support:** 
  - Includes predefined icons for launching specific applications like `my-app`, `my-chat`, and `my-memory`.

## Styling with CSS

The following parts can be styled to customize the component:

| Part Name        | Description                        |
| ---------------- | ---------------------------------- |
| `desktop`        | The main desktop background.       |
| `icon`           | The application icons.            |

## Example

```html
<my-desktop></my-desktop>
