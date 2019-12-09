import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import './index.css'; // temporary stylesheet for testing (TODO: refactor to use MUI styles)

// TODO: eliminate after testing
const exampleSchema = require('../../../schemas/basicDataTypes/string/stringPattern.json');

function SchemaTable() {
  const leftRows = [];
  const rightRows = [];

  const renderDefault = (schema) => {
    const { type } = schema;
    const keywords = Object.keys(schema);

    const leftRow = (
      <div className="left-row">
        <p className="left-line">{type}</p>
        {keywords.map((keyword) => (
          (keyword !== 'type' && keyword !== 'description') && (
            <br className="left-line blank-line" />
          )
        ))}
      </div>
    );
    leftRows.push(leftRow);

    const rightRow = (
      <div className="right-row">
        <div className="keywords">
          {keywords.map((keyword) => (
            <p className="right-line">
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
    rightRows.push(rightRow);
  };

  renderDefault(exampleSchema);

  return (
    <div className="wrapper">
      <div className="left-panel">
        {leftRows}
      </div>
      <div className="right-panel">
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
