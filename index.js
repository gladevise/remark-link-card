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

            node.children[0].type = 'html'
            node.children[0].value = await createHtml(urls[0])

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

const getOpenGraph = async (targetUrl) => {
  try {
    const { result } = await ogs({ url: targetUrl })
    return result
  } catch (error) {
    console.error(`Failed to get the Open Graph data of ${error.result.requestUrl} due to ${error.result.error}.`);
    return undefined
  }
}

const createHtml = async (targetUrl) => {
  // get favicon
  const parsedUrl = new URL(targetUrl)
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}`

  // get open graph
  const ogResult = await getOpenGraph(targetUrl)

  // Set data
  const title = ogResult?.ogTitle || parsedUrl.hostname
  const descriptionElement = ogResult?.ogDescription ?
    `<div class="rlc-description">${ogResult.ogDescription}</div>` : '';
  const imageElement = ogResult?.ogImage?.url ?
    `<div class="rlc-image-container">
      <img class="rlc-image" src="${ogResult.ogImage.url}" alt="${ogResult.ogImage?.alt || title}" width="100%" height="100%"/>
    </div>`
    : '';

  // create output HTML
  const outputHTML = `
<a class="rlc-container" href="${targetUrl}">
  <div class="rlc-info">
    <div class="rlc-title">${title}</div>
    ${descriptionElement}
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="${faviconSrc}" alt="${title} favicon" width="16px" height="16px">
      <span class="rlc-url">${targetUrl}</span>
    </div>
  </div>
  ${imageElement}
</a>
`.trim()
  return outputHTML
}

module.exports = rlc