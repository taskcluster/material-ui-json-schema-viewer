import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
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
   *
   */
  const renderDefault = (schema) => {
    const keywords = Object.keys(schema);

    const leftRow = (
      <div className="left-row">
        <p className="left-line">{schema.type}</p>
        {keywords.map((keyword) => (
          (keyword !== 'type' && keyword !== 'description') && (
            <br className="left-line blank-line" />
          )
        ))}
      </div>
    );

    const rightRow = (
      <div className="right-row">
        <div className="keywords">
          {keywords.map((keyword) => (
            <p key={keyword} className="right-line">
              {keyword}
              {': '}
              {schema[keyword]}
            </p>
          ))}
        </div>
        <div className="description">
          {('description' in schema) && <p>{schema.description}</p>}
        </div>
      </div>
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
