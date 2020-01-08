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

/**
 * Keywords used in schema that are descriptors.
 * These are typically displayed in the rows of the right panel,
 * separated by a blank line from the displayed chips.
 */
export const DESCRIPTOR_KEYWORDS = ['description', 'title'];
