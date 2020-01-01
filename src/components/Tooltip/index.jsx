import React from 'react';
import { shape, string } from 'prop-types';
import classNames from 'classnames';
import MuiTooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

function Tooltip({ keyword, classes }) {
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
      <div className={classes.line}>
        <Typography
          component="div"
          variant="subtitle2"
          className={classes.tooltip}>
          {keyword}
        </Typography>
        <InfoIcon
          fontSize="inherit"
          color="inherit"
          className={classNames(classes.tooltip, classes.icon)}
        />
      </div>
    </MuiTooltip>
  );
}

Tooltip.propTypes = {
  /** Keyword to display with tooltip feature */
  keyword: string.isRequired,
  /** Style for tooltip and icon display */
  classes: shape({
    tooltip: string.isRequired,
    icon: string.isRequired,
  }).isRequired,
};

export default React.memo(Tooltip);
