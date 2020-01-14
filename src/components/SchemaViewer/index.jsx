import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import SchemaTable from '../SchemaTable';
import SchemaTree from '../../utils/schemaTree';

function SchemaViewer({ schema }) {
  /**
   * Create a tree structure based on the given schema.
   * This acts as an intermediary data structure to define the
   * overall structure the schemaTable will create based upon.
   * When a ref is expanded or shrunk, the tree structure will
   * be updated in order to re-create a table where ref rows are
   * either inserted or removed from the current schema table.
   */
  const [schemaTree, setSchemaTree] = useState(new SchemaTree(schema));

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
