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
                <Tooltip
                  title="Additional items must match a sub-schema. 
                  See the JSON-schema source for details."
                  arrow>
                  <Typography component="span" variant="subtitle">
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
