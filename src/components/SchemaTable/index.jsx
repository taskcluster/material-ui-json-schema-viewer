import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import MuiGrid from '@material-ui/core/Grid';
import './index.css'; // temporary stylesheet for testing

function SchemaTable() {
  const leftRows = [
    (
      <div>
        <p>[</p>
        <br />
      </div>
    ),
    (
      <div>
        <p>&quot;...&quot;</p>
        <br />
        <br />
      </div>
    ),
    (
      <div>
        <p>]</p>
      </div>
    ),
  ];
  const rightRows = [
    (
      <div>
        <p>uniqueItems: true</p>
        <p>additionalItems: false</p>
      </div>
    ),
    (
      <div>
        <p>(string)</p>
        <p>format: email</p>
        <p>maxLength: 20</p>
      </div>
    ),
    (<div><br /></div>),
  ];
  return (
    <MuiGrid container wrap="nowrap">
      <MuiGrid item className="left-panel">
        {leftRows}
      </MuiGrid>
      <MuiGrid item className="right-panel">
        {rightRows}
      </MuiGrid>
    </MuiGrid>
  );
}

SchemaTable.propTypes = {

};

SchemaTable.defaultProps = {

};

export default SchemaTable;
