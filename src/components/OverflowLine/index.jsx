import React, { useState, useCallback } from 'react';
import { shape, string, oneOfType, node } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '../Tooltip';

/**
 * A single line component within a row of the schemaTable.
 * If the content text overflows, returns a line component with
 * the text ellipsed and tooltip is used to display full text instead.
 */
function OverflowLine({ classes, content }) {
  /**
   * Track the textOverflow state depending on the component's
   * width size relative to the text's length.
   */
  const [isTextOverflow, setIsTextOverflow] = useState(false);
  /**
   * Create a callback ref method to use to track the component's
   * width measurements.
   * (using a callback ref ensures that changes made to the ref
   *  component can update the isTextOverflow state)
   */
  const measuredRef = useCallback(element => {
    if (element !== null) {
      if (element.scrollWidth > element.offsetWidth) {
        setIsTextOverflow(true);
      }
    }
  }, []);

  if (isTextOverflow) {
    return (
      <Tooltip title={content}>
        <div className={classes.line}>
          <Typography
            component="div"
            variant="subtitle2"
            ref={measuredRef}
            noWrap>
            {content}
          </Typography>
        </div>
      </Tooltip>
    );
  }

  return (
    <Typography
      component="div"
      variant="subtitle2"
      className={classes.line}
      ref={measuredRef}>
      {content}
    </Typography>
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
  content: oneOfType([
    node,
    string,
  ]).isRequired,
};

export default React.memo(OverflowLine);
