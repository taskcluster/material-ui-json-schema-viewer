import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import NormalLeftRow from '../NormalLeftRow';
import NormalRightRow from '../NormalRightRow';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '[left-panel] 1fr [right-panel] 1fr',
  },
  leftPanel: {
    backgroundColor: theme.palette.background.paper,
    borderRight: `8px solid ${theme.palette.text.secondary}`,
    overflowX: 'auto',
  },
  rightPanel: {
    backgroundColor: theme.palette.background.paper,
    overflowX: 'auto',
  },
  row: {
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
  },
  lastRow: {
    borderBottom: 'none',
  },
  rightRow: {
    display: 'grid',
    gridTemplateColumns: '[keyword-column] 1fr [description-column] 1fr',
  },
  keywordColumn: {},
  descriptionColumn: {},
  line: {
    margin: 0,
    whiteSpace: 'nowrap',
  },
}));

function SchemaTable({ schema }) {
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
   * TODO: define renderArray method
   *       add description comment
   */
  const renderArray = schemaInput => (
    <React.Fragment>{schemaInput}</React.Fragment>
  );
  /**
   * TODO: define renderCombination method
   *       add description comment
   */
  const renderCombination = schemaInput => (
    <React.Fragment>{schemaInput}</React.Fragment>
  );
  /**
   * Default data type schemas (boolean, null, number, integer, string)
   * are parsed to create 'NormalLeftRow' and 'NormalRightRow' components.
   * These will then be stored into 'leftRows' and 'rightRows' arrays each.
   */
  const renderDefault = schemaInput => {
    const leftRow = (
      <NormalLeftRow
        key={leftRows.length + 1}
        schema={schemaInput}
        classes={classes}
      />
    );
    const rightRow = (
      <NormalRightRow
        key={rightRows.length + 1}
        schema={schemaInput}
        classes={classes}
      />
    );

    leftRows.push(leftRow);
    rightRows.push(rightRow);
  };

  /**
   * TODO: define renderObject method
   *       add description comment
   */
  const renderObject = schemaInput => (
    <React.Fragment>{schemaInput}</React.Fragment>
  );
  /**
   * TODO: define renderRef method
   *       add description comment
   */
  const renderRef = schemaInput => (
    <React.Fragment>{schemaInput}</React.Fragment>
  );
  /**
   * Schemas are passed to different render methods according to its
   * specific type (combination, array, object, ref, and default).
   * Each method will create rows with the appropriate format to its
   * type and push the rows into 'leftRows' and 'rightRows' respectively.
   * The rows will then be rendered within the left and right panels.
   * Types other than default schemas may repeatedly call this method
   * within their render method if the schema has a nested structure.
   */
  const renderSchema = schemaInput => {
    if (
      'allOf' in schemaInput ||
      'anyOf' in schemaInput ||
      'oneOf' in schemaInput ||
      'not' in schemaInput
    ) {
      renderCombination(schemaInput);
    } else if ('$ref' in schemaInput) {
      renderRef(schemaInput);
    } else if (schemaInput.type === 'array') {
      renderArray(schemaInput);
    } else if (schemaInput.type === 'object') {
      renderObject(schemaInput);
    } else {
      renderDefault(schemaInput);
    }
    // TODO: handle empty json schemas

    return (
      <div className={classes.wrapper}>
        <div className={classes.leftPanel}>{leftRows}</div>
        <div className={classes.rightPanel}>{rightRows}</div>
      </div>
    );
  };

  return <Fragment>{renderSchema(schema)}</Fragment>;
}

SchemaTable.propTypes = {
  schema: shape({
    type: string,
  }),
};

SchemaTable.defaultProps = {
  schema: {
    type: 'null',
  },
};

export default React.memo(SchemaTable);
