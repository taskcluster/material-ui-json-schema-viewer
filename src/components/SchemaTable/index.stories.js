import React from 'react';
import SchemaTable from './index';

export default {
  title: 'Schema Table',
  component: SchemaTable,
};

const defaultSchema = require('../../../schemas/basicDataTypes/string/stringPattern.json');
const arraySchema = require('../../../schemas/basicDataTypes/array/listValidation.json');

export const defaultType = () => <SchemaTable schema={defaultSchema} />;
export const arrayType = () => <SchemaTable schema={arraySchema} />;
