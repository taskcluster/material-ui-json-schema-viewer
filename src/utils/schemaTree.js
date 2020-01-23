import { clone } from 'ramda';
import { COMBINATION_TYPES, COMPLEX_TYPES } from './constants';

/**
 * Generate a tree that illustrates the recursive structure of a schema.
 * A single node within the tree defines the following structure:
 * {
 *   schema: ..       // the schema the node is representing
 *   children: [..]   // node objects of the same structure (for subschemas)
 *   path: [..]       // the path from root to node, array of child indexes in
 *                       sequential order (for $refs and indentation level)
 *                       ex. [1, 0] = node at root.children[1].children[0]
 *                                    also has depth of 1 for indent size.
 * }
 *
 * If node is a ref node, it may have a difference structure:
 * {
 *   defaultNode: ..  // the default node structure when a $ref is shrinked
 *                       (a node object as illustrated above)
 *   expandedNode: .. // the expanded node strucutre when a $ref is expanded
 *                       (a node object as illustrated above)
 *   isExpanded: ..   // whether the node is expanded or not
 * }
 */
export function createSchemaTree(schema, path = []) {
  /**
   * Create a root node object for the tree/subtree based on the schema.
   * (make sure that nodes store only sanitized schemas)
   */
  const rootNode = {
    schema: sanitizeSchema(schema),
    children: [],
    path,
  };

  /**
   * If schema is a $ref type, create a ref node object instead.
   * (By default, 'isExpanded' is false to render ref row in collapsed form)
   */
  if ('$ref' in rootNode.schema) {
    return {
      defaultNode: rootNode,
      expandedNode: null,
      isExpanded: false,
    };
  }

  /**
   * Depending on whether the schema has a nested structure,
   * create children nodes according to its type and append them
   * sequentially as children to the root node.
   */
  const schemaType = rootNode.schema.type;

  if (COMBINATION_TYPES.includes(schemaType)) {
    createCombinationTree(rootNode);
  } else if (schemaType === 'array') {
    createArrayTree(rootNode);
  } else if (schemaType === 'object') {
    createObjectTree(rootNode);
  }

  return rootNode;
}

/**
 * Create a clone of the given schema to ensure that the schema objects
 * defined in tree nodes are not references but rather, separate objects
 * non-affected nor affecting the actual JSON schema files.
 * This enables direct changes in the properties and structures of the nodes
 * in the schema tree to be made so that we can dynamically alter the
 * structure for the schema table component.
 */
export function sanitizeSchema(schema) {
  const cloneSchema = clone(schema);

  /**
   * Make sure schemas have a type property for identification.
   * (since complex type schemas do not specify 'type' properties)
   * If the type is not specified purposely, leave type property out.
   */
  if (!('type' in cloneSchema)) {
    COMPLEX_TYPES.forEach(type => {
      if (type in cloneSchema) {
        cloneSchema.type = type;
      }
    });
  }

  return cloneSchema;
}

/**
 * Create a child node based on the given subschema and append it to
 * the rootNode. (the child node may be a single node or a subtree)
 */
export function createChildNode(rootNode, subschema, childIndex) {
  const childNode = createSchemaTree(subschema, [...rootNode.path, childIndex]);

  rootNode.children.push(childNode);
}

/**
 * Create a tree for combination data type schemas (allOf, anyOf, oneOf, not).
 * Possible options should be created as children nodes by calling back on
 * the createSchemaTree method and appended to the given root node.
 */
export function createCombinationTree(rootNode) {
  const { schema } = rootNode;
  const combType = schema.type;

  /**
   * If there are multiple options (defined in array form),
   * create option child nodes and append them in sequential order.
   */
  if (Array.isArray(schema[combType])) {
    const optionList = schema[combType];

    optionList.forEach((subschema, childIndex) => {
      createChildNode(rootNode, subschema, childIndex);
    });
  } else {
    /**
     * else, if only one option exists, create one child node and append.
     */
    createChildNode(rootNode, schema[combType], 0);
  }
}

/**
 * Create a tree for array data type schemas.
 * Array items should be created as children nodes by calling
 * back on the createSchemaTree method and appended to given root node.
 */
