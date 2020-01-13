import { clone, omit } from 'ramda';
import { COMBINATION_TYPES } from './constants';
import { identifySchemaType } from './types';
import TreeNode from './treeNode';
import RefTreeNode from './refTreeNode';

class Tree {
  constructor(schema) {
    this.root = this.createTree(schema);
  }

  /**
   * Create a tree data structure based on the given schema.
   * The schema will be directed to a method in order to
   * create the appropriate tree node depending on its type.
   * Types other than default type schemas may repeatedly call on
   * this method within their own constructor methods if the schema
   * defines a nested structure.
   */
  createTree(schema) {
    const schemaWithType = identifySchemaType(schema);
    const schemaType = schemaWithType.type;
    let treeNode = null;

    if (COMBINATION_TYPES.includes(schemaType)) {
      treeNode = this.createCombinationTree(schemaWithType);
    } else if (schemaType === '$ref') {
      treeNode = this.createRefTree(schemaWithType);
    } else if (schemaType === 'array') {
      treeNode = this.createArrayTree(schemaWithType);
    } else if (schemaType === 'object') {
      treeNode = this.createObjectTree(schemaWithType);
    } else {
      treeNode = this.createDefaultNode(schemaWithType);
    }

    return treeNode;
  }

  /**
   * Create a child treeNode based on the given subschema
   * and append it to the given rootNode.
   */
  createChild(rootNode, subschema) {
    const childNode = this.createTree(subschema);

    rootNode.appendChild(childNode);
  }

  /**
   * Create a node for combination data type schemas (allOf, anyOf, oneOf, not).
   * Possible options should be created as children nodes by calling
   * back on the createTreeNode method and appended to the combinationType node.
   * The return value will either be a single node or a subtree data structure.
   */
  createCombinationTree(schema) {
    /**
     * Create a clone schema where all subschemas are removed
     * since subschemas will be contained within the child nodes.
     */
    const cloneSchema = omit(COMBINATION_TYPES, schema);
    const combTypeNode = new TreeNode(cloneSchema);
    const combType = schema.type;

    /**
     * If there are multiple options (defined in array),
     * create options as child nodes in sequential order.
     */
    if (Array.isArray(schema[combType])) {
      const optionList = schema[combType];

      optionList.forEach(subschema => {
        this.createChild(combTypeNode, subschema);
      });
    } else {
      /**
       * else, if only one option exists, create one child node.
       */
      this.createChild(combTypeNode, schema[combType]);
    }

    return combTypeNode;
  }

  /**  */
  createRefTree(schema) {
    const refTypeNode = RefTreeNode(schema);

    return refTypeNode;
  }

  /**
   * Create a node for array data type schemas.
   * Array items should be created as children nodes by calling
   * back on the createTreeNode method and appended to the arrayType node.
   * The return value will either be a single node or a subtree data structure.
   */
  createArrayTree(schema) {
    /**
     * Create a clone schema where all subschemas are removed
     * since subschemas will be contained within the child nodes.
     */
    const cloneSchema = omit(['items', 'contains'], schema);
    const arrayTypeNode = new TreeNode(cloneSchema);

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
          this.createChild(arrayTypeNode, subschema);
        });
      } else {
        /**
         * else, items are defined by list vaidation (each item matches
         * the same schema), create only one child node.
         */
        this.createChild(arrayTypeNode, schema.items);
      }
    }

    /**
     * If array items are defined as contains (TODO: ),
     * (create a subschema with 'contains' key set to true in order to
     *  use the contains symbol in NormalLeftRow)
     */
    if ('contains' in schema) {
      const cloneSubschema = clone(schema.contains);

      cloneSubschema.contains = true;
      this.createChild(arrayTypeNode, cloneSubschema);
    }

    return arrayTypeNode;
  }

  /**
   * Create a node for object data type schemas.
   * Object properties should be created as children nodes by calling
   * back on the createTreeNode method and appended to the objectType node.
   * The return value will either be a single node or a subtree data structure.
   */
  createObjectTree(schema) {
    /**
     * Create a clone schema where all subschemas are removed
     * since subschemas will be contained within the child nodes.
     */
    const cloneSchema = omit(['properties'], schema);
    const objectTypeNode = new TreeNode(cloneSchema);

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
        const cloneSubschema = clone(schema.properties[property]);

        cloneSubschema.name = property;

        if (requiredList.has(property)) {
          cloneSubschema.required = true;

          this.createChild(objectTypeNode, cloneSubschema);
        }
      });
    }

    return objectTypeNode;
  }

  /**
   * Create a node for default data type schemas.
   * (boolean, null, number, integer, string)
   */
  createDefaultNode(schema) {
    const defaultTypeNode = new TreeNode(schema);

    return defaultTypeNode;
  }
}

export default Tree;
