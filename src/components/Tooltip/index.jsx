import React from 'react';
import { string } from 'prop-types';
import MuiTooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Warning from '@material-ui/icons/Info';

function Tooltip({ keyword }) {
  /**
   * Generate tooltip descriptions to provide further information
   * regarding the given keywords.
   * (only keywords defined as complex object types will need
   *  tooltip descriptions)
   */
  const tooltipDescriptions = {
    additionalItems: 'Additional items must match a sub-schema',
    additionalProperties: 'Additional properties must match a sub-schema',
    dependencies:
      'The schema of the object may change based on the presence of certain special properties',
    propertyNames: 'Names of properties must follow a specified convention',
    patternProperties:
      'Property names or values should match the specified pattern',
  };
  const createTooltipTitle = key =>
    `${tooltipDescriptions[key]}. See the JSON-schema source for details.`;

  return (
    <MuiTooltip title={createTooltipTitle(keyword)} arrow>
      <Typography component="span" variant="subtitle2">
        {`${keyword}: `}
        <Warning fontSize="inherit" color="inherit" />
      </Typography>
    </MuiTooltip>
  );
}

Tooltip.propTypes = {
  /** Keyword to display with tooltip feature */
  keyword: string.isRequired,
};

export default React.memo(Tooltip);