export function createArrayTree(rootNode) {
  const { schema } = rootNode;

  /**
   * Create child nodes only if array items are defined.
   */
  if ('items' in schema) {
    /**
     * If array items are defined by tuple vaidation (each item may
     * have a different schema and the order of items is important),
     * create array items as child nodes in sequential order.
     */
    if (Array.isArray(schema.items)) {
      schema.items.forEach((subschema, childIndex) => {
        createChildNode(rootNode, subschema, childIndex);
      });
    } else {
      /**
       * else, items are defined by list vaidation (each item matches
       * the same schema), create only one child node.
       */
      createChildNode(rootNode, schema.items, 0);
    }
  }

  /**
   * If array items are defined via 'contains' keyword,
   * (add a 'contains' key set to true to the subschema
   *  in order to use the contains symbol in NormalLeftRow)
   */
  if ('contains' in schema) {
    const subschema = schema.contains;
    const childIndex = rootNode.children.length;

    subschema.contains = true;
    createChildNode(rootNode, subschema, childIndex);
  }
}

/**
 * Create a tree for object data type schemas.
 * Object properties should be created as children nodes by calling
 * back on the createSchemaTree method and appended to given root node.
 */
export function createObjectTree(rootNode) {
  const { schema } = rootNode;

  /**
   * Create child nodes only if object properties are defined.
   */
  if ('properties' in schema) {
    /**
     * Memoize required properties in advance for checking if a certain
     * property is required within the object type schema.
     */
    const requiredList =
      'required' in schema ? new Set(schema.required) : new Set();
    const propertyList = Object.keys(schema.properties);

    /**
     * Create object properties as child nodes in sequential order.
     * Make sure to add a name and required field for each of the subschemas
     * so that they are displayed accordingly when creating schemaTable rows.
     */
    propertyList.forEach((property, childIndex) => {
      const subschema = schema.properties[property];

      subschema.name = property;

      if (requiredList.has(property)) {
        subschema.required = true;
      }

      createChildNode(rootNode, subschema, childIndex);
    });
  }
}

/**
 * Fetch the reference schema defined by the refString
 * @param {*} refString: value of $ref field within a schema
 */
function fetchRefSchema(schemaTree, refString) {
  const [source, definitionPath] = refString.split('#');
  /**
   * Find the source for the reference
   * TODO: add feature to fetch $refs in separate files or urls
  if (source.length > 0) {
  }
   */
  /** Find the definition within the source */
  const parameters = definitionPath.split('/');
  let ptr = schemaTree.schema;

  parameters.forEach(parameter => {
    if (parameter.length > 0) {
      ptr = ptr[parameter];
    }
  });

  return ptr;
}

/**
 * Update the refNode's state to expanded form.
 * @param {*} refDefaultNode: a refNode's defaultNode field
 */
export function expandRefNode(schemaTree, refDefaultNode) {
  /**
   * Create a clone of the schemaTree to maintain immutability.
   */
  const cloneTree = clone(schemaTree);
  /**
   * Traverse the clone tree using the refDefaultNode's path
   * to find the corresponding ref node within the clone tree.
   * ('nodePtr' ultimately points to a refNode with a structure
   *   of defaultNode, expandedNode, isExpanded fields)
   */
  let nodePtr = cloneTree;

  refDefaultNode.path.forEach(childIndex => {
    nodePtr = nodePtr.children[childIndex];
  });

  /**
   * Update the 'isExpanded' state of the ref node so that
   * the ref row will now display an expanded version instead.
   */
  nodePtr.isExpanded = true;

  /**
   * If ref tree node has never referenced the $ref schema before,
   * dynamically fetch the schema and store in expandedNode field
   * in order to cache the referenced schema within the ref node.
   */
  if (!nodePtr.expandedNode) {
    const refString = refDefaultNode.schema.$ref;
    const expandedRefSchema = fetchRefSchema(schemaTree, refString);

    nodePtr.expandedNode = createSchemaTree(
      expandedRefSchema,
      refDefaultNode.path
    );
  }

  return cloneTree;
}

/**
 * Update the refNode's state to collapsed form.
 * @param {*} refDefaultNode: a refNode's defaultNode field
 */
export function shrinkRefNode(schemaTree, refDefaultNode) {
  /**
   * Create a clone of the schemaTree to maintain immutability.
   */
  const cloneTree = clone(schemaTree);
  /**
   * Traverse the clone tree using the refDefaultNode's path
   * to find the corresponding ref node within the clone tree.
   * ('nodePtr' ultimately points to a refNode with a structure
   *   of defaultNode, expandedNode, isExpanded fields)
   */
  let nodePtr = cloneTree;

  refDefaultNode.path.forEach(childIndex => {
    nodePtr = nodePtr.children[childIndex];
  });

  /**
   * Update the 'isExpanded' state of the ref node so that
   * the ref row will now display a collapsed version instead.
   */
  nodePtr.isExpanded = false;

  return cloneTree;
}
