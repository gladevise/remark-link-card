const visit = require('unist-util-visit')
const rlc = (options) => {

  return async tree => {
    visit(tree, 'paragraph', node => {
      visit(node, 'text', textNode => {
        const urls = textNode.value.match(/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/g);
        if (urls && urls.length === 1) {
          node.children[0].type = 'html'
          node.children[0].value = `<a href="${urls[0]}">${urls[0]}</a>`
        }
      })
    })

    return tree
  }
}

module.exports = rlc