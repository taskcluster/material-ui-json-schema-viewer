import React from 'react';
import { shape, string, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

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
   * Types requiring nested structures use the according bracket symbol
   * while others use highlighted text to illustrate the data type.
   */
  const bracketTypes = ['array', 'object', 'closeArray', 'closeObject'];
  const typeSymbol = bracketTypes.includes(schema.type) ? (
    {
      array: '[',
      object: '{',
      closeArray: ']',
      closeObject: '}',
    }[schema.type]
  ) : (
    <code className={classes.code}>{schema.type}</code>
  );
  /** 
   * Define the required prefix (* symbol) if the schema type
   * is a required property of an object.
  */
  const requiredPrefix =
    'required' in schema && schema.required === true ? (
      <span className={classes.requiredPrefix}>*</span>
    ) : null;
  /**
   * Create blank line paddings only for additional keywords
   * (skip over certain keywords not displayed in NormalRightRow)
   * that will have their own lines on the according right row.
   * This enables the left row to have matching number of lines with
   * the right row and align the lines and heights between the two rows.
   */
  const blankLinePaddings = [];
  const skipKeywords = [
    'type',
    'name',
    'description',
    'items',
    'contains',
    'properties',
    'required',
  ];
  const keywords = Object.keys(schema).filter(
    key => !skipKeywords.includes(key)
  );

  keywords.forEach((keyword, i) => {
    if (i > 0) {
      blankLinePaddings.push(
        <div key={`${keyword} line`} className={classes.line} />
      );
    }
  });

  return (
    <div key={schema.type} className={classes.row}>
      <Typography
        component="div"
        variant="subtitle2"
        className={classNames(classes.line, styles.indentation)}>
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
    type: string.isRequired,
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
    requiredPrefix: string.isRequired,
  }).isRequired,
  indent: number.isRequired,
};

export default React.memo(NormalLeftRow);
