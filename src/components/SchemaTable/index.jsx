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

  const leftRows = [];
  const rightRows = [];

  /** 
   *  Default data type schemas (boolean, null, number, integer, string)
   *  are parsed to create both NormalLeftRow and NormalRightRow components.
   *  Each components are then stored into leftRows and rightRows array respectively
   *  so that they can be rendered into the LeftPanel and rightPanel.
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

  renderDefault(exampleSchema);

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
