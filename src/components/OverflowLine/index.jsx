import React from 'react';
import { shape, string, oneOfType, node } from 'prop-types';
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
function OverflowLine({ classes, content }) {
  return (
    <Tooltip title={content}>
      <div>
        <Typography component="div" variant="subtitle2" noWrap className={classes.line}>
          {content}
        </Typography>
      </div>
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
   * Content to be displayed.
   */
  content: oneOfType([node, string]).isRequired,
};

export default React.memo(OverflowLine);
