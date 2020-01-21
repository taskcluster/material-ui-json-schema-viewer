import { clone, assocPath } from 'ramda';
import { COMBINATION_TYPES, COMPLEX_TYPES } from './constants';

/**
 * Generate a tree that illustrates the recursive data structure
 * of a schema. Each nodes defines the following structure:
 * {
 *   schema: ..       // the schema the node is representing
 *   children: [..]   // further objects of the same structure (for subschemas)
 *   path: [..]       // the path from root to node, array of child indexes in
 *                       sequential order (for $refs and indentation level)
 *                       ex. [1, 0] = node at root.children[1].children[0]
 *                                    also has depth of 1 for indent size.
 *   reference: ..    // the default ref schema (only for ref type nodes)
 *   isExpanded: ..   // whether the node is expanded (only for ref type nodes)
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
  const schemaType = rootNode.schema.type;

  /**
   * If schema has a $ref, add additional property fields:
   * - reference: the default $ref schema node to refer to when fetching
   *              a reference or shrinking a ref node
   * - isExpanded: to store the state of the ref node (false by default)
   */
  if ('$ref' in rootNode.schema) {
    rootNode.reference = clone(rootNode);
    rootNode.isExpanded = false;
  }

  /**
   * Depending on whether the schema has a nested structure,
   * create children nodes according to its type and append them
   * sequentially to the root node.
   */
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
   * (for complex type schemas which do not specify 'type' properties)
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
 *
 */
function fetchRefSchema(schemaTree, refString) {
  const [source, definitionPath] = refString.split('#');

  /**
   * Find the source for the reference
   * TODO: add feature to fetch $refs in separate files or urls
   */
  if (source.length > 0) {
  }

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
 *
 */
export function expandRefNode(schemaTree, refNode) {
  const cloneTree = clone(schemaTree);
  let nodePtr = cloneTree;

  refNode.path.forEach(childIndex => {
    nodePtr = nodePtr.children[childIndex];
  });

  /**
   * Update the isExpanded state of the ref tree node
   * so that the ref row will now display an expanded version.
   */
  nodePtr.isExpanded = true;

  /**
   * If ref tree node does not hold a referenced schema,
   * dynamically fetch the schema and store in $ref property
   * to cache the referenced schema in the ref node.
   */
  if (typeof nodePtr.schema.$ref === 'string') {
    const refString = refNode.reference.schema.$ref;
    const expandedRefSchema = fetchRefSchema(schemaTree, refString);
    const refSchemaTree = createSchemaTree(expandedRefSchema, refNode.path);

    nodePtr.schema = refSchemaTree.schema;
    nodePtr.children = refSchemaTree.children;
    console.log(nodePtr);
  }

  return cloneTree;
}

/**
 *
 */
export function shrinkRefNode(schemaTree, refNode) {
  const cloneTree = clone(schemaTree);
  let nodePtr = cloneTree;

  refNode.path.forEach(childIndex => {
    nodePtr = nodePtr.children[childIndex];
  });
  nodePtr.isExpanded = false;

  return cloneTree;
}
