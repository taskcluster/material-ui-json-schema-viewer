/**
 * TreeNode class defines the fields and methods for
 * the nodes of a tree data structure.
 */
class TreeNode {
  constructor(schema, depth = 0) {
    this.schema = schema;
    this.children = [];
    this.depth = depth;
  }

  appendChild(childTreeNode) {
    this.children.push(childTreeNode);
  }
}

export default TreeNode;
