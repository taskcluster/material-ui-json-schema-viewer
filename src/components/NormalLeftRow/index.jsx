import React from 'react';
import { shape, string } from 'prop-types';

function NormalLeftRow({ schema, classes }) {
  const name = ('name' in schema) ? `${schema.name}: ` : null;

  const typeSymbol = ({
    array: '[',
    boolean: '"..."',
    integer: '"..."',
    null: '"..."',
    number: '"..."',
    object: '{',
    string: '"..."',
  }[schema.type]);

  /** Create blank line paddings only for additional keywords that
   *  will have their own lines on the according right row.
   *  This enables the left row to have matching number of lines with
   *  the right row and align the lines and heights between the two rows.
   */
  const nonPaddedKeywords = ['type', 'description', 'name'];
  const blankLinePaddings = [];
  Object.keys(schema).forEach((keyword) => {
    if (!nonPaddedKeywords.includes(keyword)) {
      blankLinePaddings.push(<br key={keyword} className={classes.line} />);
    }
  });

  return (
    <div className={classes.row}>
      <p className={classes.line}>
        {name}
        {typeSymbol}
      </p>
      {blankLinePaddings}
    </div>
  );
}

NormalLeftRow.propTypes = {
  schema: shape({
    type: string.isRequired,
    name: string,
  }).isRequired,
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
  }).isRequired,
};

export default React.memo(NormalLeftRow);
