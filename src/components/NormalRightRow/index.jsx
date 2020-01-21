import React from 'react';
import { shape, string, arrayOf, number, bool } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Tooltip from '../Tooltip';
import { SKIP_KEYWORDS, DESCRIPTIVE_KEYWORDS } from '../../utils/constants';

function NormalRightRow({ classes, treeNode }) {
  /**
   * Deconstruct the properties of the given treeNode to use for rendering.
   */
  const { schema } = treeNode;
  /**
   * Identify keywords that define specifications of the given schema.
   * (skip over keywords that do not need to be displayed)
   */
  const specKeywords = Object.keys(schema).filter(
    key => !SKIP_KEYWORDS.includes(key)
  );
  /**
   * Identify keywords that help describe the given schema.
   */
  const descriptorKeywords = Object.keys(schema).filter(key =>
    DESCRIPTIVE_KEYWORDS.includes(key)
  );

  /**
   * Display keywords defining specifications as chips.
   * If keyword definition is too complex, display tooltip with info icon
   * in order to inform users to refer to the source for more details.
   */
  function displaySpecKeyword(keyword) {
    /**
     * Typecast the definition in string format to display properly.
     */
    const keyValue = (function keyValueToString(key) {
      if (Array.isArray(schema[keyword])) {
        if (schema[keyword].length === 0) {
          return '[ ]';
        }

        return schema[keyword];
      }

      if (
        typeof schema[keyword] === 'object' &&
        Object.keys(schema[keyword].length === 0)
      ) {
        return '{ }';
      }

      return schema[key];
    })(keyword);

    /**
     * Display chip within tooltip for complex definitions.
     */
    if (
      typeof schema[keyword] === 'object' &&
      !Array.isArray(schema[keyword])
    ) {
      return <Tooltip key={keyword} keyword={keyword} classes={classes} />;
    }

    return (
      <Chip
        key={keyword}
        label={`${keyword}: ${keyValue}`}
        size="small"
        variant="outlined"
      />
    );
  }

  /**
   * Display a single descriptive keyword in its own line.
   */
  function displayDescriptor(keyword) {
    return (
      <Typography
        key={keyword}
        component="div"
        variant="subtitle2"
        className={classes.line}>
        {keyword === 'title' ? (
          <strong>{schema[keyword]}</strong>
        ) : (
          schema[keyword]
        )}
      </Typography>
    );
  }

  /**
   * Create the lines to display in a single right row according
   * to the schema's specification and descriptive keywords.
   */
  function displayLines(specs, descriptors) {
    const lines = [];

    /** If no keywords necessary, display a single blank line */
    if (specs.length === 0 && descriptors.length === 0) {
      lines.push(<div key="blank-line" className={classes.line} />);
    }

    /**
     * If specification keywords exist, display each keyword as chip
     * within a single line.
     */
    if (specs.length > 0) {
      lines.push(
        <div key="spec-line" className={classes.line}>
          {specs.map(keyword => displaySpecKeyword(keyword))}
        </div>
      );
    }

    /**
     * If descriptive keywords exist, display each keyword in its own line.
     * (if specification keywords also exist, create a blank line to separate
     *  specifications line and lines for descriptions)
     */
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
   * Style for rows and lines for schema viewer.
   * Necessary to maintain consistency with right panel's
   * rows and lines.
   */
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
  }).isRequired,
  treeNode: shape({
    /**
     * Schema input given to render. May also be a sub-schema in case
     * for array items, object properties or more complex schemas.
     */
    schema: shape({
      /** Type of schema or sub-schema */
      type: string,
      /** Name of schema or sub-schema */
      name: string,
    }).isRequired,
    /** Style for indentation to represent nested structure */
    path: arrayOf(number).isRequired,
    isExpanded: bool,
  }).isRequired,
};

export default React.memo(NormalRightRow);
