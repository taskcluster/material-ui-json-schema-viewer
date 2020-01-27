import React, { Fragment } from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import SchemaViewer from './components/SchemaViewer';
import theme from './theme';

const root = document.getElementById('root');

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SchemaViewer />
      </ThemeProvider>
    </Fragment>
  );
}

render(<App />, root);
