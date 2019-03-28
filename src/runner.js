const { treeBuilder, data, treeDrawer } = window
const { jsonToTree } = treeBuilder
const { draw } = treeDrawer

const root = jsonToTree(data, { skipCollectionName: true })
console.log(root)
draw(root, 'tree-container')