import React from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';

function NormalLeftRow({ schema, classes }) {
  /**
   * If schema or sub-schema has a name keyword,
   * (ex. properties of object) store in variable to display.
   */
  const name = 'name' in schema ? schema.name : null;
  /** Map schema's type to a symbol for display. */
  const typeSymbol = {
    array: '[',
    boolean: '"..."',
    integer: '"..."',
    null: '"..."',
    number: '"..."',
    object: '{',
    string: '"..."',
  }[schema.type];
  /**
   * Create blank line paddings only for additional keywords that
   * will have their own lines on the according right row.
   * This enables the left row to have matching number of lines with
   * the right row and align the lines and heights between the two rows.
   */
  const nonPaddedKeywords = ['type', 'description', 'name', 'items'];
  const blankLinePaddings = [];

  Object.keys(schema).forEach(keyword => {
    if (!nonPaddedKeywords.includes(keyword)) {
      blankLinePaddings.push(
        <Typography key={`${keyword} line`} className={classes.line}>
          <br />
        </Typography>
      );
    }
  });

  return (
    <div key={schema.type} className={classes.row}>
      <Typography component="div" className={classes.line}>
        {name && `${name}: `}
        {typeSymbol}
      </Typography>
      {blankLinePaddings}
    </div>
  );
}

NormalLeftRow.propTypes = {
  /**
   * Schema input given to render.
   * May also be a sub-schema in case for array items,
   * object properties or more complex schemas.
   */
  schema: shape({
    /** Type of schema or sub-schema */
    type: string.isRequired,
    /** Name of schema or sub-schema */
    name: string,
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

export default React.memo(NormalLeftRow);
