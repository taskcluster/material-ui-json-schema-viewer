import { COMBINATION_TYPES } from './constants';
import { sanitizeSchema } from './types';

/**
 * Schema tree data structure which defines the overall
 * structure the schema table will be rendered based on.
 * Each of the nodes in the tree will be traversed in
 * pre-order to effectively transfer the nested structures
 * into rows with indentations in the schemaTable component.
 * Particularly, it is useful for dynamically adding or
 * removing rows when a $ref is expanded or shrunk.
 */

/**
 * Create a tree based on the given schema.
 * The schema will be directed to a method in order to
 * create the appropriate tree node depending on its type.
 * Types other than default type schemas may repeatedly call on
 * this method within their own constructor methods if the schema
 * defines a nested structure.
 */
export function createTree(schema, depth = 0) {
  /**
   * Create a tree node object to
   * which holds
   * the schema is always a clone object
   */
  const rootNode = {
    schema: sanitizeSchema(schema),
    children: [],
    depth,
  };
  /**
   * Depending on whether the schema has a nested structure,
   * create children nodes to the
   */
  const schemaType = rootNode.schema.type;

  if (COMBINATION_TYPES.includes(schemaType)) {
    createCombinationTree(rootNode);
  } else if (schemaType === '$ref') {
    createRefTree(rootNode);
  } else if (schemaType === 'array') {
    createArrayTree(rootNode);
  } else if (schemaType === 'object') {
    createObjectTree(rootNode);
  }

  return rootNode;
}

/**
 * Create a child node based on the given subschema
 * and append it to the given rootNode.
 * (the child node may be a single node or a subtree)
 */
export function createChild(rootNode, subschema) {
  const childNode = createTree(subschema, rootNode.depth + 1);

  rootNode.children.push(childNode);
}

/**
 * Create a node for combination data type schemas (allOf, anyOf, oneOf, not).
 * Possible options should be created as children nodes by calling
 * back on the createTreeNode method and appended to the combinationType node.
 * The return value will either be a single node or a subtree data structure.
 */
export function createCombinationTree(rootNode) {
  const { schema } = rootNode;
  const combType = schema.type;

  /**
   * If there are multiple options (defined in array),
   * create options as child nodes in sequential order.
   */
  if (Array.isArray(schema[combType])) {
    const optionList = schema[combType];

    optionList.forEach(subschema => {
      createChild(rootNode, subschema);
    });
  } else {
    /**
     * else, if only one option exists, create one child node.
     */
    createChild(rootNode, schema[combType]);
  }
}

/**
 * Create a node for $ref type schemas.
 */
export function createRefTree(rootNode) {
  rootNode.isExpanded = false;
}

/**
 * Create a node for array data type schemas.
 * Array items should be created as children nodes by calling
 * back on the createTreeNode method and appended to the arrayType node.
 * The return value will either be a single node or a subtree data structure.
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
      schema.items.forEach(subschema => {
        createChild(rootNode, subschema);
      });
    } else {
      /**
       * else, items are defined by list vaidation (each item matches
       * the same schema), create only one child node.
       */
      createChild(rootNode, schema.items);
    }
  }

  /**
   * If array items are defined as contains (TODO: ),
   * (add a 'contains' key set to true to the subschema
   *  in order to use the contains symbol in NormalLeftRow)
   */
  if ('contains' in schema) {
    const subschema = schema.contains;

    subschema.contains = true;
    createChild(rootNode, subschema);
  }
}

/**
 * Create a node for object data type schemas.
 * Object properties should be created as children nodes by calling
 * back on the createTreeNode method and appended to the objectType node.
 * The return value will either be a single node or a subtree data structure.
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
    propertyList.forEach(property => {
      const subschema = schema.properties[property];

      subschema.name = property;
      
      if (requiredList.has(property)) {
        subschema.required = true;
      }

      createChild(rootNode, subschema);
    });
  }
}
