import React, { Fragment } from 'react';
import SchemaViewer from './index';

export default {
  title: 'Schema Viewer',
  component: SchemaViewer,
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
objectSchemas.complexObjectExample = require('../../../schemas/demo/list-clients-response.json');

const combinationSchemas = {};

combinationSchemas.allOf = require('../../../schemas/combinationTypes/allOf.json');
combinationSchemas.anyOf = require('../../../schemas/combinationTypes/anyOf.json');
combinationSchemas.oneOf = require('../../../schemas/combinationTypes/oneOf.json');
combinationSchemas.not = require('../../../schemas/combinationTypes/not.json');

const refSchemas = {};

refSchemas.simpleReference = require('../../../schemas/refTypes/simpleReference.json');
refSchemas.circularReference = require('../../../schemas/refTypes/circularReference.json');

export const defaultTypes = () => (
  <Fragment>
    <h3>Boolean</h3>
    <SchemaViewer schema={defaultSchemas.boolean} />
    <h3>Null</h3>
    <SchemaViewer schema={defaultSchemas.null} />
    <h3>Integer</h3>
    <SchemaViewer schema={defaultSchemas.integer} />
    <h3>Number</h3>
    <SchemaViewer schema={defaultSchemas.numberRange} />
    <h3>String</h3>
    <SchemaViewer schema={defaultSchemas.stringPattern} />
  </Fragment>
);
export const arrayTypes = () => (
  <Fragment>
    <h3>List Validation</h3>
    <SchemaViewer schema={arraySchemas.listValidation} />
    <h3>Tuple Validation</h3>
    <SchemaViewer schema={arraySchemas.tupleValidation} />
    <h3>Contains Validation</h3>
    <SchemaViewer schema={arraySchemas.containsValidations} />
    <h3>Additional Items Specification</h3>
    <SchemaViewer schema={arraySchemas.additionalItems} />
    <h3>Empty Array</h3>
    <SchemaViewer schema={arraySchemas.emptyArray} />
  </Fragment>
);
export const objectTypes = () => (
  <Fragment>
    <h3>Simple Object</h3>
    <SchemaViewer schema={objectSchemas.simpleObject} />
    <h3>Property Specification</h3>
    <SchemaViewer schema={objectSchemas.propertySpecification} />
    <h3>Required Properties Specification</h3>
    <SchemaViewer schema={objectSchemas.requiredProperties} />
    <h3>Complex Nested Object</h3>
    <SchemaViewer schema={objectSchemas.complexObjectExample} />
    <h3>Empty Object</h3>
    <SchemaViewer schema={objectSchemas.emptyObject} />
  </Fragment>
);
export const combinationTypes = () => (
  <Fragment>
    <h3>allOf</h3>
    <SchemaViewer schema={combinationSchemas.allOf} />
    <h3>anyOf</h3>
    <SchemaViewer schema={combinationSchemas.anyOf} />
    <h3>oneOf</h3>
    <SchemaViewer schema={combinationSchemas.oneOf} />
    <h3>not</h3>
    <SchemaViewer schema={combinationSchemas.not} />
  </Fragment>
);
export const refTypes = () => (
  <Fragment>
    <h3>Simple Reference</h3>
    <SchemaViewer schema={refSchemas.simpleReference} />
    <h3>Circular Reference</h3>
    <SchemaViewer schema={refSchemas.circularReference} />
  </Fragment>
);
