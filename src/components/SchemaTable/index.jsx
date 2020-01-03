import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { clone } from 'ramda';
import NormalLeftRow from '../NormalLeftRow';
import NormalRightRow from '../NormalRightRow';

const useStyles = makeStyles(theme => ({
  /** Schema table displays two-column layout */
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '[left-panel] 1fr [right-panel] 1fr',
    color: theme.palette.text.primary,
  },
  /** The left panel of the Schema Table */
  leftPanel: {
    backgroundColor: theme.palette.background.default,
    borderRight: `${theme.spacing(1)}px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  /** The right panel of the Schema Table */
  rightPanel: {
    backgroundColor: theme.palette.background.default,
    overflowX: 'auto',
  },
  /** Rows for the left and right panels */
  row: {
    borderBottom: `${theme.spacing(0.25)}px solid ${theme.palette.divider}`,
    minHeight: theme.spacing(3),
  },
  lastRow: {
    borderBottom: 'none',
  },
  /**
   * The right panel's rows are further divided into two columns
   * : keyword column, description column
   */
  rightRow: {
    display: 'grid',
    gridTemplateColumns: '[keyword-column] 1fr [description-column] 1fr',
  },
  /** Column for displaying keywords for right panel's rows */
  keywordColumn: {},
  /** Column for displaying description for right panel's rows */
  descriptionColumn: {},
  /**
   * Lines within the rows.
   * (a single row may constitute of more than one line depending
   *  on how many keywords the given schema or sub-schema defines)
   */
  line: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    height: theme.spacing(3.5),
  },
  /**
   * Highlighting the type for the schema or sub-schema displayed
   * in the left panel of the schema table component.
   */
  code: {
    backgroundColor: theme.palette.grey[300],
    padding: `0 ${theme.spacing(0.5)}px`,
  },
  /**
   * Prefixes used to notate special properties of data types in
   * lines of NormalLeftRow. (ex. 'required', 'contains' keywords)
   */
  prefix: {
    color: theme.palette.error.main,
    padding: `0 ${theme.spacing(0.5)}px}`,
  },
  /**
   * The text and icon within Tooltip component should maintain
   * a consistent line height and font size to align vertically.
   */
  tooltip: {
    fontSize: `${theme.typography.subtitle2.fontSize}`,
    lineHeight: 1,
  },
  /** Icon within Tooltip component */
  icon: {
    margin: `0 ${theme.spacing(0.5)}px`,
  },
}));

function SchemaTable({ schema }) {
  /**
   * Generate classes to define overall style for the schema table.
   */
  const classes = useStyles();
  /**
   * Rows for the left and right column are stored separately
   * so that the left and right panels can render the rows separately.
   * This enable the viewer to have a two-column layout with each of
   * the columns having its own horizontal scroll.
   */
  const leftRows = [];
  const rightRows = [];

  /**
   * Create a single normal row (left and right column each).
   * The result is stored in an object format in order for the
   * pushRow() method to easily access each left and right column
   * of the single row and push them to leftRows and rightRows respectively.
   */
  function createNormalRow(schemaInput, indent) {
    return {
      leftRow: (
        <NormalLeftRow
          key={leftRows.length + 1}
          schema={schemaInput}
          classes={classes}
          indent={indent}
        />
      ),
      rightRow: (
        <NormalRightRow
          key={rightRows.length + 1}
          schema={schemaInput}
          classes={classes}
        />
      ),
    };
  }

  /**
   * Create a row to close off an array or object type schema.
   * The left row displays a closing bracket of the type while
   * the right row only consists of blank line padding.
   */
  function createLiteralRow(type, indent) {
    const literalType = {
      array: 'closeArray',
      object: 'closeObject',
      allOf: 'and',
      anyOf: 'or',
      oneOf: 'or',
      not: 'and',
    }[type];
    const literalSchema = {
      type: literalType,
    };

    return createNormalRow(literalSchema, indent);
  }

  /**
   * Takes a single row as input, created from createNormalRow()
   * method, and pushes the left column and right column of the
   * row into the leftRows and rightRows respectively.
   */
  function pushRow(row) {
    leftRows.push(row.leftRow);
    rightRows.push(row.rightRow);
  }

  /**
   * Array type schemas start with an openArrayRow and are closed off
   * with a closeArrayRow, which both display brackets to indicate an array.
   * Array items are parsed and rendered according to their type via
   * calling back on the renderSchema() method. The resulting rows are
   * added sequentially in between the opening and closing rows.
   */
  function renderArray(schemaInput, indent) {
    const openArrayRow = createNormalRow(schemaInput, indent);
    const closeArrayRow = createLiteralRow(schemaInput.type, indent);

    pushRow(openArrayRow);

    /** Render array items only if defined */
    if ('items' in schemaInput) {
      /**
       * If array items are defined by tuple vaidation (each item may
       * have a different schema and the order of items is important),
       * render each of the item schemas sequentially.
       */
      if (Array.isArray(schemaInput.items)) {
        schemaInput.items.forEach(item => {
          renderSchema(item, indent + 1);
        });
      } else {
        /**
         * else, items are defined by list vaidation (each item matches
         *  the same schema), render the item schema only once.
         */
        renderSchema(schemaInput.items, indent + 1);
      }
    }

    /**
     * Render contains keyword if defined.
     * (create a subschema with 'contains' key set to true in order to
     *  use the contains symbol in NormalLeftRow)
     */
    if ('contains' in schemaInput) {
      const cloneSubschema = clone(schemaInput.contains);

      cloneSubschema.contains = true;
      renderSchema(cloneSubschema, indent + 1);
    }

    pushRow(closeArrayRow);
  }

  /**
   * TODO: define renderCombination method
   *       add description comment
   */
  function renderCombination(schemaInput, indent) {
    const openCombRow = createNormalRow(schemaInput, indent);

    pushRow(openCombRow);

    /**  */
    const combType = schemaInput.type;
    const combOptionList = schemaInput[combType];

    if (combOptionList.length > 0) {
      /**
       * Render each of the option schemas sequentially.
       */
      combOptionList.forEach(option => {
        renderSchema(option, indent + 1);
      });
    }
  }

  /**
   * Default data type schemas (boolean, null, number, integer, string)
   * are parsed to create 'NormalLeftRow' and 'NormalRightRow' components.
   * These will then be stored into 'leftRows' and 'rightRows' arrays each.
   */
  function renderDefault(schemaInput, indent) {
    const normalRow = createNormalRow(schemaInput, indent);

    pushRow(normalRow);
  }

  /**
   * Object type schemas start with an openObjectRow and are closed off with
   * a closeObjectRow, both displaying curly brackets to indicate an object.
   * Object properties are parsed and rendered according to their type via
   * calling back on the renderSchema() method. The resulting rows are
   * added sequentially in between the opening and closing rows.
   */
  function renderObject(schemaInput, indent) {
    const openObjectRow = createNormalRow(schemaInput, indent);
    const closeObjectRow = createLiteralRow(schemaInput.type, indent);
    const requiredProperties =
      'required' in schemaInput ? new Set(schemaInput.required) : new Set();

    pushRow(openObjectRow);

    /** Render object properties only if defined */
    if ('properties' in schemaInput) {
      /**
       * Render each of the property schemas sequentially.
       * Make sure to create a name field for each of the properties'
       * sub-schema so the names are also displayed in the left panel.
       * (use cloned sub-schema to create new field in order to maintain
       *  immutability of schema data)
       */
      const propertyList = Object.keys(schemaInput.properties);

      propertyList.forEach(property => {
        const cloneSubschema = clone(schemaInput.properties[property]);

        cloneSubschema.name = property;

        if (requiredProperties.has(property)) {
          cloneSubschema.required = true;
        }

        renderSchema(cloneSubschema, indent + 1);
      });
    }

    pushRow(closeObjectRow);
  }

  /**
   * TODO: define renderRef method
   *       add description comment
   */
  function renderRef(schemaInput) {
    return <React.Fragment>{schemaInput}</React.Fragment>;
  }

  /**
   * Create a clone schema with an identified type property.
   * Since complex schema cases, such as combinations and ref types,
   * do not specify its particular type, it is necessary to manually include
   * the type property in order to provide a consistent API when creating rows.
   * For cases which do not specify types for specific reasons (ex. an option
   * schema of an 'allOf' combination), just simply return the schema as-is
   * so that it will be directed to the renderDefault method by default.
   */
  function addSchemaType(schemaInput) {
    const complexTypes = ['allOf', 'anyOf', 'oneOf', 'not', '$ref'];
    const cloneSchema = clone(schemaInput);

    complexTypes.forEach(type => {
      if (type in schemaInput) {
        cloneSchema.type = type;
      }
    });

    return cloneSchema;
  }

  /**
   * Schemas are passed to different render methods according to its
   * specific type (combination, array, object, ref, and default).
   * Each method will create rows with the appropriate format to its
   * type and push the rows into 'leftRows' and 'rightRows' respectively.
   * The rows will then be rendered within the left and right panels.
   * Types other than default schemas may repeatedly call this method
   * within their render method if the schema has a nested structure.
   */
  function renderSchema(schemaInput, indent = 0) {
    /**
     * If schema is complex (combination or ref type),
     * make sure the schema includes a type property.
     */
    const schemaWithType =
      'type' in schemaInput ? schemaInput : addSchemaType(schemaInput);
    const schemaType = schemaWithType.type;

    if (['allOf', 'anyOf', 'oneOf', 'not'].includes(schemaType)) {
      renderCombination(schemaWithType, indent);
    } else if (schemaType === '$ref') {
      renderRef(schemaInput, indent);
    } else if (schemaType === 'array') {
      renderArray(schemaInput, indent);
    } else if (schemaType === 'object') {
      renderObject(schemaInput, indent);
    } else {
      renderDefault(schemaInput, indent);
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.leftPanel}>{leftRows}</div>
        <div className={classes.rightPanel}>{rightRows}</div>
      </div>
    );
  }

  return <Fragment>{renderSchema(schema)}</Fragment>;
}

SchemaTable.propTypes = {
  /** Schema input given to render */
  schema: shape({
    /** Type of schema */
    type: string,
  }),
};

SchemaTable.defaultProps = {
  /** Null type schema is set as default prop */
  schema: {
    type: 'null',
  },
};

export default React.memo(SchemaTable);
