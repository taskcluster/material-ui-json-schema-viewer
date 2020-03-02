import React from 'react';
import { node } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '../Tooltip';

const useStyles = makeStyles(theme => ({
  typography: {
    color: theme.palette.text.primary,
  },
  // Copied mostly from the line class name in SchemaTable/index.jsx
  tooltipLineDiv: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    height: theme.spacing(4.5),
    paddingLeft: theme.spacing(1),
  },
}));

/**
 * A single line component within a row of the schemaTable
 * which uses a tooltip to display the full text.
 * If the content text overflows, the text is ellipsed.
 * (the tooltip is always implemented regardless of whether text
 * overflows or not in order to avoid complexities with dealing
 * with detectin changes when the window size changes)
 */
function OverflowLine({ tooltip, children }) {
  const classes = useStyles();

  return (
    <Tooltip title={tooltip}>
      <div className={classes.tooltipLineDiv}>
        <Typography
          className={classes.typography}
          component="div"
          variant="subtitle2"
          noWrap>
          {children}
        </Typography>
      </div>
    </Tooltip>
  );
}

OverflowLine.propTypes = {
  /**
   * Content for tooltip to display upon hovering content in line.
   */
  tooltip: node.isRequired,
  /**
   * Content of the line.
   */
  children: node.isRequired,
};

export default React.memo(OverflowLine);
