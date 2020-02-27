import React, { Fragment } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import SchemaViewer from './index';
import { TASKCLUSTER_THEME } from '../../utils/theme';

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

const combinationSchemas = {};

combinationSchemas.allOf = require('../../../schemas/combination-types/allOf.json');
combinationSchemas.anyOf = require('../../../schemas/combination-types/anyOf.json');
combinationSchemas.oneOf = require('../../../schemas/combination-types/oneOf.json');
combinationSchemas.not = require('../../../schemas/combination-types/not.json');

const refSchemas = {};

refSchemas.simpleReference = require('../../../schemas/ref-types/simple-reference.json');
refSchemas.urlReference = require('../../../schemas/ref-types/url-reference.json');
refSchemas.circularReference = require('../../../schemas/ref-types/circular-reference.json');
refSchemas.errorReference = require('../../../schemas/ref-types/error-reference.json');
refSchemas.errorDefinition = require('../../../schemas/ref-types/error-definition.json');

const miscellaneousSchemas = {};

miscellaneousSchemas.multipleTypes = require('../../../schemas/basic-data-types/miscellaneous/multiple-type.json');
miscellaneousSchemas.noType = require('../../../schemas/basic-data-types/miscellaneous/no-type.json');

const demoSchemas = {};

demoSchemas.hookStatus = require('../../../schemas/demo/hook-status.json');
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
    <SchemaViewer schema={defaultSchemas.boolean} />
    <br />
    <br />
    <SchemaViewer schema={defaultSchemas.null} />
    <br />
    <br />
    <SchemaViewer schema={defaultSchemas.integer} />
    <br />
    <br />
    <SchemaViewer schema={defaultSchemas.numberRange} />
    <br />
    <br />
    <SchemaViewer schema={defaultSchemas.stringPattern} />
  </Fragment>
);
export const arrayTypes = () => (
  <Fragment>
    <SchemaViewer schema={arraySchemas.listValidation} />
    <br />
    <br />
    <SchemaViewer schema={arraySchemas.tupleValidation} />
    <br />
    <br />
    <SchemaViewer schema={arraySchemas.containsValidations} />
    <br />
    <br />
    <SchemaViewer schema={arraySchemas.additionalItems} />
    <br />
    <br />
    <SchemaViewer schema={arraySchemas.emptyArray} />
  </Fragment>
);
export const objectTypes = () => (
  <Fragment>
    <SchemaViewer schema={objectSchemas.simpleObject} />
    <br />
    <br />
    <SchemaViewer schema={objectSchemas.propertySpecification} />
    <br />
    <br />
    <SchemaViewer schema={objectSchemas.requiredProperties} />
    <br />
    <br />
    <SchemaViewer schema={objectSchemas.emptyObject} />
  </Fragment>
);
export const combinationTypes = () => (
  <Fragment>
    <SchemaViewer schema={combinationSchemas.allOf} />
    <br />
    <br />
    <SchemaViewer schema={combinationSchemas.anyOf} />
    <br />
    <br />
    <SchemaViewer schema={combinationSchemas.oneOf} />
    <br />
    <br />
    <SchemaViewer schema={combinationSchemas.not} />
  </Fragment>
);
export const refTypes = () => (
  <Fragment>
    <SchemaViewer schema={refSchemas.simpleReference} references={references} />
    <br />
    <br />
    <SchemaViewer schema={refSchemas.urlReference} references={references} />
    <br />
    <br />
    <SchemaViewer
      schema={refSchemas.circularReference}
      references={references}
    />
    <br />
    <br />
    <SchemaViewer schema={refSchemas.errorReference} references={references} />
    <br />
    <br />
    <SchemaViewer schema={refSchemas.errorDefinition} references={references} />
  </Fragment>
);

export const miscellaneous = () => (
  <Fragment>
    <SchemaViewer schema={miscellaneousSchemas.multipleTypes} />
    <br />
    <br />
    <SchemaViewer schema={miscellaneousSchemas.noType} />
  </Fragment>
);

export const demo = () => (
  <Fragment>
    <h2>Taskcluster Schema Examples</h2>
    <SchemaViewer schema={demoSchemas.hookStatus} />
    <br />
    <br />
    <SchemaViewer schema={demoSchemas.workerList} references={references} />
    <br />
    <br />
    <SchemaViewer schema={demoSchemas.metaData} references={references} />
    <br />
    <br />
  </Fragment>
);

export const customThemes = () => {
  return (
    <Fragment>
      <h3>Taskcluster Dark Theme</h3>
      <ThemeProvider theme={TASKCLUSTER_THEME.darkTheme}>
        <SchemaViewer schema={demoSchemas.hookStatus} />
      </ThemeProvider>
      <h3>Taskcluster Light Theme</h3>
      <ThemeProvider theme={TASKCLUSTER_THEME.lightTheme}>
        <SchemaViewer schema={demoSchemas.workerList} />
      </ThemeProvider>
    </Fragment>
  );
};
