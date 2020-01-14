### Default Type Schema
```js
const schema = require('../../../schemas/basicDataTypes/string/stringPattern.json');
<SchemaViewer schema={schema} />
```

### Array Type Schema

list validation
```js
const schema = require('../../../schemas/basicDataTypes/array/listValidation.json');
<SchemaViewer schema={schema} />
```

tuple validation
```js
const schema = require('../../../schemas/basicDataTypes/array/tupleValidation.json');
<SchemaViewer schema={schema} />
```

additional items (defined as schema)
```js
const schema = require('../../../schemas/basicDataTypes/array/additionalItems.json');
<SchemaViewer schema={schema} />
```

contains keyword
```js
const schema = require('../../../schemas/basicDataTypes/array/containsValidation.json');
<SchemaViewer schema={schema} />
```

empty array
```js
const schema = require('../../../schemas/basicDataTypes/array/emptyArray.json');
<SchemaViewer schema={schema} />
```

### Object Type Schema

simple object
```js
const schema = require('../../../schemas/basicDataTypes/object/simpleObject.json');
<SchemaViewer schema={schema} />
```

empty object
```js
const schema = require('../../../schemas/basicDataTypes/object/emptyObject.json');
<SchemaViewer schema={schema} />
```

property specifications (names, patterns, additional subschemas)
```js
const schema = require('../../../schemas/basicDataTypes/object/propertySpecifications.json');
<SchemaViewer schema={schema} />
```

property dependencies
```js
const schema = require('../../../schemas/basicDataTypes/object/requiredProperties.json');
<SchemaViewer schema={schema} />
```

### Complex Nested Types
```js
const schema = require('../../../schemas/demo/list-clients-response.json');
<SchemaViewer schema={schema} />
```

### Combination Types
allOf
```js
const schema = require('../../../schemas/combinationTypes/allOf.json');
<SchemaViewer schema={schema} />
```

anyOf
```js
const schema = require('../../../schemas/combinationTypes/anyOf.json');
<SchemaViewer schema={schema} />
```

oneOf
```js
const schema = require('../../../schemas/combinationTypes/oneOf.json');
<SchemaViewer schema={schema} />
```

not
```js
const schema = require('../../../schemas/combinationTypes/not.json');
<SchemaViewer schema={schema} />
```