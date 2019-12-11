/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SchemaTable from './components/SchemaTable';

const root = document.getElementById('root');

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <SchemaTable />
    </Fragment>
  );
}

render(<App />, root);
