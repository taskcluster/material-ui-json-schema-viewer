### Default Type Schema
```js
const schema = require('../../../schemas/basicDataTypes/string/stringPattern.json');
<SchemaTable schema={schema} />
```

### Array Type Schema

list validation
```js
const schema = require('../../../schemas/basicDataTypes/array/listValidation.json');
<SchemaTable schema={schema} />
```

tuple validation
```js
const schema = require('../../../schemas/basicDataTypes/array/tupleValidation.json');
<SchemaTable schema={schema} />
```

additional items (defined as schema)
```js
const schema = require('../../../schemas/basicDataTypes/array/additionalItems.json');
<SchemaTable schema={schema} />
```

contains keyword
```js
const schema = require('../../../schemas/basicDataTypes/array/containsValidation.json');
<SchemaTable schema={schema} />
```

empty array
```js
const schema = require('../../../schemas/basicDataTypes/array/emptyArray.json');
<SchemaTable schema={schema} />
```

## Object Type Schema

simple object
```js
const schema = require('../../../schemas/basicDataTypes/object/simpleObject.json');
<SchemaTable schema={schema} />
```

empty object
```js
const schema = require('../../../schemas/basicDataTypes/object/emptyObject.json');
<SchemaTable schema={schema} />
```

property specifications (names, patterns, additional subschemas)
```js
const schema = require('../../../schemas/basicDataTypes/object/propertySpecifications.json');
<SchemaTable schema={schema} />
```

property dependencies
```js
const schema = require('../../../schemas/basicDataTypes/object/requiredProperties.json');
<SchemaTable schema={schema} />
```
