import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import { makeStyles } from '@material-ui/core/styles';
import NormalLeftRow from '../NormalLeftRow';
import NormalRightRow from '../NormalRightRow';

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    // TODO: change diminsions to fixed width size
    gridTemplateColumns: '[left-panel] 1fr [right-panel] 1fr',
    rowGap: 4,
  },
  leftPanel: {
    // TODO: accept theme
    backgroundColor: 'lightyellow',
    overflowX: 'auto',
  },
  rightPanel: {
    overflowX: 'auto',
  },
  row: {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  rightRow: {
    display: 'grid',
    gridTemplateColumns: '[keyword-column] 1fr [description-column] 1fr',
  },
  keywordColumn: {

  },
  descriptionColumn: {

  },
  line: {
    whiteSpace: 'nowrap',
  },
});

// TODO: eliminate after testing
const exampleSchema = require('../../../schemas/basicDataTypes/string/stringPattern.json');

function SchemaTable() {
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
  const renderArray = (schema) => {

  };

  /**
   * TODO: define renderCombination method
   *       add description comment
   */
  const renderCombination = (schema) => {

  };

  /**
   * Default data type schemas (boolean, null, number, integer, string)
   * are parsed to create 'NormalLeftRow' and 'NormalRightRow' components.
   * These will then be stored into 'leftRows' and 'rightRows' arrays respectively.
   */
  const renderDefault = (schema) => {
    const leftRow = (
      <NormalLeftRow
        key={leftRows.length + 1}
        schema={schema}
        classes={classes}
      />
    );
    const rightRow = (
      <NormalRightRow
        key={rightRows.length + 1}
        schema={schema}
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
  const renderObject = (schema) => {

  };

  /**
   * TODO: define renderRef method
   *       add description comment
   */
  const renderRef = (schema) => {

  };

  /**
   * Schemas are passed to different render methods according to its
   * specific type (combination, array, object, ref, and default).
   * Each method will create rows with the appropriate format to its
   * type and push the rows into 'leftRows' and 'rightRows' respectively.
   *
   * Types other than default schemas may repeatedly call this method
   * within their render method if the schema has a nested structure.
   */
  const renderSchema = (schema) => {
    const combinationTypes = ['allOf', 'anyOf', 'oneOf', 'not'];
    const defaultTypes = ['boolean', 'null', 'number', 'integer', 'string'];

    combinationTypes.forEach((keyword) => {
      if (keyword in schema) {
        renderCombination(schema);
      }
    });
    if (schema.type === 'array') {
      renderArray(schema);
    } else if (schema.type === 'object') {
      renderObject(schema);
    } else if (defaultTypes.includes(schema.type)) {
      renderDefault(schema);
    } else {
      // TODO: handle exception cases of empty JSON schemas
    }
  };

  renderSchema(exampleSchema);

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftPanel}>
        {leftRows}
      </div>
      <div className={classes.rightPanel}>
        {rightRows}
      </div>
    </div>
  );
}

SchemaTable.propTypes = {

};

SchemaTable.defaultProps = {

};

export default SchemaTable;
