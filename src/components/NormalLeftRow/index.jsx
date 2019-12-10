import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

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
   *  the right row.
   */
  const nonPaddedKeywords = ['type', 'description', 'name'];
  const blankLinePaddings = [];
  Object.keys(schema).forEach((keyword) => {
    if (!nonPaddedKeywords.includes(keyword)) {
      blankLinePaddings.push(<br key={keyword} className={classes.line} />);
    }
  });

  return (
    <div>
      <p className={classes.line}>
        {name}
        {typeSymbol}
      </p>
      {blankLinePaddings}
    </div>
  );
}

NormalLeftRow.propTypes = {
  schema: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    row: PropTypes.string.isRequired,
    line: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(NormalLeftRow);
