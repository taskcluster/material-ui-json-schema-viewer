import React from 'react';
import { shape, string } from 'prop-types';

function NormalRightRow({ schema, classes }) {
  const keywords = Object.keys(schema);

  return (
    <div className={`${classes.row} ${classes.rightRow}`}>
      <div className={classes.keywordColumn}>
        {keywords.map((keyword) => (
          <p key={keyword} className={classes.line}>
            {keyword}
            {': '}
            {schema[keyword]}
          </p>
        ))}
      </div>
      <div className={classes.descriptionColumn}>
        {('description' in schema) && <p>{schema.description}</p>}
      </div>
    </div>
  );
}

NormalRightRow.propTypes = {
  schema: shape({
    type: string.isRequired,
  }).isRequired,
  classes: shape({
    row: string.isRequired,
    rightRow: string.isRequired,
    keywordColumn: string.isRequired,
    descriptionColumn: string.isRequired,
    line: string.isRequired,
  }).isRequired,
};

export default React.memo(NormalRightRow);
