import { shape, string, arrayOf, number, array } from 'prop-types';

export const treeNode = shape({
  /**
   * Schema given to render upon. May also be a sub-schema in case
   * for array items, object properties or more complex schemas.
   */
  schema: shape({
    /** Type of schema or sub-schema */
    type: string,
    /** Name of schema or sub-schema */
    name: string,
  }).isRequired,
  /**
   * Path from root to current tree node.
   * Necessary in order to calculate the indent size.
   */
  path: arrayOf(number).isRequired,
  /** children nodes of the current node */
  children: array,
});
