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

defaultSchemas.boolean = require('../../../schemas/basic-data-types/boolean/boolean.json');
defaultSchemas.null = require('../../../schemas/basic-data-types/null/null.json');
defaultSchemas.integer = require('../../../schemas/basic-data-types/numeric/integer.json');
defaultSchemas.numberMultiples = require('../../../schemas/basic-data-types/numeric/number-multiples.json');
defaultSchemas.numberRange = require('../../../schemas/basic-data-types/numeric/number-range.json');
defaultSchemas.stringPattern = require('../../../schemas/basic-data-types/string/pattern.json');
defaultSchemas.stringFormat = require('../../../schemas/basic-data-types/string/format.json');

const arraySchemas = {};

arraySchemas.emptyArray = require('../../../schemas/basic-data-types/array/empty-array.json');
arraySchemas.listValidation = require('../../../schemas/basic-data-types/array/list-validation.json');
arraySchemas.tupleValidation = require('../../../schemas/basic-data-types/array/tuple-validation.json');
arraySchemas.containsValidations = require('../../../schemas/basic-data-types/array/contains.json');
arraySchemas.additionalItems = require('../../../schemas/basic-data-types/array/additional-items.json');

const objectSchemas = {};

objectSchemas.emptyObject = require('../../../schemas/basic-data-types/object/empty-object.json');
objectSchemas.simpleObject = require('../../../schemas/basic-data-types/object/simple-object.json');
objectSchemas.propertySpecification = require('../../../schemas/basic-data-types/object/property-specifications.json');
objectSchemas.propertyDependency = require('../../../schemas/basic-data-types/object/property-dependencies.json');
objectSchemas.requiredProperties = require('../../../schemas/basic-data-types/object/required-properties.json');
objectSchemas.complexObjectExample = require('../../../schemas/demo/list-clients-response.json');

const combinationSchemas = {};

combinationSchemas.allOf = require('../../../schemas/combination-types/allOf.json');
combinationSchemas.anyOf = require('../../../schemas/combination-types/anyOf.json');
combinationSchemas.oneOf = require('../../../schemas/combination-types/oneOf.json');
combinationSchemas.not = require('../../../schemas/combination-types/not.json');

const refSchemas = {};

refSchemas.simpleReference = require('../../../schemas/ref-types/simple-reference.json');
refSchemas.urlReference = require('../../../schemas/ref-types/url-reference.json');
refSchemas.circularReference = require('../../../schemas/ref-types/circular-reference.json');

const miscellaneousSchemas = {};

miscellaneousSchemas.multipleTypes = require('../../../schemas/basicDataTypes/miscellaneous/multiple-type.json');
miscellaneousSchemas.noType = require('../../../schemas/basicDataTypes/miscellaneous/no-type.json');

const demoSchemas = {};

demoSchemas.hookStatus = require('../../../schemas/demo/hook-status.json');
demoSchemas.listClients = require('../../../schemas/demo/list-clients-response.json');
demoSchemas.workerList = require('../../../schemas/demo/worker-list.json');
demoSchemas.workerFull = require('../../../schemas/demo/worker-full.json');
demoSchemas.workerPoolFull = require('../../../schemas/demo/worker-pool-full.json');
demoSchemas.metaData = require('../../../schemas/demo/metadata-metaschema.json');
demoSchemas.schemaDraft06 = require('../../../schemas/demo/schema-draft-06.json');

const references = [
  ...Object.values(defaultSchemas),
  ...Object.values(arraySchemas),
  ...Object.values(objectSchemas),
  ...Object.values(combinationSchemas),
  ...Object.values(refSchemas),
  ...Object.values(demoSchemas),
];

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
    <SchemaViewer schema={refSchemas.simpleReference} references={references} />
    <h3>URI Reference (fetch $ref based on URI)</h3>
    <SchemaViewer schema={refSchemas.urlReference} references={references} />
    <h3>Circular Reference</h3>
    <SchemaViewer
      schema={refSchemas.circularReference}
      references={references}
    />
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
    <SchemaViewer schema={demoSchemas.metaData} references={references} />
    <SchemaViewer schema={demoSchemas.workerList} references={references} />
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
