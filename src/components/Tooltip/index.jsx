import React from 'react';
import { node } from 'prop-types';
import MuiTooltip from '@material-ui/core/Tooltip';

function Tooltip({ title, children }) {
  return (
    <MuiTooltip title={title} arrow disableFocusListener enterTouchDelay={1}>
      {children}
    </MuiTooltip>
  );
}

Tooltip.propTypes = {
  /** Keyword to display with tooltip feature */
  title: node.isRequired,
  children: node,
};

export default Tooltip;
