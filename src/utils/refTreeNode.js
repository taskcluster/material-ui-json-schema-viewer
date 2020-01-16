/**
 * RefTreeNode extends the tree node data structure
 * in order to store $ref type schemas.
 * It includes two additional fields to track the state of
 * the ref (expanded or shrunk) and holds on to the
 * reference of the $ref.
 */
export const RefTreeNode = {
  isExpanded: false,
  reference: undefined, // TODO: parse reference into this field
};

/**
 * Dynamically fetch
 * when $ref is expanded.
 */
function expand() {}

/**
 * Return to default state
 */
function shrink() {}
