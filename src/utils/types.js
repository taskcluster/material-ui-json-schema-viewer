import { clone } from 'ramda';
import { COMPLEX_TYPES } from './constants';

/**
 * Make sure schemas have a type property for identification.
 * Since complex type schemas, either a combination or ref type,
 * do not specify a type property, it is necessary to identify
 * its type and append a type property.
 * If type is not specified purposely, leave schema without type property.
 */
export function identifySchemaType(schemaInput) {
  if (!('type' in schemaInput)) {
    const cloneSchema = clone(schemaInput);

    COMPLEX_TYPES.forEach(type => {
      if (type in schemaInput) {
        cloneSchema.type = type;
      }
    });

    return cloneSchema;
  }

  return schemaInput;
}
