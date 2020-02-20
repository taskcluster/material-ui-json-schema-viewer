import {
  shape,
  string,
  arrayOf,
  number,
  array,
  oneOf,
  oneOfType,
  bool,
} from 'prop-types';
import { ALL_TYPES } from './constants';

/**
 * Schema prop-type.
 * (custom fields are prefixed with underscore)
 */
export const schema = shape({
  /** Descriptive information about schema */
  title: string,
  description: string,
  _name: string,
  /**
   * Type of schema (either a single type or an array of types)
   */
  _type: oneOfType([arrayOf(oneOf(ALL_TYPES)), oneOf(ALL_TYPES)]),
});
/**
 * Basic tree node structure for schema trees.
 * (denotes the shape of a non-$ref type tree node)
 */
export const basicTreeNode = shape({
  /**
   * Schema given to render upon. May also be a sub-schema in case
   * for array items, object properties or more complex schemas.
   */
  schema: schema.isRequired,
  /**
   * Path from root to current tree node.
   * Necessary to calculate the indent size for the row.
   */
  path: arrayOf(number).isRequired,
  /** 
   * Children nodes of the current node.
   * (include array items, object properties, combination options)
   */
  children: array,
});

/**
 * $Ref Tree node structure for schema trees.
 * (denotes the shape of a $ref type tree node)
 */
export const refTreeNode = shape({
  /**
   * The default tree node version when a $ref is shrunk.
   */
  defaultNode: basicTreeNode.isRequired,
  /**
   * The expanded tree node version when a $ref is expanded.
   * (not a required fields since it is set to null by default)
   */
  expandedNode: basicTreeNode,
  /**
   * whether the node is expanded or not
   */
  isExpanded: bool.isRequired,
});
/**
 * Tree node prop-types within a schema tree.
 */
export const treeNodeTypes = oneOfType([basicTreeNode, refTreeNode]);
/**
 * Empty Function to use for default props
 */
export const NOOP = () => {};
