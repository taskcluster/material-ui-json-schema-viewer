import { clone } from 'ramda';
import { COMPLEX_TYPES } from './constants';

/**
 * Make sure schemas have a type property for identification.
 * Since complex type schemas, either a combination or ref type,
 * do not specify a type property, it is necessary to identify
 * its type and append a type property.
 * If type is not specified purposely, leave schema without type property.
 *
 * Also, make a deep copy of the schema to ensure that the reference isn't
 * altered by unnecessary
 */
export function sanitizeSchema(schema) {
  const cloneSchema = clone(schema);

  if (!('type' in cloneSchema)) {
    COMPLEX_TYPES.forEach(type => {
      if (type in cloneSchema) {
        cloneSchema.type = type;
      }
    });
  }

  return cloneSchema;
}
