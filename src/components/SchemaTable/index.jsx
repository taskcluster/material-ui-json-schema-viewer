import React, { Fragment } from 'react';
import { func, object } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import NormalLeftRow from '../NormalLeftRow';
import NormalRightRow from '../NormalRightRow';
import { treeNodeTypes } from '../../utils/prop-types';
import { createSchemaTree } from '../../utils/schemaTree';
import {
  COMBINATION_TYPES,
  NESTED_TYPES,
  LITERAL_TYPES,
} from '../../utils/constants';

const useStyles = makeStyles(theme => ({
  /** Schema table displays two-column layout */
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '[left-panel] 1fr [right-panel] 1fr',
    color: theme.palette.text.primary,
  },
  /** The left panel of the Schema Table */
  leftPanel: {
    backgroundColor: theme.palette.background.paper,
    borderRight: `${theme.spacing(0.25)}px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  /** The right panel of the Schema Table */
  rightPanel: {
    backgroundColor: theme.palette.background.paper,
    overflowX: 'auto',
  },
  /** Rows for the left and right panels */
  row: {
    borderBottom: `${theme.spacing(0.25)}px solid ${theme.palette.divider}`,
    /**
     * The minimum height of a row should always be the same
     * with the height of a single line.
     */
    minHeight: theme.spacing(4.5),
    width: '100%',
  },
  /**
   * Lines within the rows. (a single row may constitute of more
   * than one line depending on the number of keywords of the schema)
   */
  line: {
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    height: theme.spacing(4.5),
    paddingLeft: theme.spacing(1),
  },
  /**
   * Lines used specifically for displaying desciptions.
   */
  descriptionLine: {
    alignItems: 'flex-start',
  },
  /**
   * Name text displayed within a NormalLeftRow.
   */
  name: {
    marginRight: theme.spacing(0.5),
  },
  /**
   * Highlight the type for the schema or sub-schema displayed
   * within a NormalLeftRow.
   */
  code: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.getContrastText(theme.palette.text.primary),
    padding: `0 ${theme.spacing(0.5)}px`,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    fontFamily: theme.typography.subtitle2.fontFamily,
  },
  /**
   * Warning icon to inform missing type in NormalLeftRow.
   */
  missingType: {
    display: 'flex',
    alignItems: 'center',
  },
  /**
   * Comments used for combination types in NormalLeftRow.
   */
  comment: {
    color: theme.palette.text.hint,
  },
  /**
   * Prefixes used to notate special properties of data types in
   * lines of NormalLeftRow. (ex. 'required', 'contains' keywords)
   */
  prefix: {
    color: theme.palette.error.main,
    padding: `0 ${theme.spacing(0.5)}px`,
  },
  /**
   * Button used to expand or shrink a $ref.
   */
  refButton: {
    marginLeft: theme.spacing(1),
  },
}));

function SchemaTable({ schemaTree, setSchemaTree, references }) {
  /**
   * Generate classes to define overall style for the schema table.
   */
  const classes = useStyles();
  /**
   * Rows for the left and right columns are stored separately
   * so that the table can create a two-column layout with each of
   * the columns (named 'panels') having its own horizontal scroll.
   * This way, the left and right panels can render the rows separately
   * in their own containers.
   */
  const leftPanelRows = [];
  const rightPanelRows = [];

  /**
   * Create a single normal row with a left and right column each.
   * The result is stored in an object format in order for the
   * pushRow method to push the left and right row of a single row
   * into the leftPanelRows and rightPanelRows arrays respectively.
   */
  function createSingleRow(treeNode, refType = 'none') {
    /**
     * If the row to create is a refType (either 'default' or 'expanded'),
     * make sure to pass 'setSchemaTree' method to change the state of the
     * schemaTree. Else, pass null as prop instead.
     */
    const updateFunc = refType === 'none' ? null : setSchemaTree;
    const refs = refType === 'none' ? null : references;

    return {
      leftRow: (
        <NormalLeftRow
          key={`left-row-${leftPanelRows.length + 1}`}
          classes={classes}
          treeNode={treeNode}
          refType={refType}
          setSchemaTree={updateFunc}
          references={refs}
        />
      ),
      rightRow: (
        <NormalRightRow
          key={`right-row-${rightPanelRows.length + 1}`}
          classes={classes}
          treeNode={treeNode}
        />
      ),
    };
  }

  /**
   * Create a literal row for displaying descriptive rows.
   * This is only used to create rows for the following:
   * - a closing row for nested types (arrays and objects) to display a
   *   close bracket symbol
   * - a separator row for combination types (allOf, anyOf, oneOf, not)
   *   to visually separate options.
   */
  function createLiteralRow(treeNode) {
    const { schema, path } = treeNode;
    const schemaType = schema._type;
    const literalSchema = {
      $id: schema._id,
      type: LITERAL_TYPES[schemaType],
    };
    const literalPath = COMBINATION_TYPES.includes(schemaType)
      ? [...path, 0]
      : path;
    const literalTreeNode = createSchemaTree(literalSchema, literalPath);

    return createSingleRow(literalTreeNode);
  }

  /**
   * Push a single row's left part and right part into
   * the leftPanelRows and rightPanelRows respectively.
   * @param {object} row object including leftRow and rightRow components.
   */
  function pushRow(row) {
    leftPanelRows.push(row.leftRow);
    rightPanelRows.push(row.rightRow);
  }

  /**
   * Create rows by traversing the tree structure,
   * starting from the rootNode, in pre-order.
   * First, a single row based on the root node will be created.
   * Then, if the root node has children, this method may be called
   * recursively to create rows for the subtree structures.
   */
  function renderNodeToRows(rootNode, refType = 'none') {
    /**
     * If rootNode is a $ref type, render rows based on ref node.
     */
    if ('isExpanded' in rootNode) {
      renderRefNodeToRows(rootNode);

      return;
    }

    /**
     * Create a single row based on the rootNode.
     */
    const { schema, children } = rootNode;
    const schemaType = schema._type;
    const rootNodeRow = createSingleRow(rootNode, refType);

    pushRow(rootNodeRow);

    /**
     * If the root node has children (indicating a nested structure),
     * create rows for each of the child nodes using recursion.
     */
    if (children) {
      children.forEach((childNode, i) => {
        /**
         * If root node's schema defines a combination type,
         * add separator rows in between the option rows
         */
        if (COMBINATION_TYPES.includes(schemaType) && i > 0) {
          const separatorRow = createLiteralRow(rootNode);

          pushRow(separatorRow);
        }

        renderNodeToRows(childNode);
      });
    }

    /**
     * If root node's schema defines a nested structure,
     * add a row at the end to close off the nested structure
     */
    if (NESTED_TYPES.includes(schemaType)) {
      const closeRow = createLiteralRow(rootNode);

      pushRow(closeRow);
    }
  }

  /**
   * Depending on the refTreeNode's 'isExpanded' state,
   * create either a default collapsed version of a refRow
   * or an expanded version of possibly multiple rows.
   */
  function renderRefNodeToRows(refTreeNode) {
    const { defaultNode, expandedNode, isExpanded } = refTreeNode;
    const refType = isExpanded ? 'expanded' : 'default';

    /**
     * If ref node has shrunk state, which is the default,
     * create a single row based on the defaultNode structure
     * defined within the ref node.
     */
    if (!isExpanded) {
      const refRow = createSingleRow(defaultNode, refType);

      pushRow(refRow);
    } else {
      /**
       * Else, the ref node has expanded state,
       * create rows based on the expandedNode structure.
       */
      renderNodeToRows(expandedNode, refType);
    }
  }

  /**
   * Create and render a table with two-columns based on
   * the schemaTree's overall structure.
   */
  function renderTreeToTable(schemaTreeInput) {
    /**
     * Create left and right rows each for the schema table by traversing
     * the schemaTree starting from the root node. The resulting rows will
     * be stored in leftPanelRows and rightPanelRows array each.
     * Which will then, ultimately be rendered within the leftPanal and
     * rightPanel respectively to create a two-column layout with each of
     * the columns having horizonal scrolls.
     */
    renderNodeToRows(schemaTreeInput);

    return (
      <div className={classes.wrapper}>
        <div className={classes.leftPanel}>{leftPanelRows}</div>
        <div className={classes.rightPanel}>{rightPanelRows}</div>
      </div>
    );
  }

  return <Fragment>{renderTreeToTable(schemaTree)}</Fragment>;
}

SchemaTable.propTypes = {
  /**
   * Schema tree structure defining the overall structure
   * for the schema table component.
   */
  schemaTree: treeNodeTypes.isRequired,
  /**
   * Function to update schemaTree structure.
   * Used specifically for expanding or shrinking a $ref.
   */
  setSchemaTree: func.isRequired,
  /**
   * Object where all schemas are stored so that the table
   * can reference to for dereferencing $ref schemas.
   */
  references: object.isRequired,
};

export default React.memo(SchemaTable);
