import React from 'react';
import { instanceOf, func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import NormalLeftRow from '../NormalLeftRow';
import NormalRightRow from '../NormalRightRow';
import Tree from '../../utils/tree';

const useStyles = makeStyles(theme => ({
  /** Schema table displays two-column layout */
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '[left-panel] 1fr [right-panel] 1fr',
    color: theme.palette.text.primary,
  },
  /** The left panel of the Schema Table */
  leftPanel: {
    backgroundColor: theme.palette.background.default,
    borderRight: `${theme.spacing(1)}px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  /** The right panel of the Schema Table */
  rightPanel: {
    backgroundColor: theme.palette.background.default,
    overflowX: 'auto',
  },
  /** Rows for the left and right panels */
  row: {
    borderBottom: `${theme.spacing(0.25)}px solid ${theme.palette.divider}`,
    minHeight: theme.spacing(3),
    width: '100%',
  },
  lastRow: {
    borderBottom: 'none',
  },
  /**
   * Lines within the rows.
   * (a single row may constitute of more than one line depending
   *  on how many keywords the given schema or sub-schema defines)
   */
  line: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    height: theme.spacing(3.5),
  },
  /**
   * Highlighting the type for the schema or sub-schema displayed
   * in the left panel of the schema table component.
   */
  code: {
    backgroundColor: theme.palette.grey[300],
    padding: `0 ${theme.spacing(0.5)}px`,
  },
  /** Comments within the left panel (used for combination types) */
  comment: {
    color: theme.palette.text.hint,
  },
  /**
   * Prefixes used to notate special properties of data types in
   * lines of NormalLeftRow. (ex. 'required', 'contains' keywords)
   */
  prefix: {
    color: theme.palette.error.main,
    padding: `0 ${theme.spacing(0.5)}px}`,
  },
}));

function SchemaTable({ schemaTree, setSchemaTree }) {
  /**
   * Generate classes to define overall style for the schema table.
   */
  const classes = useStyles();
  /**
   * Rows for the left and right column are stored separately
   * so that the left and right panels can render the rows separately.
   * This enable the viewer to have a two-column layout with each of
   * the columns having its own horizontal scroll.
   */
  const leftRows = [];
  const rightRows = [];

  /**
   * Create a single normal row with a left and right column each.
   * The result is stored in an object format in order for the
   * pushRow method to easily access each left and right column
   * of the single row and push them to leftRows and rightRows respectively.
   */
  function createNormalRow(schemaInput, indent) {
    return {
      leftRow: (
        <NormalLeftRow
          key={`left-row-${leftRows.length + 1}`}
          schema={schemaInput}
          classes={classes}
          indent={indent}
        />
      ),
      rightRow: (
        <NormalRightRow
          key={`right-row-${rightRows.length + 1}`}
          schema={schemaInput}
          classes={classes}
        />
      ),
    };
  }

  /**
   * Create a row to close off an array or object type schema.
   * The left row displays a closing bracket of the type while
   * the right row only consists of blank line padding.
   */
  function createLiteralRow(type, indent) {
    const literalType = {
      array: 'closeArray',
      object: 'closeObject',
      allOf: 'and',
      anyOf: 'or',
      oneOf: 'or',
      not: 'nor',
    }[type];
    const literalSchema = {
      type: literalType,
    };

    return createNormalRow(literalSchema, indent);
  }

  /**
   * Takes a single row as input, created from createNormalRow()
   * method, and pushes the left column and right column of the
   * row into the leftRows and rightRows respectively.
   */
  function pushRow(row) {
    leftRows.push(row.leftRow);
    rightRows.push(row.rightRow);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftPanel}>{leftRows}</div>
      <div className={classes.rightPanel}>{rightRows}</div>
    </div>
  );
}

SchemaTable.propTypes = {
  /** 
   * Schema tree structure defining the overall structure
   * for the schema table component.
   */
  schemaTree: instanceOf(Tree).isRequired,
  /**
   * Function to update schemaTree structure.
   * Used specifically for expanding or shrinking a $ref.
   */
  setSchemaTree: func.isRequired,
};

export default React.memo(SchemaTable);
