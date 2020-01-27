import React from 'react';
import { shape, string, oneOf, func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandIcon from '@material-ui/icons/ArrowRightRounded';
import ShrinkIcon from '@material-ui/icons/ArrowDropDownRounded';
import { treeNode } from '../../utils/prop-types';
import { expandRefNode, shrinkRefNode } from '../../utils/schemaTree';
import {
  SKIP_KEYWORDS,
  DESCRIPTIVE_KEYWORDS,
  COMBINATION_TYPES,
  NESTED_TYPES,
  NOOP,
} from '../../utils/constants';

/**
 * Dynamically generate styles for indentations to be used for
 * displaying the data structure of the schemas.
 */
const useStyles = makeStyles(theme => ({
  indentation: {
    marginLeft: indent => `${theme.spacing(indent * 2)}px`,
  },
}));

function NormalLeftRow({ classes, treeNode, refType, setSchemaTree }) {
  const { schema, path } = treeNode;
  /**
   * Dynamically generate indent styles using the length of the path.
   * (length of path = depth of the current treeNode)
   */
  const indentSize = path.length;
  const styles = useStyles(indentSize);
  /**
   * Define the name to illustrate the schema or sub-schema.
   * If a name property is not defined within the schema,
   * set it to null in order to not display any name.
   */
  const name = 'name' in schema ? schema.name : null;
  /**
   * Define the type symbol for the schema or sub-schema's type
   * Types requiring nested structures use the according bracket symbol,
   * Complex types (allOf, anyOf, oneOf, no) use comment notation,
   * the rest simply use highlighted text to illustrate the data type.
   */
  const schemaType = schema._type || schema.type;
  const typeSymbol = (function createTypeSymbol(type) {
    const bracketTypes = [...NESTED_TYPES, 'closeArray', 'closeObject'];
    const combinationTypes = [...COMBINATION_TYPES, 'and', 'or', 'nor'];

    if (bracketTypes.includes(type)) {
      return {
        array: '[',
        object: '{',
        closeArray: ']',
        closeObject: '}',
      }[type];
    }

    if (combinationTypes.includes(type)) {
      const commentText = {
        allOf: '// All of',
        anyOf: '// Any of',
        oneOf: '// One of',
        not: '// Not',
        and: '// and',
        or: '// or',
        nor: '// nor',
      }[type];

      return <span className={classes.comment}>{commentText}</span>;
    }

    return <code className={classes.code}>{type}</code>;
  })(schemaType);
  /**
   * Define the required prefix (*) if the schema type
   * is a required property of an object.
   */
  const requiredPrefix =
    'required' in schema && schema.required === true ? (
      <span className={classes.prefix}>*</span>
    ) : null;
  const containsPrefix =
    'contains' in schema && schema.contains === true ? (
      <span className={classes.prefix}>⊃</span>
    ) : null;
  /**
   * If treeNode is $ref type, create $ref icon button for expanding
   * or shrinking the row depending on the the refType prop.
   */
  const refIcon = {
    none: null,
    default: (
      <IconButton aria-label="expand-ref">
        <ExpandIcon fontSize="large" />
      </IconButton>
    ),
    expanded: (
      <IconButton aria-label="shrink-ref">
        <ShrinkIcon fontSize="large" />
      </IconButton>
    ),
  }[refType];
  /**
   * If treeNode is $ref type, create ref expand/shrink action
   * to be used to expand or collapse a row depending on the refType prop.
   */
  const onRefClick = {
    none: () => {},
    default: () => setSchemaTree(prev => expandRefNode(prev, treeNode)),
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
    /**
     * If there are not descriptor keywords to display,
     * there is no need for any blank line paddings.
     */
    const lines = [];

    if (descriptors.length === 0) {
      return lines;
    }

    /** Create a blank line for each descriptor keyword. */
    descriptors.forEach((keyword, i) => {
      /**
       * For the first descriptor keyword,
       * if specification keywords exists, a blank line should be added
       * to visually separate the specification line and descriptor line.
       * Else, no specifications exists, skip over the first descriptor
       * keyword so that the lines match the number of lines in NormalRightRow
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
        {containsPrefix}
        {name && `${name}: `}
        {typeSymbol}
        {requiredPrefix}
        {refIcon}
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
  treeNode: treeNode.isRequired,
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
};

NormalLeftRow.defaultProps = {
  setSchemaTree: NOOP,
};

export default React.memo(NormalLeftRow);
