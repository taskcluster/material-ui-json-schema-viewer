import React, { Fragment } from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import SchemaTable from './components/SchemaTable';
import theme from './theme';

const root = document.getElementById('root');

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SchemaTable />
      </ThemeProvider>
    </Fragment>
  );
}

render(<App />, root);
