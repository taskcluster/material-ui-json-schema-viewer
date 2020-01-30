import React, { useState, useCallback } from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '../Tooltip';

/**
 * A single line component within a row of the schemaTable.
 * If the content text overflows, returns a line component with
 * the text ellipsed and tooltip is used to display full text instead.
 */
function OverflowLine({ classes, text }) {
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
      <Tooltip title={text}>
        <div className={classes.line}>
          <Typography
            component="div"
            variant="subtitle2"
            ref={measuredRef}
            noWrap>
            {text}
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
      {text}
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
  text: string.isRequired,
};

export default React.memo(OverflowLine);
