import React, { Fragment } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
refSchemas.urlReference = require('../../../schemas/refTypes/urlReference.json');
refSchemas.circularReference = require('../../../schemas/refTypes/circularReference.json');

const miscellaneousSchemas = {};

miscellaneousSchemas.multipleTypes = require('../../../schemas/basicDataTypes/miscellaneous/multiple-type.json');
miscellaneousSchemas.noType = require('../../../schemas/basicDataTypes/miscellaneous/no-type.json');

const demoSchemas = {};

demoSchemas.hookStatus = require('../../../schemas/demo/hook-status.json');
demoSchemas.listClients = require('../../../schemas/demo/list-clients-response.json');
demoSchemas.metaData = require('../../../schemas/demo/metadata-metaschema.json');
demoSchemas.workerFull = require('../../../schemas/demo/worker-full.json');
demoSchemas.workerList = require('../../../schemas/demo/worker-list.json');

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
    <h3>URI Reference (fetch $ref based on URI)</h3>
    <SchemaViewer schema={refSchemas.urlReference} />
    <h3>Circular Reference</h3>
    <SchemaViewer schema={refSchemas.circularReference} />
  </Fragment>
);

export const miscellaneous = () => (
  <Fragment>
    <h2>Multiple Types</h2>
    <SchemaViewer schema={miscellaneousSchemas.multipleTypes} />
    <h2>No Type</h2>
    <SchemaViewer schema={miscellaneousSchemas.noTypes} />
  </Fragment>
);

export const demo = () => (
  <Fragment>
    <h2>Demo of Taskcluster Schemas</h2>
    <SchemaViewer schema={demoSchemas.hookStatus} />
    <SchemaViewer schema={demoSchemas.listClients} />
    <SchemaViewer schema={demoSchemas.metaData} />
    <SchemaViewer schema={demoSchemas.workerList} />
  </Fragment>
);

export const customThemes = () => {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  const colorfulTheme = createMuiTheme({
    palette: {
      background: {
        paper: '#000',
      },
      text: {
        primary: '#ffc107',
        secondary: '#ffc53d',
        hint: '#ddd',
      },
      divider: '#4f4f4f',
    },
  });

  return (
    <Fragment>
      <h3>Dark Theme</h3>
      <ThemeProvider theme={darkTheme}>
        <SchemaViewer schema={objectSchemas.complexObjectExample} />
      </ThemeProvider>
      <h3>Colorful Theme ex1</h3>
      <ThemeProvider theme={colorfulTheme}>
        <SchemaViewer schema={demoSchemas.workerList} />
      </ThemeProvider>
      <h3>Colorful Theme ex2</h3>
      <ThemeProvider theme={colorfulTheme}>
        <SchemaViewer schema={combinationSchemas.anyOf} />
      </ThemeProvider>
    </Fragment>
  );
};
