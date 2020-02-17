# material-ui-json-schema-viewer
a viewer component that displays JSON schemas (built using [material-ui](https://material-ui.com/))

## Requirements
- `@material-ui/core` v4+
- `react` 16.8+
- `react-dom` 16.8+

## Theme Customization
By default, the schema viewer inherits [material-ui's default theme](https://material-ui.com/customization/default-theme/). You can change the theme by customizing the theme passed to
material-ui's [`ThemeProvider`](https://material-ui.com/styles/api/#themeprovider) component.
You may also use material-ui's [`CSSBaseline`](https://material-ui.com/api/css-baseline/) to provide a more consistent style baseline as well.
```js
const customTheme = createMuiTheme({
    palette: {
      background: {
        paper: '#000', // change the background color
      },
      text: {
        primary: '#ffc107', // change the text color
        secondary: '#ffc53d', // change chip's border color
        hint: '#ddd', // change comment color
      },
      divider: '#4f4f4f', // change table's border color
    },
});
<CssBaseline />
<ThemeProvider theme={customTheme}>
    <SchemaViewer />
</ThemeProvider>
```
