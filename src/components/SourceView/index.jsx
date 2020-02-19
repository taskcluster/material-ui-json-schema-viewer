import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { schema } from '../../utils/prop-types';

const useStyles = makeStyles(theme => ({
  view: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    overflowX: 'auto',
  },
}));

function SourceView({ schema }) {
  /**
   * Generate classes to define overall style for the schema table.
   */
  const classes = useStyles();
  const source = JSON.stringify(schema, undefined, 2);

  return (
    <pre className={classes.view}>
      <code>{source}</code>
    </pre>
  );
}

SourceView.propTypes = {
  schema: schema.isRequired,
};

export default React.memo(SourceView);
