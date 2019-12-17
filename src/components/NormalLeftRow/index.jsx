import React from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';

function NormalLeftRow({ schema, classes }) {
  const name = 'name' in schema ? `${schema.name}: ` : null;
  const typeSymbol =
    schema.type === 'array' || schema.type === 'object' ? (
      {
        array: '[',
        object: '{',
      }[schema.type]
    ) : (
      <code className={classes.code}>{schema.type}</code>
    );
  /** Create blank line paddings only for additional keywords that
   *  will have their own lines on the according right row.
   *  This enables the left row to have matching number of lines with
   *  the right row and align the lines and heights between the two rows.
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
  schema: shape({
    type: string,
    name: string,
    close: string,
  }).isRequired,
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
    code: string.isRequired,
  }).isRequired,
};

export default React.memo(NormalLeftRow);
