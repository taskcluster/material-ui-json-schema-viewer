import React from 'react';
import { shape, string, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { SKIP_KEYWORDS, DESCRIPTOR_KEYWORDS } from '../../utils/constants';

/**
 * Dynamically generate styles for indentations to be used for
 * displaying the data structure of the schemas.
 */
const useStyles = makeStyles(theme => ({
  indentation: {
    marginLeft: indent => `${theme.spacing(indent * 2)}px`,
  },
}));

function NormalLeftRow({ schema, classes, indent }) {
  /**
   * Dynamically generate indent styles according to the given
   * indent props.
   */
  const styles = useStyles(indent);
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
    const bracketTypes = ['array', 'object', 'closeArray', 'closeObject'];
    const combinationTypes = [
      'allOf',
      'anyOf',
      'oneOf',
      'not',
      'and',
      'or',
      'nor',
    ];

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
   * Create blank line paddings if descriptor keywords exists.
   * This enables the left row to have matching number of lines with
   * the right row and align the lines and heights between the two rows.
   */
  const descriptors = Object.keys(schema).filter(key =>
    DESCRIPTOR_KEYWORDS.includes(key)
  );
  const blankLinePaddings =
    descriptors.length === 0
      ? []
      : (function countPaddingLines(schemaInput) {
          const lines = [];
          const specifications = Object.keys(schemaInput).filter(
            key => !SKIP_KEYWORDS.includes(key)
          );

          /**
           * If specification keywords exists (displayed as chips in
           * NormalRightRow), an additional blank line between the chip
           * line and descriptor lines will be added to visually separate
           * the lines. Else, must skip over the first keyword since the
           * type line in NormalLeftRow will substitute as a matching line
           * for the first line in NormalRightRow.
           */
          descriptors.forEach((keyword, i) => {
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
      </Typography>
      {blankLinePaddings}
    </div>
  );
}

NormalLeftRow.propTypes = {
  /**
   * Schema input given to render.
   * May also be a sub-schema in case for array items,
   * object properties or more complex schemas.
   */
  schema: shape({
    /** Type of schema or sub-schema */
    type: string,
    /** Name of schema or sub-schema */
    name: string,
  }).isRequired,
  /**
   * Style for rows and lines for schema viewer.
   * Necessary to maintain consistency with right panel's
   * rows and lines.
   */
  classes: shape({
    row: string.isRequired,
    line: string.isRequired,
    code: string.isRequired,
    comment: string.isRequired,
    prefix: string.isRequired,
  }).isRequired,
  indent: number.isRequired,
};

export default React.memo(NormalLeftRow);
