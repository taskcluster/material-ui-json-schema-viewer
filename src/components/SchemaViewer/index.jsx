import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import SchemaTable from '../SchemaTable';
import Tree from '../../utils/tree';

function SchemaViewer({ schema }) {
  /**
   * Create a tree structure based on the schema.
   * This acts as an intermediary data structure to define the
   * overall structure before creating the schemaTable.
   * The tree makes it 
   */
  const [schemaTree, setSchemaTree] = useState(new Tree(schema));
  
  return (
    <SchemaTable schemaTree={schemaTree} setSchemaTree={setSchemaTree} />
  );
}

SchemaViewer.propTypes = {
  /** Schema input given to render */
  schema: shape({
    /** Type of schema */
    type: string,
  }),
};
  
SchemaViewer.defaultProps = {
  /** Null type schema is set as default prop */
  schema: {
    type: 'null',
  },
};

export default React.memo(SchemaViewer);
