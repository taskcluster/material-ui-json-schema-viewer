# material-ui-json-schema-viewer
a viewer component that displays JSON schemas (built using [material-ui](https://material-ui.com/))

## Requirements
- `@material-ui/core` v4+
- `react` 16.8+
- `react-dom` 16.8+

## Usage
Install package
```
npm i material-ui-json-schema-viewer
```
Import package and use component
```js
import SchemaViewer from 'material-ui-json-schema-viewer';

<SchemaViewer schema={jsonSchema} references={schemaReferences} />
```

| Prop | Type | Required | Description |
|:---|:---|:---|:---|
| `schema` | Object | ✓ | A JSON schema object. |
| `references` | Array| - | An array of JSON schema objects (including the schema to render), which the schema may refer to. (each schema within the references must include an `$id` property to use for key-value mapping the references) |

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
        disabled: '#808080', // change markdown code block color
      },
      divider: '#4f4f4f', // change table's border color
    },
});
<CssBaseline />
<ThemeProvider theme={customTheme}>
    <SchemaViewer />
</ThemeProvider>
```

## Contributing
This repository uses Neutrino for developing, and building React components. To get started:
- Fork and clone this repo.
- Install the dependencies with `yarn`.
- Start the storybook server with `yarn start` (use `CTRL-C` to exit).

Feel free to open an issue, submit a pull request, or contribute however you would like. Understand that this documentation is still a work in progress, so file an issue or submit a PR to ask questions or make improvements. Thanks!

## Publishing
1. Bump the version of the package with `npm version {version-name}` (patch, minor, major, etc.).
2. Generate the compiled component for publishing to npm with `yarn build`.
3. Publish the package with `npm publish`
4. Push your changes with `git push upstream master --tags`
5. Deploy Storybook to gh-pages with `yarn deploy`
