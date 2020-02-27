import React from 'react';
import { bool, func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { schema } from '../../utils/prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
  },
  title: {
    color: theme.palette.text.primary,
    margin: 0,
  },
  description: {
    color: theme.palette.text.primary,
  },
  button: {
    margin: 0,
  },
}));

function Header({ schema, sourceMode, toggleMode }) {
  /**
   * Generate classes to define overall style for the schema table.
   */
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography component="div" variant="h6" className={classes.title}>
        {schema.title}
        {` `}
        <Button
          className={classes.button}
          color="inherit"
          size="small"
          onClick={toggleMode}>
          {sourceMode ? 'hide' : 'show'} source
        </Button>
      </Typography>
      <Typography
        component="div"
        variant="subtitle2"
        className={classes.description}>
        {schema.description}
      </Typography>
    </div>
  );
}

Header.propTypes = {
  schema: schema.isRequired,
  sourceMode: bool.isRequired,
  toggleMode: func.isRequired,
};

export default React.memo(Header);
