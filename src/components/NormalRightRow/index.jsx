import React from 'react';
import { shape, string } from 'prop-types';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '../Tooltip';
import OverflowLine from '../OverflowLine';
import { treeNode } from '../../utils/prop-types';
import {
  SKIP_KEYWORDS,
  DESCRIPTIVE_KEYWORDS,
  TOOLTIP_DESCRIPTIONS,
} from '../../utils/constants';

function NormalRightRow({ classes, treeNode }) {
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
   * (maintain order specified in DESCRIPTIVE_KEYWORDS)
   */
  const descriptorKeywords = DESCRIPTIVE_KEYWORDS.filter(key => key in schema);

  /**
   * Display keywords defining specifications as chips.
   */
  function displaySpecKeyword(keyword) {
    /**
     * If keyword's property is defined complex, display the chip within
     * a tooltip to inform users to refer to the source for more details.
     */
    if (
      typeof schema[keyword] === 'object' &&
      !Array.isArray(schema[keyword])
    ) {
      /**
       * Generate tooltip descriptions to match the keyword.
       */
      const tooltipTitle = `${TOOLTIP_DESCRIPTIONS[keyword]} See the JSON-schema source for details.`;
      const infoIcon = <InfoIcon fontSize="inherit" color="inherit" />;

      return (
        <Tooltip key={keyword} title={tooltipTitle}>
          <Chip
            label={keyword}
            icon={infoIcon}
            size="small"
            variant="outlined"
          />
        </Tooltip>
      );
    }

    /**
     * Typecast the keyword's property to string format for proper display.
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
    const descriptorContent =
      keyword === 'title' ? (
        <strong>{schema[keyword]}</strong>
      ) : (
        schema[keyword]
      );

    return (
      <OverflowLine
        key={keyword}
        classes={classes}
        content={descriptorContent}
      />
    );
  }

  /**
   * Create the lines to display in a single right row according
   * to the schema's specification and descriptive keywords.
   * @param {Array} specs specification keywords in schema
   * @param {Array} descriptors descriptive keywords in schema
   */
  function displayLines(specs, descriptors) {
    const lines = [];

    /** If no keywords necessary, display a single blank line */
    if (specs.length === 0 && descriptors.length === 0) {
      lines.push(<div key="blank-line" className={classes.line} />);
    }

    /**
     * If specification keywords exist, display each keyword as a chip.
     */
    if (specs.length > 0) {
      /**
       * Group alphabetically sorted keywords in sizes of three
       * so that a single line may only contain a max of 3 chips.
       */
      const specKeywordLines = [[]];

      specs.sort();
      specs.forEach((keyword, i) => {
        const lineIndex = Math.trunc(i / 3);

        if (lineIndex > specKeywordLines.length - 1) {
          specKeywordLines.push([]);
        }

        specKeywordLines[lineIndex].push(keyword);
      });

      specKeywordLines.forEach(keywordGroup => {
        lines.push(
          <div
            key={`spec-line-${keywordGroup.toString()}`}
            className={classes.line}>
            {keywordGroup.map(keyword => displaySpecKeyword(keyword))}
          </div>
        );
      });
    }

    /**
     * If descriptive keywords exist, display each keyword in its own line.
     */
    if (descriptors.length > 0) {
      /**
       * If specification keywords also exist, create a blank line to separate
       * specifications line and lines for descriptions.
       */
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
   * Necessary to maintain consistency with left panel's
   * rows and lines.
   */
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
  }).isRequired,
  /**
   * Tree node object data structure.
   */
  treeNode: treeNode.isRequired,
};

export default React.memo(NormalRightRow);
