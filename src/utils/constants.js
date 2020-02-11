/**
 * Keywords used in schema to define nested types.
 * Define schemas for structure with an open row, child rows, and close row.
 */
export const NESTED_TYPES = ['object', 'array'];
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
 * Keywords used in schema that are descriptors.
 * These are used to display in the rows of the right panel
 * in separation with specification keywords by a blank line.
 */
export const DESCRIPTIVE_KEYWORDS = ['title', 'description'];
/**
 * Custom keywords created within the schemas of the tree nodes.
 * An underscore is prefixed for these keywords in order to
 * distinguish them with the built-in keywords for schemas.
 */
export const CUSTOM_KEYWORDS = ['_type', '_contains', '_required', '_name'];
/**
 * Keywords used in schemas that will be ignored when 
 * creating lines for the rows in the left and right panels.
 * These are typically skipped over since they may already be
 * illustrated in other formats within the SchemaTable.
   (ex. symbols in the left panel)
 */
export const SKIP_KEYWORDS = [
  ...CUSTOM_KEYWORDS,
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
  '$ref',
  'definitions',
];
/**
 * Max number of chips allowed to be displayed within a single line.
 */
export const MAX_NUMBER_OF_CHIPS = 3;
/**
 *
 */
export const TOOLTIP_DESCRIPTIONS = {
  additionalItems: 'Additional items must match a sub-schema.',
  additionalProperties: 'Additional properties must match a sub-schema.',
  dependencies:
    'The schema of the object may change based on the presence of certain special properties.',
  propertyNames: 'Names of properties must follow a specified convention.',
  patternProperties:
    'Property names or values should match the specified pattern.',
};
