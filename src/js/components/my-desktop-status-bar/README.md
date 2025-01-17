# `<my-status-bar>`

A web component representing a status bar to display application status, notifications, or additional information.

## Attributes

### `message`

A string attribute representing the current status message displayed in the status bar.

Default value: `""`

### `type`

An attribute that specifies the type or style of the status bar, such as `success`, `error`, or `info`.

Default value: `info`

## Events

| Event Name         | Fired When                                       |
| ------------------- | ------------------------------------------------ |
| `statusChanged`     | The status message or type is updated. |

## Styling with CSS

The following parts can be styled to customize the component:

| Part Name          | Description                       |
| ------------------- | --------------------------------- |
| `status-bar`        | The container of the status bar. |
| `status-message`    | The area displaying the status message. |

## Example

```html
<my-status-bar message="Loading..." type="info"></my-status-bar>
