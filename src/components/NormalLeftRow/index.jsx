import React from 'react';
import { shape, string, arrayOf, number, array, func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/AddCircleOutline';
import MinusIcon from '@material-ui/icons/RemoveCircleOutline';
import { expandRefNode, shrinkRefNode } from '../../utils/schemaTree';
import {
  SKIP_KEYWORDS,
  DESCRIPTIVE_KEYWORDS,
  COMBINATION_TYPES,
  NESTED_TYPES,
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
  /**
   * Deconstruct the properties of the given treeNode to use for rendering.
   */
  const { schema, path } = treeNode;
  /**
   * Dynamically generate indent styles according to the given
   * depth of the treeNode props.
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
  })(schema.type);
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
   * If given treeNode is $ref type, create $ref button for expanding or
   * shrinking depending on the isExpanded state.
   */
  const refButton = (function createRefButton(refType) {
    if (refType === 'none') {
      return null;
    }

    /** 
     * If row is an expanded ref row, create a button for shrinking the ref.
     */
    if (refType === 'expanded') {
      return (
        <IconButton
          aria-label="shrink-ref"
          onClick={() => setSchemaTree(prev => shrinkRefNode(prev, treeNode))}>
          <MinusIcon />
        </IconButton>
      );
    }

    /** 
     * Else, the row is a shrunk ref row, create a button for expanding the ref.
     */
    return (
      <IconButton
        aria-label="expand-ref"
        onClick={() => setSchemaTree(prev => expandRefNode(prev, treeNode))}>
        <PlusIcon />
      </IconButton>
    );
  })(refType);
  /**
   * Create blank line paddings if descriptor keywords exists.
   * This enables the left row to have matching number of lines with
   * the right row and align the lines and heights between the two rows.
   */
  const descriptors = Object.keys(schema).filter(key =>
    DESCRIPTIVE_KEYWORDS.includes(key)
  );
  const blankLinePaddings =
    descriptors.length === 0
      ? []
      : (function createPaddingLines(schemaInput) {
          const lines = [];
          const specifications = Object.keys(schemaInput).filter(
            key => !SKIP_KEYWORDS.includes(key)
          );

          /** Display a blank line for each descriptor keyword. */
          descriptors.forEach((keyword, i) => {
            /**
             * If specification keywords exists (displayed as chips in
             * NormalRightRow), a blank line should be added before the
             * descriptor lines to visually separate the lines.
             * Else, skip over the first descriptor keyword to match
             * the number of lines in NormalRightRow
             */
            if (i === 0) {
              if (specifications.length > 0) {
                lines.push(
                  <div key="separator-line" className={classes.line} />
                );
                lines.push(
                  <div key={`${keyword}-line`} className={classes.line} />
                );
              }
            } else {
              lines.push(
                <div key={`${keyword}-line`} className={classes.line} />
              );
            }
          });

          return lines;
        })(schema);

  return (
    <div key={schema.type} className={classes.row}>
      <Typography
        component="div"
        variant="subtitle2"
        className={classNames(classes.line, styles.indentation)}>
        {containsPrefix}
        {name && `${name}: `}
        {typeSymbol}
        {requiredPrefix}
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
   * Object to denote tree node data structure for a certain schema.
   */
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
    /** Path from root to current tree node */
    path: arrayOf(number).isRequired,
    children: array,
  }).isRequired,
  refType: string.isRequired,
  setSchemaTree: func,
};

NormalLeftRow.defaultProps = {
  setSchemaTree: () => {},
};

export default React.memo(NormalLeftRow);
