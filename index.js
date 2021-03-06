const visit = require('unist-util-visit')
const rlc = (options) => {
  // console.log(options);

  return async tree => {
    // console.log(tree);
    visit(tree, 'heading', node => {
      if (node.depth !== 1) {
        return
      }
      visit(node, 'text', textNode => {
        textNode.value = 'BREAKING ' + textNode.value
      })
    })

    return tree
  }
}

module.exports = rlc