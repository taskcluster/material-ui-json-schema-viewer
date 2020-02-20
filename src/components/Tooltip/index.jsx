import React from 'react';
import { node } from 'prop-types';
import MuiTooltip from '@material-ui/core/Tooltip';

/**
 * Tooltip accessible by hovering mouse or touching mobile screen.
 */
function Tooltip({ title, children }) {
  /**
   * Forward the properties and ref of the tooltip to the children components
   * so that MuiTooltip has control over the wrapped components' props.
   */
  const ChildrenWrapped = React.forwardRef(function MyComponent(props, ref) {
    return <div {...props} ref={ref}>{children}</div>
  });

  return (
    <MuiTooltip title={title} arrow disableFocusListener enterTouchDelay={1}>
      <ChildrenWrapped />
    </MuiTooltip>
  );
}

Tooltip.propTypes = {
  /** Keyword to display with tooltip feature */
  title: node.isRequired,
  children: node,
};

export default Tooltip;
