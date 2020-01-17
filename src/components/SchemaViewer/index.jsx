import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import SchemaTable from '../SchemaTable';
import { createSchemaTree } from '../../utils/schemaTree';

function SchemaViewer({ schema }) {
  /**
   * Create a tree structure based on the given schema.
   * This acts as an intermediary data structure to define the overall
   * structure the schemaTable component will create based upon.
   * It is managed as a state in order to handle the dynamic structure
   * of $ref schemas so that when a cetain $ref is expanded or shrunk,
   * the entire tree structure will be updated to re-create and re-render
   * the schema table.
   */
  const [schemaTree, setSchemaTree] = useState(createSchemaTree(schema));

  return <SchemaTable schemaTree={schemaTree} setSchemaTree={setSchemaTree} />;
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
