/**
 * TreeNode class defines the fields and methods for
 * the nodes of a tree data structure.
 */
class TreeNode {
  constructor(schema) {
    this.schema = schema;
    this.children = [];
  }

  appendChild(childTreeNode) {
    this.children.push(childTreeNode);
  }
}

export default TreeNode;
