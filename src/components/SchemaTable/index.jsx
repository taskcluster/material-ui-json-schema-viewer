import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { clone } from 'ramda';
import Typography from '@material-ui/core/Typography';
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
    margin: 0,
    whiteSpace: 'nowrap',
    minHeight: theme.spacing(3),
  },
  /**
   * Highlighting the type for the schema or sub-schema displayed
   * in the left panel of the schema table component.
   */
  code: {
    backgroundColor: theme.palette.grey[300],
  },
}));

function SchemaTable({ schema }) {
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
  const createNormalRow = schemaInput => ({
    leftRow: (
      <NormalLeftRow
        key={leftRows.length + 1}
        schema={schemaInput}
        classes={classes}
      />
    ),
    rightRow: (
      <NormalRightRow
        key={rightRows.length + 1}
        schema={schemaInput}
        classes={classes}
      />
    ),
  });
  // TODO: refactor closeRow into separate component
  /**
   * Create a row to close off an array or object type schema.
   * The left row displays a closing bracket of the type while
   * the right row only consists of blank line padding.
   */
  const createClosingRow = type => {
    const closeTypeSymbol = {
      array: ']',
      object: '}',
    }[type];

    return {
      leftRow: (
        <div key={`close ${type}`} className={classes.row}>
          <Typography
            component="div"
            variant="subtitle2"
            className={classes.line}>
            {closeTypeSymbol}
          </Typography>
        </div>
      ),
      /** TODO: may have to restrucutre closeRightRow to include
       *        keywordColumn, descriptionColumn for overall consistency
       *        with <NormalRightRow />
       */
      rightRow: (
        <div
          key={`close ${type}`}
          className={classNames(classes.row, classes.rightRow)}>
          <div className={classes.keywordColumn}>
            <Typography
              component="div"
              variant="subtitle2"
              className={classes.line}>
              {null}
            </Typography>
          </div>
          <div className={classes.descriptionColumn}>
            <Typography component="div" variant="subtitle2" />
          </div>
        </div>
      ),
    };
  };

  /**
   * Takes a single row as input, created from createNormalRow()
   * method, and pushes the left column and right column of the
   * row into the leftRows and rightRows respectively.
   */
  const pushRow = row => {
    leftRows.push(row.leftRow);
    rightRows.push(row.rightRow);
  };

  /**
   * Array type schemas start with an openArrayRow and are closed off
   * with a closeArrayRow, which both display brackets to indicate an array.
   * Array items are parsed and rendered according to their type via
   * calling back on the renderSchema() method. The resulting rows are
   * added sequentially in between the opening and closing rows.
   */
  function renderArray(schemaInput) {
    const openArrayRow = createNormalRow(schemaInput);
    const closeArrayRow = createClosingRow(schemaInput.type);

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
          renderSchema(item);
        });
      } else {
        /**
         * else, items are defined by list vaidation (each item matches
         *  the same schema), render the item schema only once.
         */
        renderSchema(schemaInput.items);
      }
    }

    /** Render contains keyword if defined */
    if ('contains' in schemaInput) {
      renderSchema(schemaInput.contains);
    }

    pushRow(closeArrayRow);
  }

  /**
   * TODO: define renderCombination method
   *       add description comment
   */
  function renderCombination(schemaInput) {
    return <React.Fragment>{schemaInput}</React.Fragment>;
  }

  /**
   * Default data type schemas (boolean, null, number, integer, string)
   * are parsed to create 'NormalLeftRow' and 'NormalRightRow' components.
   * These will then be stored into 'leftRows' and 'rightRows' arrays each.
   */
  function renderDefault(schemaInput) {
    const normalRow = createNormalRow(schemaInput);

    pushRow(normalRow);
  }

  /**
   * Object type schemas start with an openObjectRow and are closed off with
   * a closeObjectRow, both displaying curly brackets to indicate an object.
   * Object properties are parsed and rendered according to their type via
   * calling back on the renderSchema() method. The resulting rows are
   * added sequentially in between the opening and closing rows.
   */
  function renderObject(schemaInput) {
    const openObjectRow = createNormalRow(schemaInput);
    const closeObjectRow = createClosingRow(schemaInput.type);

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
        renderSchema(cloneSubschema);
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
   * Schemas are passed to different render methods according to its
   * specific type (combination, array, object, ref, and default).
   * Each method will create rows with the appropriate format to its
   * type and push the rows into 'leftRows' and 'rightRows' respectively.
   * The rows will then be rendered within the left and right panels.
   * Types other than default schemas may repeatedly call this method
   * within their render method if the schema has a nested structure.
   */
  function renderSchema(schemaInput) {
    if (
      'allOf' in schemaInput ||
      'anyOf' in schemaInput ||
      'oneOf' in schemaInput ||
      'not' in schemaInput
    ) {
      renderCombination(schemaInput);
    } else if ('$ref' in schemaInput) {
      renderRef(schemaInput);
    } else if (schemaInput.type === 'array') {
      renderArray(schemaInput);
    } else if (schemaInput.type === 'object') {
      renderObject(schemaInput);
    } else {
      renderDefault(schemaInput);
    }
    // TODO: handle empty json schemas

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
