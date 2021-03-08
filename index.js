const visit = require('unist-util-visit')
const ogs = require('open-graph-scraper')
const rlc = (options) => {

  return async tree => {
    transformers = []
    visit(tree, 'paragraph', node => {
      visit(node, 'text', textNode => {
        const urls = textNode.value.match(/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/g);
        if (urls && urls.length === 1) {
          transformers.push(async () => {
            try {
              const { result } = await ogs({ url: urls[0] })
              console.log(result);
            } catch (error) {
              console.log(error);
            }
            node.children[0].type = 'html'
            node.children[0].value = `<a href="${urls[0]}">${urls[0]}</a>`
          })
        }
      })
    })

    try {
      await Promise.all(transformers.map(t => t()))
    } catch (error) {
      console.error(error);
    }

    return tree
  }
}

module.exports = rlc