const { treeBuilder, data, treeDrawer } = window
const { jsonToTree } = treeBuilder
const { draw } = treeDrawer

const root = jsonToTree(data)
draw(root, 'tree-container')