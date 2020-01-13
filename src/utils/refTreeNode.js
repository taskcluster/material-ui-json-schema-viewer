import TreeNode from './treeNode';

/**
 * RefTreeNode extends the tree node data structure
 * int order to
 */
class RefTreeNode extends TreeNode {
  constructor(schema) {
    super(schema);
    this.isExpanded = false;
    this.reference = undefined; // TODO: parse reference into this field
  }
}

export default RefTreeNode;
