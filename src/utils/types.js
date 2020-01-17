import { clone } from 'ramda';
import { COMPLEX_TYPES } from './constants';

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
