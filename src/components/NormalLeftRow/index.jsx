import React from 'react';
import { shape, string, oneOf, func, object } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandIcon from 'mdi-react/MenuRightIcon';
import ShrinkIcon from 'mdi-react/MenuDownIcon';
import WarningIcon from '@material-ui/icons/ReportProblemOutlined';
import Tooltip from '../Tooltip';
import { basicTreeNode, NOOP } from '../../utils/prop-types';
import { expandRefNode, shrinkRefNode } from '../../utils/schemaTree';
import {
  SKIP_KEYWORDS,
  DESCRIPTIVE_KEYWORDS,
  COMBINATION_TYPES,
  LITERAL_TYPES,
  NESTED_TYPES,
  BRACKET_SYMBOLS,
  COMBINATION_SYMBOLS,
  TOOLTIP_DESCRIPTIONS,
} from '../../utils/constants';

/**
 * Dynamically generate styles for indentations to be used for
 * displaying the data structure of the schemas.
 */
const useStyles = makeStyles(theme => ({
  indentation: {
    marginLeft: indent => theme.spacing(indent * 2),
  },
}));

function NormalLeftRow({
  classes,
  treeNode,
  refType,
  setSchemaTree,
  references,
}) {
  const { schema, path } = treeNode;
  /**
   * Dynamically generate indent styles using the length of the path.
   * (length of path = depth of the current treeNode)
   */
  const indentSize = path.length;
  const styles = useStyles(indentSize);
  /**
   * Define the name and type of the schema or sub-schema.
   */
  const name = schema._name;
  const schemaType = schema._type;

  /**
   * Create a type symbol corresponding to the specified type.
   */
  function createTypeSymbol(type) {
    const bracketTypes = [
      ...NESTED_TYPES,
      LITERAL_TYPES.array,
      LITERAL_TYPES.object,
    ];
    const combinationTypes = [
      ...COMBINATION_TYPES,
      ...COMBINATION_TYPES.map(type => LITERAL_TYPES[type]),
    ];

    /**
     * If type is not specified, create a tooltip with an icon.
     */
    if (!type) {
      return (
        <Tooltip title={TOOLTIP_DESCRIPTIONS.noType}>
          <WarningIcon color="inherit" />
        </Tooltip>
      );
    }

    /**
     * Types with nested structures use the a bracket symbol,
     */
    if (bracketTypes.includes(type)) {
      return BRACKET_SYMBOLS[type];
    }

    /**
     * Combination types (allOf, anyOf, oneOf, no) use comment-like notation.
     */
    if (combinationTypes.includes(type)) {
      return (
        <span className={classes.comment}>{COMBINATION_SYMBOLS[type]}</span>
      );
    }

    /**
     * In case of an array of types (multiple types),
     * create an array of type symbols with highlighted text format,
     * with each symbol separated with a comma with each other.
     */
    if (Array.isArray(type)) {
      const typeArray = [];

      type.forEach((eachType, i) => {
        if (i > 0) {
          typeArray.push(<span key={`${eachType}-comma`}>,</span>);
        }

        typeArray.push(
          <code key={eachType} className={classes.code}>
            {eachType}
          </code>
        );
      });

      return typeArray;
    }

    /**
     * Default types use highlighted code format.
     */
    return <code className={classes.code}>{type}</code>;
  }

  /**
   * Define the required/contains mark used for the schema.
   */
  const requiredMark = (function createPrefix(schema) {
    if (schema._required) {
      return (
        <Tooltip title={TOOLTIP_DESCRIPTIONS.required}>
          <span className={classes.prefix}>*</span>
        </Tooltip>
      );
    }

    if (schema._contains) {
      return (
        <Tooltip title={TOOLTIP_DESCRIPTIONS.contains}>
          <span className={classes.prefix}>⊃</span>
        </Tooltip>
      );
    }

    return null;
  })(schema);
  /**
   * If treeNode is $ref type, create $ref icon button for expanding
   * or shrinking the row depending on the the refType prop.
   */
  const refButton = {
    none: null,
    default: (
      <IconButton
        className={classes.refButton}
        aria-label="expand-ref"
        color="inherit"
        size="small">
        <ExpandIcon size={24} />
      </IconButton>
    ),
    expanded: (
      <IconButton
        className={classes.refButton}
        aria-label="shrink-ref"
        color="inherit"
        size="small">
        <ShrinkIcon size={24} />
      </IconButton>
    ),
  }[refType];
  /**
   * If treeNode is $ref type, create ref expand/shrink action
   * to be used to expand or collapse a row depending on the refType prop.
   */
  const onRefClick = {
    none: () => {},
    default: () =>
      setSchemaTree(prev => expandRefNode(prev, treeNode, references)),
    expanded: () => setSchemaTree(prev => shrinkRefNode(prev, treeNode)),
  }[refType];
  /**
   * Create blank line paddings if descriptor keywords exists.
   * This enables the left row to have matching number of lines with
   * the right row and align the lines and heights between the two rows.
   */
  const blankLinePaddings = (function createPaddingLines(schemaInput) {
    /**
     * Check for descriptor and specification keywords.
     * * specification: displayed as chips in the first line of NormalRightRow
     * * descriptors: displayed in the next sequential lines of NormalRightRow
     */
    const descriptors = Object.keys(schema).filter(key =>
      DESCRIPTIVE_KEYWORDS.includes(key)
    );
    const specifications = Object.keys(schemaInput).filter(
      key => !SKIP_KEYWORDS.includes(key)
    );
    const lines = [];

    /**
     * Create a blank line per 3 spec keywords since a single line may
     * only contain a max of 3 spec keywords. Skip over the first group
     * of keywords since the first line already exists (to specify 'type').
     */
    specifications.forEach((keyword, i) => {
      if (i % 3 === 0 && i > 0) {
        lines.push(<div key={`${keyword}-line`} className={classes.line} />);
      }
    });

    /** Create a blank line for each descriptor keyword. */
    descriptors.forEach((keyword, i) => {
      /**
       * For the first descriptor keyword,
       * if specification keywords exists, a blank line should be added
       * to visually separate the specification line and descriptor line.
       * Else, no specifications exists, skip over the first descriptor
       * since the first line already exists (to specify 'type').
       */
      if (i === 0) {
        if (specifications.length > 0) {
          lines.push(<div key="separator-line" className={classes.line} />);
          lines.push(<div key={`${keyword}-line`} className={classes.line} />);
        }
      } else {
        /** Create blank lines for all the following descriptor keywords */
        lines.push(<div key={`${keyword}-line`} className={classes.line} />);
      }
    });

    return lines;
  })(schema);

  return (
    <div key={schema.type} className={classes.row} onClick={onRefClick}>
      <Typography
        component="div"
        variant="subtitle2"
        className={classNames(classes.line, styles.indentation)}>
        {name && `${name}: `}
        {createTypeSymbol(schemaType)}
        {requiredMark}
        {refButton}
      </Typography>
      {blankLinePaddings}
    </div>
  );
}

NormalLeftRow.propTypes = {
  /**
   * Style for rows and lines for left rows of the schema table.
   * (necessary to maintain consistency with right panel's rows and lines)
   */
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
    code: string.isRequired,
    comment: string.isRequired,
    prefix: string.isRequired,
  }).isRequired,
  /**
   * Tree node object data structure.
   */
  treeNode: basicTreeNode.isRequired,
  /**
   * String for identification of row. Can be one of the following:
   * 'none': the row is not a ref row, so no button is necessary.
   * 'default': the row is a ref row in collapsed form.
   *            A plus button will be displayed in order to expand the $ref.
   * 'expanded': the row is a ref row in expanded form.
   *             A minus button will be displayed in order to srhink the $ref.
   */
  refType: oneOf(['none', 'default', 'expanded']).isRequired,
  /**
   * The method to set the state of the schemaTree.
   * Only necessary for ref rows.
   */
  setSchemaTree: func,
  /**
   * Object where all schemas are stored so that the table
   * can reference to for dereferencing $ref schemas.
   * Only necessary for ref rows.
   */
  references: object,
};

NormalLeftRow.defaultProps = {
  setSchemaTree: NOOP,
  references: {},
};

export default React.memo(NormalLeftRow);
