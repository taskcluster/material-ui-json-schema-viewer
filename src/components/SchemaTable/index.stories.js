import React, { Fragment } from 'react';
import SchemaTable from './index';
import { F } from 'ramda';

export default {
  title: 'Schema Table',
  component: SchemaTable,
};

const defaultSchemas = {
  boolean: require('../../../schemas/basicDataTypes/boolean/boolean.json'),
  null: require('../../../schemas/basicDataTypes/null/null.json'),
  integer: require('../../../schemas/basicDataTypes/numeric/integer.json'),
  numberMultiples: require('../../../schemas/basicDataTypes/numeric/numberMultiples.json'),
  numberRange: require('../../../schemas/basicDataTypes/numeric/numberRange.json'),
  stringPattern: require('../../../schemas/basicDataTypes/string/stringPattern.json'),
  stringFormat: require('../../../schemas/basicDataTypes/string/stringFormat.json'),
};
const arraySchemas = {
  emptyArray: require('../../../schemas/basicDataTypes/array/emptyArray.json'),
  listValidation: require('../../../schemas/basicDataTypes/array/listValidation.json'),
  tupleValidation: require('../../../schemas/basicDataTypes/array/tupleValidation.json'),
  containsValidations: require('../../../schemas/basicDataTypes/array/containsValidation.json'),
  additionalItems: require('../../../schemas/basicDataTypes/array/additionalItems.json'),
};
const objectSchemas = {
  emptyObject: require('../../../schemas/basicDataTypes/object/emptyObject.json'),
  simpleObject: require('../../../schemas/basicDataTypes/object/simpleObject.json'),
  propertySpecification: require('../../../schemas/basicDataTypes/object/propertySpecifications.json'),
  propertyDependency: require('../../../schemas/basicDataTypes/object/propertyDependencies.json'),
  requiredProperties: require('../../../schemas/basicDataTypes/object/requiredProperties.json'),
};

export const defaultType = () => (
  <Fragment>
    <h3>Boolean</h3>
    <SchemaTable schema={defaultSchemas.boolean} />
    <h3>Null</h3>
    <SchemaTable schema={defaultSchemas.null} />
    <h3>Integer</h3>
    <SchemaTable schema={defaultSchemas.integer} />
    <h3>Number</h3>
    <SchemaTable schema={defaultSchemas.numberRange} />
    <h3>String</h3>
    <SchemaTable schema={defaultSchemas.stringPattern} />
  </Fragment>
);
export const arrayType = () => (
  <Fragment>
    <h3>List Validation</h3>
    <SchemaTable schema={arraySchemas.listValidation} />
    <h3>Tuple Validation</h3>
    <SchemaTable schema={arraySchemas.tupleValidation} />
    <h3>Contains Validation</h3>
    <SchemaTable schema={arraySchemas.containsValidations} />
    <h3>Additional Items Specification</h3>
    <SchemaTable schema={arraySchemas.additionalItems} />
    <h3>Empty Array</h3>
    <SchemaTable schema={arraySchemas.emptyArray} />
  </Fragment>
);
export const objectType = () => (
  <Fragment>
    <h3>Simple Object</h3>
    <SchemaTable schema={objectSchemas.simpleObject} />
    <h3>Property Specification</h3>
    <SchemaTable schema={objectSchemas.propertySpecification} />
    <h3>Required Properties Specification</h3>
    <SchemaTable schema={objectSchemas.requiredProperties} />
    <h3>Empty Object</h3>
    <SchemaTable schema={objectSchemas.emptyObject} />
  </Fragment>
);
