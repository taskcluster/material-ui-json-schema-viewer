import React from 'react';
import { shape, string, node } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '../Tooltip';

/**
 * A single line component within a row of the schemaTable
 * which uses a tooltip to display the full text.
 * If the content text overflows, the text is ellipsed.
 * (the tooltip is always implemented regardless of whether text
 * overflows or not in order to avoid complexities with dealing
 * with detectin changes when the window size changes)
 */
function OverflowLine({ classes, tooltip, children }) {
  return (
    <Tooltip title={tooltip}>
        <Typography
          component="div"
          variant="subtitle2"
          noWrap
          className={classes.line}>
          {children}
        </Typography>
    </Tooltip>
  );
}

OverflowLine.propTypes = {
  /**
   * Style for lines for schema viewer.
   * Necessary to maintain consistency within the schema table.
   */
  classes: shape({
    line: string.isRequired,
  }).isRequired,
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
