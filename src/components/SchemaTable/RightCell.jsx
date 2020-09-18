import React from 'react';
import { shape, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'ramda';
import InfoIcon from 'mdi-react/InformationOutlineIcon';
import Typography from '@material-ui/core/Typography';
import Markdown from '../Markdown';
import Chip from '../Chip';
import Tooltip from '../Tooltip';
import { basicTreeNode } from '../../utils/prop-types';
import { SKIP_KEYWORDS, TOOLTIP_DESCRIPTIONS } from '../../utils/constants';

const useStyles = makeStyles(theme => ({
  typography: {
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(4.5),
  },
}));

function RightCell({ treeNode }) {
  const { schema } = treeNode;
  const classes = useStyles();
  /**
   * Identify keywords that define specifications of the given schema.
   * (skip over keywords that do not need to be displayed).
   * Each keyword will be displayed as a chip.
   */
  const specKeywords = Object.keys(schema).filter(
    key => !SKIP_KEYWORDS.includes(key)
  );

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
   * Each specification keyword is displayed as a chip.
   */
  function createKeywordChips() {
    return (
      <div className={classes.typography}>
        {specKeywords.map(keyword => createKeywordChip(keyword))}
      </div>
    );
  }

  /**
   * Display the title keyword in a single line.
   */
  function createTitle() {
    return (
      schema.title && (
        <Typography className={classes.typography} variant="subtitle2">
          <strong>{schema.title}</strong>
        </Typography>
      )
    );
  }

  /**
   * Display the descriptive keyword in a single line.
   */
  function createDescription() {
    return (
      schema.description && (
        <Typography className={classes.typography} variant="body2">
          <Markdown>{schema.description}</Markdown>
        </Typography>
      )
    );
  }

  return (
    <div>
      {createTitle()}
      {createDescription()}
      {specKeywords.length > 0 && createKeywordChips()}
    </div>
  );
}

RightCell.propTypes = {
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

export default React.memo(RightCell);
