import React from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';

function NormalRightRow({ schema, classes }) {
  const keywords = Object.keys(schema);
  const nonDisplayedKeywords = ['items'];

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
