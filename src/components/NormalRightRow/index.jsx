import React from 'react';
import { shape, string } from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Tooltip from '../Tooltip';
import { SKIP_KEYWORDS } from '../../utils/constants';

function NormalRightRow({ schema, classes }) {
  /**
   * Filter keywords that should be displayed in the right panel.
   * (skip over keywords that are already displayed in other parts)
   */
  const keywords = Object.keys(schema).filter(
    key => !SKIP_KEYWORDS.includes(key)
  );

  return (
    <div className={classes.row}>
      {keywords.length === 0 ? (
        <div className={classes.line} />
      ) : (
        <div className={classes.line}>
          {keywords.map(keyword => {
            return typeof schema[keyword] === 'object' &&
              !Array.isArray(schema[keyword]) ? (
              <Tooltip key={keyword} keyword={keyword} classes={classes} />
            ) : (
              <Chip
                key={keyword}
                label={`${keyword}: ${schema[keyword]}`}
                size="small"
                variant="outlined"
              />
            );
          })}
        </div>
      )}
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
    type: string,
  }).isRequired,
  /**
   * Style for rows and lines for schema viewer.
   * Necessary to maintain consistency with right panel's
   * rows and lines.
   */
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
  }).isRequired,
};

export default React.memo(NormalRightRow);
