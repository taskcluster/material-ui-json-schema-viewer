import React from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';

function NormalRightRow({ schema, classes }) {
  const keywords = Object.keys(schema);
  const nonDisplayedKeywords = ['items', 'contains'];

  // TODO: specify details to see below?
  /*
  if (typeof schema.additionalItems === 'object') {
  }
  */

  return (
    <div className={`${classes.row} ${classes.rightRow}`}>
      <div className={classes.keywordColumn}>
        {keywords.map(
          keyword =>
            !nonDisplayedKeywords.includes(keyword) && (
              <Typography
                component="div"
                key={keyword}
                className={classes.line}>
                {keyword}
                {': '}
                {schema[keyword]}
              </Typography>
            )
        )}
      </div>
      <div className={classes.descriptionColumn}>
        {'description' in schema && (
          <Typography component="div">{schema.description}</Typography>
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
