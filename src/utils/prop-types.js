import { shape, string, arrayOf, number, array, oneOf } from 'prop-types';
import { ALL_TYPES } from './constants';

export const schema = shape({
  /** Descriptive information about schema */
  title: string,
  description: string,
  _name: string,
  /** Type of schema */
  _type: oneOf(ALL_TYPES),
});

export const treeNode = shape({
  /**
   * Schema given to render upon. May also be a sub-schema in case
   * for array items, object properties or more complex schemas.
   */
  schema: schema.isRequired,
  /**
   * Path from root to current tree node.
   * Necessary in order to calculate the indent size.
   */
  path: arrayOf(number).isRequired,
  /** children nodes of the current node */
  children: array,
});

/**
 * Empty Function to use for default props
 */
export const NOOP = () => {};
