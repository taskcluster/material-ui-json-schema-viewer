import React from 'react';
import { shape, string } from 'prop-types';
import { isEmpty } from 'ramda';
import InfoIcon from 'mdi-react/InformationOutlineIcon';
import Markdown from '../Markdown';
import Chip from '../Chip';
import Tooltip from '../Tooltip';
import OverflowLine from '../OverflowLine';
import { basicTreeNode } from '../../utils/prop-types';
import {
  SKIP_KEYWORDS,
  DESCRIPTIVE_KEYWORDS,
  MAX_NUMBER_OF_CHIPS,
  TOOLTIP_DESCRIPTIONS,
} from '../../utils/constants';

function NormalRightRow({ classes, treeNode }) {
  const { schema } = treeNode;
  /**
   * Identify keywords that define specifications of the given schema.
   * (skip over keywords that do not need to be displayed).
   * Each keyword will be displayed as a chip.
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
   * Create a chip to display keyword properties.
   * This is used to display specification keywords.
   */
  function createKeywordChip(keyword) {
    /**
     * If keyword's property is defined complex, display the chip within
     * a tooltip to inform users to refer to the source for more details.
     */
    if (
      typeof schema[keyword] === 'object' &&
      !Array.isArray(schema[keyword]) &&
      !isEmpty(schema[keyword])
    ) {
      /**
       * Generate tooltip descriptions to match the keyword.
       */
      const tooltipTitle = TOOLTIP_DESCRIPTIONS[keyword];
      const infoIcon = <InfoIcon fontSize="inherit" color="inherit" />;

      return (
        <Tooltip key={keyword} title={tooltipTitle}>
          <Chip label={keyword} icon={infoIcon} />
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

    return <Chip key={keyword} label={`${keyword}: ${keyValue}`} />;
  }

  /**
   * Create lines for specification keywords in groups of chips.
   * Each specification keyword is displayed as a chip and
   * a single line may only contain a MAX_NUMBER_OF_CHIPS at most.
   */
  function createSpecificationLines(specKeywords) {
    const lines = [];
    /**
     * Sort specification keywords in alphabetical order and
     * group the keywords in sizes of MAX_NUMBER_OF_CHIPS.
     */
    const keywordGroups = [[]];

    specKeywords.sort();
    specKeywords.forEach((keyword, i) => {
      const groupIndex = Math.trunc(i / MAX_NUMBER_OF_CHIPS);

      if (groupIndex > keywordGroups.length - 1) {
        keywordGroups.push([]);
      }

      keywordGroups[groupIndex].push(keyword);
    });

    /**
     * Each keyword group displays a single line containing
     * a MAX_NUMBER_OF_CHIPS amount of chips
     */
    keywordGroups.forEach(keywordGroup => {
      lines.push(
        <div
          key={`spec-line-${keywordGroup.toString()}`}
          className={classes.line}>
          {keywordGroup.map(keyword => createKeywordChip(keyword))}
        </div>
      );
    });

    return lines;
  }

  /**
   * Display the title keyword in a single line.
   */
  function createTitleLine(keyword) {
    return (
      <OverflowLine key={keyword} tooltip={schema[keyword]}>
        <strong>{schema[keyword]}</strong>
      </OverflowLine>
    );
  }

  /**
   * Display the descriptive keyword in a single line.
   */
  function createDescriptionLine(keyword) {
    const markdownTooltip = <Markdown inverse>{schema[keyword]}</Markdown>;

    return (
      <OverflowLine key={keyword} tooltip={markdownTooltip}>
        <Markdown>{schema[keyword]}</Markdown>
      </OverflowLine>
    );
  }

  /**
   * Create lines for the schema's specification and descriptive keywords.
   * @param {array} specKeywords specification keywords in schema
   * @param {array} descriptorKeywords descriptive keywords in schema
   * @returns {array} lines for the schema's right panel
   */
  function createLinesForKeywords(specKeywords, descriptorKeywords) {
    let lines = [];

    /**
     * If neither keyword types exist, display a single blank line
     * to match the 'type' line in NormalLeftRow.
     */
    if (specKeywords.length === 0 && descriptorKeywords.length === 0) {
      lines.push(<div key="blank-line" className={classes.line} />);
    }

    /**
     * If specification keywords exist, create lines to hold keyword chips.
     */
    if (specKeywords.length > 0) {
      const specLines = createSpecificationLines(specKeywords);

      lines = lines.concat(specLines);
    }

    /**
     * If descriptive keywords exist, display each keyword in its own line.
     */
    if (descriptorKeywords.length > 0) {
      /**
       * If specification keywords also exist, create a blank line to separate
       * specification lines and lines for descriptions.
       */
      if (specKeywords.length > 0) {
        lines.push(<div key="separator-line" className={classes.line} />);
      }

      descriptorKeywords.forEach(keyword => {
        if (keyword === 'title') {
          lines.push(createTitleLine(keyword));
        } else if (keyword === 'description') {
          lines.push(createDescriptionLine(keyword));
        }
      });
    }

    return lines;
  }

  return (
    <div className={classes.row}>
      {createLinesForKeywords(specKeywords, descriptorKeywords)}
    </div>
  );
}

NormalRightRow.propTypes = {
  /**
   * Style for schema table.
   * Rows and lines need to maintain consistent
   * with left panel's rows and lines.
   */
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
  }).isRequired,
  /**
   * Tree node object data structure.
   */
  treeNode: basicTreeNode.isRequired,
};

export default React.memo(NormalRightRow);
