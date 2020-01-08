import React from 'react';
import { shape, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Tooltip from '../Tooltip';
import { SKIP_KEYWORDS, DESCRIPTOR_KEYWORDS } from '../../utils/constants';

function NormalRightRow({ schema, classes }) {
  /**
   * Filter keywords that should be displayed in the right panel.
   * (skip over keywords that do not need to be displayed)
   */
  const specKeywords = Object.keys(schema).filter(
    key => !SKIP_KEYWORDS.includes(key)
  );
  const descriptorKeywords = Object.keys(schema).filter(key =>
    DESCRIPTOR_KEYWORDS.includes(key)
  );

  function displaySpecKeyword(keyword) {
    if (
      typeof schema[keyword] === 'object' &&
      !Array.isArray(schema[keyword])
    ) {
      return <Tooltip key={keyword} keyword={keyword} classes={classes} />;
    }

    return (
      <Chip
        key={keyword}
        label={`${keyword}: ${schema[keyword]}`}
        size="small"
        variant="outlined"
      />
    );
  }

  function displayDescriptor(keyword) {
    return (
      <Typography
        key={keyword}
        component="div"
        variant="subtitle2"
        className={classes.line}>
        {`${keyword}: ${schema[keyword]}`}
      </Typography>
    );
  }

  function displayLines(specs, descriptors) {
    const lines = [];

    if (specs.length === 0 && descriptors.length === 0) {
      lines.push(<div key="blank-line" className={classes.line} />);
    }

    if (specs.length > 0) {
      lines.push(
        <div key="spec-line" className={classes.line}>
          {specs.map(keyword => displaySpecKeyword(keyword))}
        </div>
      );
    }

    if (descriptors.length > 0) {
      if (specs.length > 0) {
        lines.push(<div key="separator-line" className={classes.line} />);
      }

      descriptors.forEach(keyword => lines.push(displayDescriptor(keyword)));
    }

    return lines;
  }

  return (
    <div className={classes.row}>
      {displayLines(specKeywords, descriptorKeywords)}
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
