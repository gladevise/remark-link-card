const visit = require('unist-util-visit')
const ogs = require('open-graph-scraper')
const path = require('path')
const { writeFile, access, mkdir } = require('fs/promises')
const fetch = require('node-fetch')
const sanitize = require('sanitize-filename')

const defaultSaveDirectory = 'public'
const defaultOutputDirectory = '/remark-link-card/'

const rlc = (options) => {

  return async tree => {
    transformers = []
    visit(tree, 'paragraph', (paragraphNode, index) => {
      if (paragraphNode.children.length !== 1) {
        return tree
      }
      visit(paragraphNode, 'text', textNode => {
        const urls = textNode.value.match(/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/g);
        if (urls && urls.length === 1) {
          transformers.push(async () => {

            // create linkCardNode
            const linkCardHtml = await createHtml(urls[0], options?.cache);
            const linkCardNode = {
              type: 'html',
              value: linkCardHtml,
            }

            // Replace paragraph node with linkCardNode
            tree.children.splice(index, 1, linkCardNode)

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

const createHtml = async (targetUrl, isCache) => {
  // get open graph
  const ogResult = await getOpenGraph(targetUrl)
  const parsedUrl = new URL(targetUrl)
  const title = ogResult?.ogTitle || parsedUrl.hostname

  // create favicon element
  let faviconElement
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}`
  if (isCache) {
    const faviconFilename = await downloadImage(
      faviconSrc,
      path.join(process.cwd(), defaultSaveDirectory, defaultOutputDirectory)
    )
    faviconElement = `
      <img class="rlc-favicon" src="${path.join(defaultOutputDirectory, faviconFilename)}" alt="${title} favicon" width="16px" height="16px">
    `.trim()
  } else {
    faviconElement = `
      <img class="rlc-favicon" src="${faviconSrc}" alt="${title} favicon" width="16px" height="16px">
    `
  }


  // create descriptionElement
  const descriptionElement = ogResult?.ogDescription ?
    `<div class="rlc-description">${ogResult.ogDescription}</div>` : '';

  // create imageElement
  let imageElement
  if (ogResult?.ogImage?.url) {
    if (isCache) {
      const imageFilename = await downloadImage(
        ogResult.ogImage.url,
        path.join(process.cwd(), defaultSaveDirectory, defaultOutputDirectory)
      )
      imageElement = `<div class="rlc-image-container">
      <img class="rlc-image" src="${path.join(defaultOutputDirectory, imageFilename)}" alt="${ogResult.ogImage?.alt || title}" width="100%" height="100%"/>
    </div>`.trim()

    } else {
      imageElement = `<div class="rlc-image-container">
      <img class="rlc-image" src="${ogResult.ogImage.url}" alt="${ogResult.ogImage?.alt || title}" width="100%" height="100%"/>
    </div>`.trim()
    }
  } else {
    imageElement = ''
  }

  // create output HTML
  const outputHTML = `
<a class="rlc-container" href="${targetUrl}">
  <div class="rlc-info">
    <div class="rlc-title">${title}</div>
    ${descriptionElement}
    <div class="rlc-url-container">
      ${faviconElement}
      <span class="rlc-url">${targetUrl}</span>
    </div>
  </div>
  ${imageElement}
</a>
`.trim()

  // TODO: format outputHTML
  return outputHTML
}

const downloadImage = async (url, saveDirectory) => {
  // TODO: check file existence(if it is existed, return filename)
  // check directory existence
  try {
    await access(saveDirectory)
  } catch (error) {
    // create directory if it is not existed
    await mkdir(saveDirectory, { recursive: true })
  }

  //TODO: trycatch return undefined when failed
  const response = await fetch(url);
  const buffer = await response.buffer();

  const filename = sanitize(url)
  const saveFilePath = path.join(saveDirectory, filename)

  try {
    writeFile(saveFilePath, buffer)
  } catch (error) {
    //TODO: meaningfull message
    console.error(error);
    return undefined
  }

  return filename
}

module.exports = rlc