const visit = require('unist-util-visit')
module.exports = () => tree => {
  visit(tree, 'heading', node => {
    if (node.depth !== 1) {
      return
    }
    visit(node, 'text', textNode => {
      textNode.value = 'BREAKING ' + textNode.value
    })
  })
}
// module.exports = rlc

// function rlc(tree) {
//   console.log(tree);
// }