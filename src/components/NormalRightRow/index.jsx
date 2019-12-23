import React from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Warning from '@material-ui/icons/Info';

function NormalRightRow({ schema, classes }) {
  /**
   * Skip over certain keywords illustrated in other parts of
   * the SchemaTable to avoid displaying them repeatedly.
   * (ex. symbols in the left panel or description in right panel)
   */
  const skipKeywords = [
    'type',
    'name',
    'description',
    'items',
    'contains',
    'properties',
  ];
  const keywords = Object.keys(schema).filter(
    key => !skipKeywords.includes(key)
  );
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
    <div className={`${classes.row} ${classes.rightRow}`}>
      <div className={classes.keywordColumn}>
        {keywords.length === 0 ? (
          <Typography
            component="div"
            variant="subtitle2"
            className={classes.line}>
            {null}
          </Typography>
        ) : (
          keywords.map(keyword => (
            <Typography
              key={keyword}
              component="div"
              variant="subtitle2"
              className={classes.line}>
              {typeof schema[keyword] === 'object' &&
              !Array.isArray(schema[keyword]) ? (
                <Tooltip title={createTooltipTitle(keyword)} arrow>
                  <Typography component="span" variant="subtitle2">
                    {`${keyword}: `}
                    <Warning fontSize="inherit" color="inherit" />
                  </Typography>
                </Tooltip>
              ) : (
                `${keyword}: ${schema[keyword]}`
              )}
            </Typography>
          ))
        )}
      </div>
      <div className={classes.descriptionColumn}>
        {'description' in schema && (
          <Typography component="div" variant="subtitle2">
            {schema.description}
          </Typography>
        )}
      </div>
    </div>
  );
}

NormalRightRow.propTypes = {
  /**
   * Schema input given to render.
   * May also be a sub-schema in case for array items,
   * object properties or more complex schemas.
   */
  schema: shape({
    /** Type of schema or sub-schema */
    type: string.isRequired,
  }).isRequired,
  /**
   * Style for rows and lines for schema viewer.
   * Necessary to maintain consistency with right panel's
   * rows and lines.
   */
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
    /**
     * Display the right panel in a two-column grid
     * : keywordColumn, descriptionColumn
     */
    rightRow: string.isRequired,
    /** Column to display keywords for the schema or sub-schema */
    keywordColumn: string.isRequired,
    /** Column to display description for the schema or sub-schema */
    descriptionColumn: string.isRequired,
  }).isRequired,
};

export default React.memo(NormalRightRow);
