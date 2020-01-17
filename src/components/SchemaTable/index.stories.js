import React, { Fragment } from 'react';
import SchemaTable from './index';

export default {
  title: 'Schema Table',
  component: SchemaTable,
};

/**
 * Schema examples to use for displaying stories
 */
const defaultSchemas = {};

defaultSchemas.boolean = require('../../../schemas/basicDataTypes/boolean/boolean.json');
defaultSchemas.null = require('../../../schemas/basicDataTypes/null/null.json');
defaultSchemas.integer = require('../../../schemas/basicDataTypes/numeric/integer.json');
defaultSchemas.numberMultiples = require('../../../schemas/basicDataTypes/numeric/numberMultiples.json');
defaultSchemas.numberRange = require('../../../schemas/basicDataTypes/numeric/numberRange.json');
defaultSchemas.stringPattern = require('../../../schemas/basicDataTypes/string/stringPattern.json');
defaultSchemas.stringFormat = require('../../../schemas/basicDataTypes/string/stringFormat.json');

const arraySchemas = {};

arraySchemas.emptyArray = require('../../../schemas/basicDataTypes/array/emptyArray.json');
arraySchemas.listValidation = require('../../../schemas/basicDataTypes/array/listValidation.json');
arraySchemas.tupleValidation = require('../../../schemas/basicDataTypes/array/tupleValidation.json');
arraySchemas.containsValidations = require('../../../schemas/basicDataTypes/array/containsValidation.json');
arraySchemas.additionalItems = require('../../../schemas/basicDataTypes/array/additionalItems.json');

const objectSchemas = {};

objectSchemas.emptyObject = require('../../../schemas/basicDataTypes/object/emptyObject.json');
objectSchemas.simpleObject = require('../../../schemas/basicDataTypes/object/simpleObject.json');
objectSchemas.propertySpecification = require('../../../schemas/basicDataTypes/object/propertySpecifications.json');
objectSchemas.propertyDependency = require('../../../schemas/basicDataTypes/object/propertyDependencies.json');
objectSchemas.requiredProperties = require('../../../schemas/basicDataTypes/object/requiredProperties.json');

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
