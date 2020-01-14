/**
 * Keywords used in schema to define combination types.
 */
export const COMBINATION_TYPES = ['allOf', 'anyOf', 'oneOf', 'not'];

/**
 * Keywords used in schema to define complex types.
 * This includes keywords used to define combination types.
 */
export const COMPLEX_TYPES = [...COMBINATION_TYPES, '$ref'];

/**
 * Keywords used in schema to define nested types.
 * This define a structure for an open row, child rows, and close row.
 */
export const NESTED_TYPES = ['object', 'array'];

/**
 * Keywords used in schema that are descriptors.
 * These are used to display in the rows of the right panel
 * in separation with specification keywords by a blank line.
 */
export const DESCRIPTIVE_KEYWORDS = ['description', 'title'];

/**
 * Keywords used in schemas that will be skipped over when 
 * creating lines for the rows in the right panel.
 * These are typically skipped over since they are already 
 * illustrated in other parts of the SchemaTable
   (ex. symbols in the left panel)
 */
export const SKIP_KEYWORDS = [
  '$id',
  '$schema',
  'type',
  'name',
  'title',
  'description',
  'items',
  'contains',
  'properties',
  'required',
  'allOf',
  'anyOf',
  'oneOf',
  'not',
];
