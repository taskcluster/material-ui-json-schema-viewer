import React from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '../Tooltip';

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
    'required',
  ];
  const keywords = Object.keys(schema).filter(
    key => !skipKeywords.includes(key)
  );

  return (
    <div className={`${classes.row} ${classes.rightRow}`}>
      <div className={classes.keywordColumn}>
        {keywords.length === 0 ? (
          <div className={classes.line} />
        ) : (
          keywords.map(keyword => {
            return typeof schema[keyword] === 'object' &&
              !Array.isArray(schema[keyword]) ? (
              <Tooltip key={keyword} keyword={keyword} classes={classes} />
            ) : (
              <Typography
                key={keyword}
                component="div"
                variant="subtitle2"
                className={classes.line}>
                {`${keyword}: ${schema[keyword]}`}
              </Typography>
            );
          })
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
