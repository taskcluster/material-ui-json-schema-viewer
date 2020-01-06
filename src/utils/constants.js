/**
 * Keywords used in schemas that will be skipped over when 
 * creating lines for NormalLeftRow and NormalRightRow.
 * These are typically skipped over since they are already 
 * illustrated in other parts of the SchemaTable
   (ex. symbols in the left panel)
 */
const skipKeywords = [
  '$id',
  '$schema',
  'type',
  'name',
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

export default skipKeywords;
