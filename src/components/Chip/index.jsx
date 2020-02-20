import React from 'react';
import { shape, string, node, element } from 'prop-types';
import MuiChip from '@material-ui/core/Chip';

function Chip({ classes, label, icon }) {
  return (
    <MuiChip
      className={classes.chip}
      label={label}
      icon={icon}
      size="small"
      variant="outlined"
    />
  );
}

Chip.propTypes = {
  /**
   * Style for chips used in schema table.
   */
  classes: shape({
    chip: string.isRequired,
  }).isRequired,
  label: node.isRequired,
  icon: element,
};

Chip.defaultProps = {
  icon: null,
};

export default React.memo(Chip);
